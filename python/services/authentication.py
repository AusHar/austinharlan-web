from flask import Flask, jsonify
import os
import pandas as pd
import vectorbt as vbt
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path="/Users/aharlan/Documents/Code/austinharlan-web/python/rhacc.env")

def request_post(url, payload, json=False):
    headers = {
        "Content-Type": "application/json" if json else "application/x-www-form-urlencoded"
    }
    response = requests.post(url, json=payload if json else None, data=None if json else payload)
    response.raise_for_status()
    return response.json()

def request_get(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def _validate_sherrif_id(device_token: str, workflow_id: str, mfa_code: str = None):
    url = "https://api.robinhood.com/pathfinder/user_machine/"
    payload = {
        'device_id': device_token,
        'flow': 'suv',
        'input': {'workflow_id': workflow_id}
    }
    data = request_post(url=url, payload=payload, json=True)

    if "id" in data:
        inquiries_url = f"https://api.robinhood.com/pathfinder/inquiries/{data['id']}/user_view/"
        res = request_get(inquiries_url)
        challenge_id = res['type_context']["context"]["sheriff_challenge"]["id"]
        challenge_url = f"https://api.robinhood.com/challenge/{challenge_id}/respond/"

        if mfa_code is None:
            mfa_code = input("Please enter your MFA code: ")

        challenge_payload = {'response': mfa_code}
        challenge_response = request_post(url=challenge_url, payload=challenge_payload, json=True)

        if challenge_response["status"] == "validated":
            inquiries_payload = {"sequence": 0, "user_input": {"status": "continue"}}
            inquiries_response = request_post(url=inquiries_url, payload=inquiries_payload, json=True)
            if inquiries_response["type_context"]["result"] == "workflow_status_approved":
                print("MFA validated and workflow approved")
                return
            else:
                raise Exception("Workflow status not approved")
        else:
            raise Exception("Challenge not validated")
    else:
        raise Exception("ID not returned in user-machine call")

# Retrieve credentials
username = os.getenv("ROBINHOOD_USERNAME")
password = os.getenv("ROBINHOOD_PASSWORD")

# Step 1: Perform Initial Login
try:
    login_url = "https://api.robinhood.com/oauth2/token/"
    login_payload = {
        "username": username,
        "password": password,
        "grant_type": "password",
        "scope": "internal",
        "expires_in":86400,
        "client_id": "c82SH0WZBNNKZV55TK=="
        "device_token":device_token,
        "mfa_code":mfa_code
        
    }
    response = request_post(url=login_url, payload=login_payload, json=True)
    print("Initial Login Response:", response)

    # Extract device_token and workflow_id
    device_token = response.get("device_token")
    workflow_id = response.get("workflow_id")

    if not device_token or not workflow_id:
        raise Exception("Failed to retrieve device_token or workflow_id")

    # Step 2: Ask User for MFA Code
    mfa_code = input("Enter the 2FA code sent to your device: ")

    # Step 3: Validate MFA Code
    _validate_sherrif_id(device_token, workflow_id, mfa_code=mfa_code)
    print("Login successful!")

except Exception as e:
    print(f"Login failed: {e}")
# main.py

import os
from dotenv import load_dotenv
import robin_stocks.robinhood as rh

def main():
    # Load environment variables
    load_dotenv()

    # Pull credentials
    username = os.getenv('ROBINHOOD_USERNAME')
    password = os.getenv('ROBINHOOD_PASSWORD')

    if not username or not password:
        print("ERROR: Missing ROBINHOOD_USERNAME or ROBINHOOD_PASSWORD in .env file.")
        return

    # Log in
    print("Logging into Robinhood...")
    login = rh.login(username=username, password=password)

    if 'access_token' not in login:
        print("ERROR: Login failed!")
        return
    print("✅ Successfully logged in!")

    # Pull account profile
    print("Fetching account profile...")
    profile = rh.profiles.load_account_profile()
    print("Account Info:", profile)

    # Log out
    print("Logging out...")
    r.logout()
    print("✅ Logged out successfully.")

if __name__ == "__main__":
    main()
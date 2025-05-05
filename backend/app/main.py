# This script logs into Robinhood, fetches the account profile, and logs out.
import os
import getpass
from dotenv import load_dotenv
import robin_stocks.robinhood as rh

def main():
    # Load environment variables
    load_dotenv()

    username = os.getenv('ROBINHOOD_USERNAME')
    password = os.getenv('ROBINHOOD_PASSWORD')

    if not username:
        print("ERROR: Missing ROBINHOOD_USERNAME in .env file.")
        return

    if not password:
        # Prompt for password securely if not found in env
        password = getpass.getpass("Enter your Robinhood password: ")

    # Log in
    print("🔐 Logging into Robinhood...")
    login_response = rh.login(username=username, password=password)

    if 'access_token' not in login_response:
        print("❌ Login failed!")
        return

    print("✅ Successfully logged in!")

    # Fetch account profile
    print("📄 Fetching account profile...")
    profile = rh.profiles.load_account_profile()

    if profile:
        print("👤 Account Profile:")
        print(profile)
    else:
        print("⚠️ Failed to fetch account profile.")

    # Log out
    print("🔓 Logging out...")
    rh.logout()
    print("✅ Logged out successfully.")

if __name__ == "__main__":
    main()
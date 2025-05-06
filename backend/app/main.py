# This script logs into Robinhood, fetches the account profile, and logs out.
import os
import getpass
from dotenv import load_dotenv
from robinhood.authentication import login, logout
import robin_stocks.robinhood.profiles as profiles


def main():
    # Load environment variables
    load_dotenv()

    # Only require username to be present
    username = os.getenv('ROBINHOOD_USERNAME')
    password = os.getenv('ROBINHOOD_PASSWORD')

    if not username:
        raise EnvironmentError("ERROR: Missing ROBINHOOD_USERNAME in .env file.")

    # Prompt for password securely if missing or blank
    if not password:
        password = getpass.getpass("Enter your Robinhood password: ")

    # Log in
    print("🔐 Logging into Robinhood...")
    login_response = login(username=username, password=password)

    if 'access_token' not in login_response:
        print("❌ Login failed!")
        return

    print("✅ Successfully logged in!")

    # Fetch account profile
    print("📄 Fetching account profile...")
    profile = profiles.load_account_profile()

    if profile:
        print("👤 Account Profile:")
        print(profile)
    else:
        print("⚠️ Failed to fetch account profile.")

    # Log out
    print("🔓 Logging out...")
    logout()
    print("✅ Logged out successfully.")

if __name__ == "__main__":
    main()
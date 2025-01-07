from flask import Flask, jsonify
import os
import robin_stocks.robinhood as rh
import pandas as pd
import vectorbt as vbt
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path="/Users/aharlan/Documents/Code/austinharlan-web/python/rhacc.env")

# Debug working dir
print("Current Working Directory:", os.getcwd())
print("Environment Variables:", dict(os.environ))

# Retrieve environment variables
username = os.getenv('ROBINHOOD_USERNAME')
password = os.getenv('ROBINHOOD_PASSWORD')

# Debug statements
print(f"ROBINHOOD_USERNAME: {username}")
print(f"ROBINHOOD_PASSWORD: {password}")

# Step 1: Validate credentials
if not username or not password:
    raise ValueError("ROBINHOOD_USERNAME and ROBINHOOD_PASSWORD must be set in environment variables.")

# Step 2: Login to Robinhood
try:
    # Step 1: Trigger initial login
    print("Attempting login... Check your phone for the MFA code.")

    # Step 2: Log in with MFA code
    response = rh.login(username, password)
    print("Login Response:", response)  # Debugging to check response

    # Step 3: Validate login success
    if response.get('status') == 'validated':
        print("Login successful with MFA!")
    elif 'detail' in response:
        raise ValueError(f"Login failed: {response['detail']}")
    else:
        raise ValueError("Unexpected login response.")
except Exception as e:
    print(f"An error occurred during login: {e}")
    exit(1)

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    try:
        # Step 3: Fetch current holdings from Robinhood
        holdings = rh.build_holdings()
        symbols = list(holdings.keys())
        
        # Step 4: Fetch historical price data for each symbol
        prices = pd.DataFrame()
        for symbol in symbols:
            historical_data = rh.stocks.get_stock_historicals(symbol, interval='day', span='week')
            if not historical_data:
                print(f"No historical data for {symbol}")
                continue
            prices[symbol] = [float(day['close_price']) for day in historical_data]

        # Step 5: Analyze the portfolio with vectorbt
        portfolio = vbt.Portfolio.from_prices(prices)

        # Step 6: Extract portfolio stats
        stats = portfolio.stats().to_dict()
        total_return = portfolio.total_return().to_dict()

        # Step 7: Return data as JSON
        return jsonify({
            "stats": stats,
            "total_return": total_return
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
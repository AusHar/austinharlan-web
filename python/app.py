from flask import Flask, jsonify
import os
import robin_stocks.robinhood as rh
import pandas as pd
import vectorbt as vbt
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Step 1: Login to Robinhood using environment variables
username = os.getenv('ROBINHOOD_USERNAME')
password = os.getenv('ROBINHOOD_PASSWORD')
rh.login(username, password)

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    # Step 2: Fetch current holdings from Robinhood
    holdings = rh.build_holdings()

    # Step 3: Prepare a list of symbols
    symbols = list(holdings.keys())

    # Step 4: Fetch historical price data for each symbol
    prices = pd.DataFrame()
    for symbol in symbols:
        historical_data = rh.stocks.get_stock_historicals(symbol, interval='day', span='year')
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

if __name__ == '__main__':
    app.run(debug=True)
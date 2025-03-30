import yfinance as yf
import pandas as pd
import json

from datetime import datetime, timedelta

with open('agg_sentiment.json', 'r') as file:
    data = json.load(file)

data = sorted(data, key=lambda x: datetime.strptime(x['day'], '%Y-%m-%d'))

def get_next_trading_day(date_str):
    date = datetime.strptime(date_str, "%Y-%m-%d")
    # Increment day by 1
    next_day = date + timedelta(days=1)
    # Check if the next day is a weekend, if so, increment until it's a weekday
    while next_day.weekday() >= 5:  # 5=Saturday, 6=Sunday
        next_day += timedelta(days=1)
    return next_day.strftime("%Y-%m-%d")

portfolio = {}
spent = 0

def currentPortfolio(date):
    sum = 0
    for ticker in portfolio:
        sum += portfolio[ticker] * yf.download(ticker, start=date, end=date+timedelta(days=1))['Close']
    print(sum)


currentday = data[0]['day']

print(currentday)

entry = data[0]
#for entry in data:
print(entry['ticker'])
if (currentday == entry['day']):
    nextday = get_next_trading_day(currentday)
    if entry['ticker'] not in portfolio:
        portfolio[entry['ticker']] = 0
    portfolio[entry['ticker']] += entry['refined_sentiment'] / yf.download(entry['ticker'], start=nextday, end=nextday, auto_adjust = 'False')['Open']
else:
    currentPortfolio(currentday)
    currentday = entry['day']
    nextday = get_next_trading_day(currentday)
    if entry['ticker'] not in portfolio:
        portfolio[entry['ticker']] = 0
    portfolio[entry['ticker']] += entry['refined_sentiment'] / yf.download(entry['ticker'], start=nextday, end=nextday+timedelta(days=1))['Open']

#for entry in data:

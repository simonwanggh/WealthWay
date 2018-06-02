exports.getStock = function getStock(stock, type) {
  const defs = {
    stockURL : 'http://web.juhe.cn:8080/finance/stock/hs?gid={stock}&key=09220f02b26084c5aa27729f5a109e1a',

  };


  if (!stock || stock.length == 0) {
    console.log('&&&&&&&&&&&&&&&&&&&&No stock defined');
    return;
  }



  console.log(stock);

 
  const url = defs.stockURL.replace('{stock}',stock);
  
  console.log(url);
  return fetch(url);  // eslint-disable-line no-undef
};

exports.properties = [
  'AfterHoursChangeRealtime',
  'AnnualizedGain',
  'Ask',
  'AskRealtime',
  'AverageDailyVolume',
  'Bid',
  'BidRealtime',
  'BookValue',
  'Change',
  'ChangeFromFiftydayMovingAverage',
  'ChangeFromTwoHundreddayMovingAverage',
  'ChangeFromYearHigh',
  'ChangeFromYearLow',
  'ChangePercentRealtime',
  'ChangeRealtime',
  'Change_PercentChange',
  'ChangeinPercent',
  'Commission',
  'Currency',
  'DaysHigh',
  'DaysLow',
  'DaysRange',
  'DaysRangeRealtime',
  'DaysValueChange',
  'DaysValueChangeRealtime',
  'DividendPayDate',
  'DividendShare',
  'DividendYield',
  'EBITDA',
  'EPSEstimateCurrentYear',
  'EPSEstimateNextQuarter',
  'EPSEstimateNextYear',
  'EarningsShare',
  'ErrorIndicationreturnedforsymbolchangedinvalid',
  'ExDividendDate',
  'FiftydayMovingAverage',
  'HighLimit',
  'HoldingsGain',
  'HoldingsGainPercent',
  'HoldingsGainPercentRealtime',
  'HoldingsGainRealtime',
  'HoldingsValue',
  'HoldingsValueRealtime',
  'LastTradeDate',
  'LastTradePriceOnly',
  'LastTradeRealtimeWithTime',
  'LastTradeTime',
  'LastTradeWithTime',
  'LowLimit',
  'MarketCapRealtime',
  'MarketCapitalization',
  'MoreInfo',
  'Name',
  'Notes',
  'OneyrTargetPrice',
  'Open',
  'OrderBookRealtime',
  'PEGRatio',
  'PERatio',
  'PERatioRealtime',
  'PercebtChangeFromYearHigh',
  'PercentChange',
  'PercentChangeFromFiftydayMovingAverage',
  'PercentChangeFromTwoHundreddayMovingAverage',
  'PercentChangeFromYearLow',
  'PreviousClose',
  'PriceBook',
  'PriceEPSEstimateCurrentYear',
  'PriceEPSEstimateNextYear',
  'PricePaid',
  'PriceSales',
  'SharesOwned',
  'ShortRatio',
  'StockExchange',
  'Symbol',
  'TickerTrend',
  'TradeDate',
  'TwoHundreddayMovingAverage',
  'Volume',
  'YearHigh',
  'YearLow',
  'YearRange',
];

exports.getNews = function getNews(symbol) {
  const url = `https:///headline?s=${symbol}&region=CN&lang=zh-CN`;
  console.log(url);
  return fetch(url)  // eslint-disable-line no-undef
    .then(response => response.text())
    .catch(err => console.error(err));
};

exports.symbolSuggest = function symbolSuggest(query) {
  const url = `http://www.ctxalgo.com/api/stocks`;
  console.log(url);
  return fetch(url).then(response => response.text()).catch(err => console.error(err));  // eslint-disable-line no-undef
};

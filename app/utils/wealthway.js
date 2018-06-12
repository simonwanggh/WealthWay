supportedSx = [
  {
    "en": 'EURUSD',
    "cn": '欧元美元'
  },
  {
    "en": 'USDJPY',
    "cn": '美元日元'
  },
  {
    "en": 'GBPUSD',
    "cn": '英镑美元'
  },
  {
    "en": 'AUDUSD',
    "cn": '澳元美元'
  },
  {
    "en": 'USDCAD',
    "cn": '美元加元'
  },
  {
    "en": 'EURGBP',
    "cn": '欧元英镑'
  },
  {
    "en": 'USDCNH',
    "cn": '美元人民币'
  },
  {
    "en": 'USDCHF',
    "cn": '美元瑞郎'
  },
  {
    "en": 'EURJPY',
    "cn": '欧元日元'
  },
]

exports.getAllSupportedSxs = function getAllSupportedSxs(){
  return supportedSx;
}

exports.getSx = function getSx(sx, type) {
  // const url = 'http://api.shenjian.io/exchange/currency?appid=b995963a1da180e340d4be8c7d5b1868&form={from}&to={to}';
  // if (!sx || sx.length == 0) {
  //   console.log('no sx provided to getSx()');
  //   return;
  // }
  // console.log(sx);

  // let from = sx.substr(0,3);
  // let to = sx.substr(3);

  // console.log("from : ",from);
  // console.log("to : ",to);

  // let reqUrl = url.replace('{from}', from).replace('{to}',to)

  // console.log("reqUrl : ",reqUrl);

  // return fetch(reqUrl);
  // return new Promise((resolve, reject) => {
    
  //      resolve(supportedSx.filter(item => 
  //        item['en'].contains(sx) || item['cn'].contains(sx)
  //      )) ;
   
  // })

  const url = 'https://forex.1forge.com/1.0.3/quotes?pairs={sx}&api_key=aM03cvKGZAPirfcVXAigWgvxEdVS96JX';
  if (!sx || sx.length == 0) {
    console.log('no sx provided to getSx()');
    return;
  }
  console.log(sx);
  let reqUrl = url.replace('{sx}', sx);
  return fetch(reqUrl);
};


exports.symbolSuggest = function symbolSuggest(query) {
  return new Promise((resolve, reject) => {
    
       resolve(supportedSx.filter(item => {
       return item.en.includes(query) || item.cn.includes(query)
       }
       )) ;
   
  })
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





// 3rd party libraries
import store from 'react-native-simple-store';

// Flux
import alt from '../alt';
import StockActions from '../actions/stock-action';

// Utils
import UtilFuncs from '../utils/functions';
import wealthway from '../utils/wealthway';

class StockStore {
  constructor() {
    const that = this;
    store.get('watchlist').then((watchlist) => {
      store.get('watchlistResult').then((watchlistResult) => {
        console.log('From store watchlist:', watchlist);
        if (!watchlist || !Array.isArray(watchlist)) {
          watchlist = [];
          store.save('watchlist', watchlist);
        }
        that.setState({
          watchlist,
          watchlistResult,
          selectedStock: watchlist.length > 0 ? watchlist[0] : {},
        });
        that.handleUpdateStocks();
      });
    });

    this.bindListeners({
      handleUpdateStocks: StockActions.UPDATE_STOCKS,
      handleAddStock: StockActions.ADD_STOCK,
      handleDeleteStock: StockActions.DELETE_STOCK,
      handleSelectStock: StockActions.SELECT_STOCK,
      handleSelectProperty: StockActions.SELECT_PROPERTY,
    });

    this.state = {
      watchlist: [],
      watchlistResult: {},
      selectedStock: {},
      selectedProperty: 'ChangeinPercent',
    };
  }

  handleUpdateStocks() {
    const symbols = this.state.watchlist.map(item => item[0]);
    console.log("############### symbols : " + symbols);
    const that = this;
    symbols.forEach(symbol => 
        {
          let getStocks = wealthway.getStock(symbol, 'quotes');
          if(!getStocks){
            return;
          }
          getStocks.then(response => response.json())
            .then((json) => {   
              let quotes = json.result;
              quotes = Array.isArray(quotes) ? quotes : [quotes];
              console.log("############### quates " + quotes.length);
              const watchlistResult = that.state.watchlistResult ? that.state.watchlistResult : {} ;              
              watchlistResult[symbol] = quotes;              
              store.save('watchlistResult', watchlistResult);
              that.setState({ watchlistResult });
            }).catch((error) => {
              console.log('Request failed', error);
              store.get('watchlistResult')
              .then(watchlistResult => that.setState({ watchlistResult }));
            });
          }
        );
    
  }

  handleAddStock(symbol) {
    console.log('handleAddStock', symbol);
    const watchlist = this.state.watchlist;
    const addedStock = symbol;
    watchlist.push(addedStock);
    this.setState({ watchlist });
    store.save('watchlist', watchlist);
    this.handleUpdateStocks();

    if (watchlist.length === 1) {
      this.setState({ selectedStock: addedStock });
    }
  }

  handleDeleteStock(symbol) {
    console.log('handleDeleteStock', symbol);
    const watchlist = UtilFuncs.removeObjectfromArray(this.state.watchlist, 'symbol', symbol);
    this.setState({ watchlist });
    store.save('watchlist', watchlist);

    if (watchlist.length === 0) {
      this.setState({ selectedStock: {} });
    }
  }

  handleSelectStock(stock) {
    console.log('----------------- handleSelectStock', stock);
    this.setState({ selectedStock: stock });
  }

  handleSelectProperty(property) {
    console.log('handleSelectProperty', property);
    this.setState({ selectedProperty: property });
  }
}

module.exports = alt.createStore(StockStore, 'StockStore');

// 3rd party libraries
import store from 'react-native-simple-store';

// Flux
import alt from '../alt';
import SxActions from '../actions/sx-action';

// Utils
import UtilFuncs from '../utils/functions';
import wealthway from '../utils/wealthway';

class SxStock {
  constructor() {
    const that = this;
    store.get('watchlist').then((watchlist) => {
      store.get('watchlistResult').then((watchlistResult) => {
        console.log('From store watchlist:', watchlist);
        if (!watchlist || !Array.isArray(watchlist)) {
          watchlist = [];
          store.save('watchlist', watchlist);
        }
        if(!watchlistResult){
          watchlistResult = {}
        }
        that.setState({
          watchlist,
          watchlistResult,
          selectedSx: watchlist.length > 0 ? watchlist[0] : {},
        });
        console.log("111111111111");
        that.handleUpdateSxs();
      });
    });

    this.bindListeners({
      handleUpdateSxs: SxActions.UPDATE_SXS,
      handleAddSx: SxActions.ADD_SX,
      handleDeleteSx: SxActions.DELETE_SX,
      handleSelectSx: SxActions.SELECT_SX,
      
    });

    this.state = {
      watchlist: [],
      watchlistResult: {},
      selectedSx: {},      
    };
  }

  handleUpdateSxs() {
    
    if(!this.state.watchlist || this.state.watchlist == 0){
      return;
    }
    const symbols = this.state.watchlist.map(item => item.en);
    if(!symbols || symbols.length == 0){
      return;
    }
    let symString = symbols.toString();
    console.log("Symbol String : ", symString);
    const that = this;
 
    let getSxs = wealthway.getSx(symString, 'quotes');
    if(!getSxs){      
      return;
    }
    getSxs.then(response => response.json())
      .then((json) => {   
        const watchlistResult = json.reduce((obj, item) => {
          obj[item.symbol] = item
          return obj
        }, {});
        console.log("watchlistResult : ",watchlistResult)
        store.save('watchlistResult', watchlistResult);
        that.setState({ watchlistResult });
      }).catch((error) => {
        console.log('Request failed', error);
        store.get('watchlistResult')
        .then(watchlistResult => that.setState({ watchlistResult }));
      });
          
     
    
  }

  handleAddSx(sx) {
    console.log('handleAddSx', sx);
    const watchlist = this.state.watchlist;
    const addedSx = sx;
    if(watchlist.find(item => item.en == addedSx.en)){
      return;
    }
    watchlist.push(addedSx);
    this.setState({ watchlist });
    store.save('watchlist', watchlist);
    this.handleUpdateSxs();

    if (watchlist.length === 1) {
      this.setState({ selectedSx: addedSx });
    }
  }

  handleDeleteSx(sx) {
    console.log('handleDeleteStock', sx);
    const watchlist = UtilFuncs.removeObjectfromArray(this.state.watchlist, 'en', sx.en);
    this.setState({ watchlist });
    store.save('watchlist', watchlist);

    if (watchlist.length === 0) {
      this.setState({ selectedSx: {} });
    }
  }

  handleSelectSx(sx) {
    console.log('----------------- handleSelectSx', sx);
    this.setState({ selectedSx: sx });
  }


}

module.exports = alt.createStore(SxStock, 'SxStore');

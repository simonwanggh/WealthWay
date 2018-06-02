import React from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
  ListView,
  Platform,
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  RefreshControl,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Feather';

// Flux
import StockActions from '../../../actions/stock-action';
import StockStore from '../../../stores/stock-store';

// View Elements
import StockCell from './stock-cell';
import ChartPage from './chart-page';
import DetailsPage from './details-page';
import NewsPage from './news-page';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  statusBar: {
    height: 20,
  },
  stocksBlock: {
    flexDirection: 'column',
    flex: 9,
  },
  detailedBlock: {
    flex: 5,
    backgroundColor: '#202020',
    justifyContent: 'space-between',
  },
  yahoo: {
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default class MainBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: false,
      refreshing: false,
      key: Math.random(),
    }, StockStore.getState());
  }

  componentDidMount() {
    StockStore.listen(state => this.onStockStoreChange(state));

    StockActions.updateStocks();
  }

  componentWillUnmount() {
    StockStore.unlisten(state => this.onStockStoreChange(state));
  }

  onStockStoreChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.watchlist),
      watchlistResult: state.watchlistResult,
      selectedProperty: state.selectedProperty,
      selectedStock: state.selectedStock,
      key: Math.random(),
    });
  }

  
  renderDotIndicator() {
    return (
      <PagerDotIndicator pageCount={3} />
    );
  }

  onRefresh() {
    this.setState({ refreshing: true });
    StockActions.updateStocks();
    this.setState({ refreshing: false });
  }

  render() {
    return (     
        <View style={styles.container}>
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          <View style={styles.stocksBlock}>
            <ListView
              key={this.state.key}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }
              dataSource={this.state.dataSource}
              renderRow={stock => <StockCell stock={stock} watchlistResult={this.state.watchlistResult} />}
            />
          </View>
          <View style={styles.detailedBlock}>
            <IndicatorViewPager
              style={{ flex: 1 }}
              indicator={this.renderDotIndicator()}
            >
              <View>
                <DetailsPage stock={this.state.selectedStock} watchlistResult={this.state.watchlistResult} />
              </View>
              <View>
                <ChartPage stock={this.state.selectedStock} watchlistResult={this.state.watchlistResult} />
              </View>
              <View>
                <NewsPage key={this.state.key} stock={this.state.selectedStock} />
              </View>
            </IndicatorViewPager>
          </View>
        </View>
   
    );
  }
}

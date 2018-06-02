import React from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Feather';

// Flux
import StockActions from '../../actions/stock-action';
import StockStore from '../../stores/stock-store';

// View Elements
import StockCell from '../main/elements/stock-cell';
import ChartPage from '../main/elements/chart-page';
import DetailsPage from '../main/elements/details-page';
import NewsPage from '../main/elements/news-page';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  statusBar: {
    height: 20,
  },
  bodyBlock: {
    justifyContent: 'space-between',
    flex: 15,
  },
  footerBlock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  settings: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});


export default (Comp) => {
  return class Main extends React.Component {
    constructor(props) {
      super(props);

      this.state = Object.assign({
        dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
        loaded: false,
        refreshing: false,
        key: Math.random(),
      }, StockStore.getState());
    }

    
  

    render() {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          <View style={styles.bodyBlock}>
            <Comp {...this.props}/>
          </View>
          <View style={styles.footerBlock}>
            <TouchableHighlight
                style={styles.settings}
                onPress={Actions.main}
                underlayColor="#202020">
                <Icon name="trending-up" color="white" size={22} />
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.settings}
                onPress={Actions.settings}
                underlayColor="#202020">
                <Icon name="credit-card" color="white" size={22} />
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.settings}
                onPress={Actions.settings}
                underlayColor="#202020">
                <Icon name="user" color="white" size={22} />
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
}

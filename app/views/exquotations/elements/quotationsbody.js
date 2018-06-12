import React from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
  ListView,
  Platform,
  Text,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  View,
  RefreshControl,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons';

// Flux
import SxActions from '../../../actions/sx-action';
import SxStore from '../../../stores/sx-store';

// View Elements
import SxCell from './sx-cell';
import ChartPage from './chart-page';
import DetailsPage from './details-page';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
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
    backgroundColor: '#FFA07A',
    justifyContent: 'space-between',
  },
  yahoo: {
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#FF7F50',
  },
  navigatorBarIOS: {
    backgroundColor: '#202020',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#424242',
  },
  navigatorLeftButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  },
});

export default class QuotationBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: false,
      refreshing: false,
      key: Math.random(),
    }, SxStore.getState());

    console.log("")
  }

  componentDidMount() {
    SxStore.listen(state => this.onAppSxChange(state));

    SxActions.updateSxs();
  }
  

  componentWillUnmount() {
    SxStore.unlisten(state => this.onAppSxChange(state));
    console.log("HHHHHHHHHHHHHHHHHHHHHH",SxStore.getState())
  }


  onAppSxChange(state) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(state.watchlist),
      watchlistResult: state.watchlistResult,
      selectedProperty: state.selectedProperty,
      selectedSx: state.selectedSx,
      key: Math.random(),
    });
  }

  
  renderDotIndicator() {
    return (
      <PagerDotIndicator pageCount={1} />
    );
  }

  onRefresh() {
    this.setState({ refreshing: true });
    SxActions.updateSxs();
    this.setState({ refreshing: false });
  }

  onActionSelected(position) {
    if(position == 0){
      Actions.add();
    }else{
      Actions.pop({refresh:{backfrom:'sx'}});     
    }
   
  }

  renderToolbar() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          statusBar={{ tintColor: '#202020', style: 'light-content' }}
          style={styles.navigatorBarIOS}
          title={{ title: "汇率", tintColor: 'white' }}
          leftButton={<MIcon style={styles.navigatorLeftButton} name="add" size={26} color="#3CABDA" onPress={Actions.add} />}
          rightButton={{
            title: 'Done',
            tintColor: '#3CABDA',
            handler: Actions.pop,
          }}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <MIcon.ToolbarAndroid
          style={styles.toolbar}
          title='汇率'
          titleColor="white"
          actions={[
            { title: 'Add', iconName: 'add', iconSize: 26, show: 'always' },  
            { title: 'back', iconName: 'arrow-back', iconSize: 26, show: 'always' }         
          ]}
          onActionSelected={position => this.onActionSelected(position)}
        />
      );
    }
  }

  render() {
    return (     
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#FF6347"
            barStyle="light-content"
          />
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          {this.renderToolbar()}
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
              renderRow={sx => {console.log("++++++++++++++++++",sx); return <SxCell sx={sx} watchlistResult={this.state.watchlistResult} />}}
            />
          </View>
          <View style={styles.detailedBlock}>
            <IndicatorViewPager
              style={{ flex: 1 }}
              indicator={this.renderDotIndicator()}
            >
              <View>
                <ChartPage sx={this.state.selectedSx} watchResult={this.state.watchlistResult[this.state.selectedSx.en]} />
              </View>
              
            </IndicatorViewPager>
          </View>
        </View>
   
    );
  }
}

import React from 'react';

import {
  Linking,
  ListView,
  Platform,
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Feather';

import ProductCell from './product-cell';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  statusBar: {
    height: 20,
  },
  headerBlock: {
    flexDirection: 'column',
    backgroundColor: '#FF6347',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
    flex: 3,
  },
  divideBlock: {
    flexDirection: 'column',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',  
    paddingLeft : 20,
    flex: 1.5,
  },
  productsBlock: {
    flexDirection: 'column',
    flex: 6,
  },
  footerBlock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  viewpager: {
    flex: 1.5,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    justifyContent: 'center'
  },
  iconBlock: {
    flex: 1,
    paddingTop: 4,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  settings: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  propertyText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  primaryText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  labelText: {
    fontSize: 12,
    color: '#F5F5F5',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  focusText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  divideText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'transparent',
    
  },
 
  
});


var IMGS = [
  require('./../img/1.jpg'),
  require('./../img/2.jpg'),
  require('./../img/3.jpg'),
  require('./../img/4.jpg'),
];

export default class ProductBody extends React.Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['1', '2']),
      refreshing: false
    };
  }


  renderIndicator () {
    return (
        <PagerDotIndicator
            pageCount={3}
            style={{bottom: 16}}
            dotStyle={{backgroundColor: '#FFFFFF88'}}
        />
    )
}


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#FF6347"
          barStyle="light-content"
        />
        {Platform.OS === 'ios' && <View style={styles.statusBar} />}
        <TouchableOpacity style={styles.headerBlock} onPress={Actions.profit}>
          <Text style={styles.labelText}>最新收益(美元)</Text>
          <Text style={styles.focusText}>68.86</Text>
          <Text style={styles.labelText}>总资产 51666   |   累计收益 1666</Text>
        </TouchableOpacity>

        <View style ={styles.divideBlock}>
          <Text style = {styles.divideText}>为你推荐</Text>
        </View>

         
        <View style={styles.productsBlock}>
          <ListView
            key={this.state.key}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
            dataSource={this.state.dataSource}
            renderRow={product => <ProductCell product={product} />}
          />
        </View>
        <IndicatorViewPager
                style={styles.viewpager}
                indicator={this.renderIndicator()}
                autoPlayEnable
                onPageSelected={(p) => console.log(p)}
            >
                <View style={{backgroundColor: 'white'}}>
                  <Image source = {require('./../img/1.jpg')}
                        style = {{flex: 1,width: '100%',
                        height: '100%',
                        justifyContent: 'center',}}
                       resizeMode="stretch"/>
                </View>
                <View style={{backgroundColor: 'white'}}>
                <Image source = {require('./../img/4.jpg')}
                        style = {{flex: 1,width: '100%',
                        height: '100%',
                        justifyContent: 'center',}}
                       resizeMode="stretch"/>
                </View>
                <View style={{backgroundColor: 'white'}}>
                <Image source = {require('./../img/3.jpg')}
                        style = {{flex: 1,width: '100%',
                        height: '100%',
                        justifyContent: 'center',}}
                       resizeMode="stretch"/>
                </View>
        </IndicatorViewPager>
        <View style={styles.footerBlock}>

          <TouchableHighlight
            style={styles.settings}
            onPress={Actions.quotation}
            underlayColor="#F5F5F5">
            <View style={styles.iconBlock}>
              <Icon name="trending-up" color="black" size={22} />
              <Text style={styles.propertyText}>
                行情
                  </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.iconBlock}>
            <Text style={styles.primaryText}>
              AI 投
              </Text>
          </View>
          <TouchableHighlight
            style={styles.settings}
            onPress={Actions.my}
            underlayColor="#202020">
            <View style={styles.iconBlock}>
              <Icon name="user" color="black" size={22} />
              <Text style={styles.propertyText}>
                我的
                  </Text>
            </View>
          </TouchableHighlight>
        </View>

        
      </View>
    );
  }
}
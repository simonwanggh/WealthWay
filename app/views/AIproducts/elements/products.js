import React from 'react';

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

import { Actions } from 'react-native-router-flux';

import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Icon from 'react-native-vector-icons/Feather';

import ProductCell from './product-cell';

const styleContains = [StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'black',
    }}),
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'gray',
      }})
    ];
  

const styles = StyleSheet.create({
   
    statusBar: {
      height: 20,
    },
    stocksBlock: {
      flexDirection: 'column',
      flex: 9,
    },
       bodyBlock: {
        justifyContent: 'space-between',
        flex: 13,
      },
      footerBlock: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#202020',
        alignItems: 'center',
        paddingTop: 4,
        paddingLeft: 10,
        paddingRight: 10,
      },
      iconBlock :{
        flex: 1,
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
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent'
      }
  });
  
export default class ProductBody extends React.Component {

    constructor(props) {
        super(props);
    
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['1', '2']),
        };
    }

    render() {
        return (
        <View style={styleContains[0].container}>
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
                    renderRow={product => <ProductCell product={product} />}
                />
            </View>
            <View style={styles.footerBlock}>
            <TouchableHighlight
                style={styles.settings}
                onPress={console.log("")}
                underlayColor="#202020">
                <View style = {styles.iconBlock}>
                  <Icon name="cpu" color="white" size={22} />
                  <Text style={styles.propertyText}>
                  AI投
                  </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.settings}
                onPress={Actions.quotation}
                underlayColor="#202020">
                <View style = {styles.iconBlock}>
                  <Icon name="trending-up" color="white" size={22} />
                  <Text style={styles.propertyText}>
                  行情
                  </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                style={styles.settings}
                onPress={Actions.my}
                underlayColor="#202020">
                <View style = {styles.iconBlock}>
                  <Icon name="user" color="white" size={22} />
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
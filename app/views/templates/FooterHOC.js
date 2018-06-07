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
import SxStore from '../../stores/sx-store';


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


export default (Comp,styleIndex) => {
  return class Main extends React.Component {
    constructor(props) {
      super(props);

    }

    
  

    render() {
      console.log("##############",this.props)
      // const pssProps = this.props ? this.props : {};
      return (
        
        <View style={styleContains[styleIndex].container}>
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          <View style={styles.bodyBlock}>
            <Comp {...this.props}/>
          </View>
          <View style={styles.footerBlock}>
            <TouchableHighlight
                style={styles.settings}
                onPress={Actions.main}
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
}

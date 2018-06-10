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
  Dimensions,
  StatusBar,
  Image,
  RefreshControl,
} from 'react-native';


import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux'; 

import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialIcons';



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
    backgroundColor: 'gray',
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
    backgroundColor: '#696969',
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

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: 'white' }]} >
    <Image source = {require('./../img/1.jpg')} resizeMode="contain">
    </Image>
  </View>
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: 'white' }]} >
    <Image source = {require('./../img/2.jpg')} resizeMode="contain">
    </Image>
  </View>
);


export default class QuotationBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'AI 投 1' },
        { key: 'second', title: 'AI 投 2' },
      ],
    };

  }


  onActionSelected(position) {
    Actions.pop();
  }


  renderToolbar() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          statusBar={{ tintColor: '#202020', style: 'light-content' }}
          style={styles.navigatorBarIOS}
          title={{ title:'交易/收益 明细', tintColor: 'white' }}
          leftButton={<MIcon style={styles.navigatorLeftButton} name="back" size={26} color="#3CABDA" onPress={Actions.pop} />}         
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <MIcon.ToolbarAndroid
          style={styles.toolbar}
          title='交易/收益 明细'
          titleColor="white"
          actions={[
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
          backgroundColor="gray"
          barStyle="light-content"
          />
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          {this.renderToolbar()}
          <TabView
            navigationState={this.state}
            style={{backgroundColor: 'white'}}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{width: Dimensions.get('window').width }}
            renderTabBar={props =>
              <TabBar
                {...props}
                tabStyle={{ backgroundColor: 'white' }}
                indicatorStyle = {{backgroundColor: 'gray'}}
                labelStyle = {{color:'black'}}
                pressColor = 'gray'
                scrollEnabled = {false}
              />
            }
          />
        </View>
   
    );
  }
}
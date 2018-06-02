import {
  AppRegistry,
  StatusBar,
} from 'react-native';

import WealthWay from './WealthWay';

console.disableYellowBox = true;
StatusBar.setBarStyle('light-content', true);

AppRegistry.registerComponent('WealthWay', () => WealthWay);

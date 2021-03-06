import React from 'react';
import {
  ListView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  View,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Elements
import SxCell from './elements/sx-cell';

// Utils
import wealthway from '../../utils/wealthway';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  topBlock: {
    backgroundColor: '#FF7F50',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  helpText: {
    color: 'white',
    fontSize: 12,
    alignSelf: 'center',
  },
  searchBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    paddingRight: 5,
  },
  searchBarInput: {
    flex: 4,
    flexDirection: 'column',
    height: 30,
    backgroundColor: '#FFA07A',
    borderRadius: 4,
    color: 'white',
    paddingLeft: 10,
  },
  clearIcon: {
    paddingLeft: 2,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#3CABDA',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 4,
  },
  suggestion: {
    flex: 10,
    paddingHorizontal: 15,
  },
});

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: false,
      text: null,
      helpText: '输入币种查询',
    };
  } 

  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(wealthway.getAllSupportedSxs),
      loaded: true,
      helpText: '输入币种查询',
    });
  }

  onTyping(text) {
    this.setState({
      text: text.text || '',
      helpText: '查询中.......',
    });

    const that = this;
    wealthway.symbolSuggest(text.text).then((result) => {        
        console.log("Query result:",result);
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(result),
          loaded: true,
          helpText: '输入币种查询',
        });
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
            backgroundColor="#FF6347"
            barStyle="light-content"
          />
        {Platform.OS === 'ios' && <View style={{ height: 20, backgroundColor: '#FF7F50' }} />}
        <View style={styles.topBlock}>
          <Text style={styles.helpText}>
            {this.state.helpText}
          </Text>
          <View style={styles.searchBar}>
            <Icon style={styles.searchIcon} name="search" size={20} color="white" />
            <TextInput
              style={styles.searchBarInput}
              autoCapitalize={'characters'}
              autoFocus={true}
              placeholder="Search"
              placeholderTextColor="gray"
              onChangeText={text => this.onTyping({ text })}
              value={this.state.text}
            />
            {(this.state.text && this.state.text.length > 0) ?
              <Icon
                style={styles.clearIcon}
                name="cancel" size={20}
                color="white"
                onPress={() => this.setState({
                  text: '',
                  dataSource: this.state.dataSource.cloneWithRows([]),
                })}
              /> : null}
            <TouchableHighlight
              style={styles.cancelButton}
              underlayColor="black"
              onPress={Actions.pop}
            >
              <Text style={styles.cancelButtonText}>
                取消
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.suggestion}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={sx =><SxCell sx={sx} watchlistCache={this.state.watchlistCache} />}
          />
        </View>
      </View>
    );
  }
}

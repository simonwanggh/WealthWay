import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import InstrumentBoard from 'react-native-instrument-board';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

export default class Investments extends React.Component {
    state = {
      percentage: 0,
    };
  
    handlePress = () => {
      if (this.state.percentage === 100) {
        this.setState({percentage: 0});
      } if (this.state.percentage + 10.5 >= 100) {
        this.setState({percentage: 100});
      }else {
        this.setState({percentage: this.state.percentage + 10.5});
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <InstrumentBoard percentage={this.state.percentage}/>
          <Text onPress={this.handlePress}>增加</Text>
        </View>
      );
    }
  }
  
  
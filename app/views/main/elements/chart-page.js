import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeSpanGroup: {
    flex: 1,
    flexDirection: 'row',
  },
  timeSpan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSpanText: {
    fontSize: 12,
    color: 'white',
    marginTop: 10,
  },
  timeSpanSelectedText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  chart: {
    flex: 4,
  },
  image: {
    flex: 1,
    alignSelf: 'auto'
  },
});

export default class ChartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSpan: 'min',
      url:''
    };
  }

  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timeSpanGroup}>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() =>  this.setState({ timeSpan: 'min' ,  url : {uri : this.props.watchlistResult[this.props.stock[0]][0].gopicture.minurl}})}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'min' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'分时'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => this.setState({ timeSpan: 'daily' ,  url : {uri : this.props.watchlistResult[this.props.stock[0]][0].gopicture.dayurl}})}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'daily' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'日K'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
           onPress={() => this.setState({ timeSpan: 'weekly' , url : {uri :  this.props.watchlistResult[this.props.stock[0]][0].gopicture.weekurl}})}
           //onPress={() => console.log("********************* componentDidMount" , this.props.watchlistResult, this.props.stock[0])} 
           underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'weekly' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'周K'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => this.setState({ timeSpan: 'monthly' , url : {uri : this.props.watchlistResult[this.props.stock[0]][0].gopicture.monthurl}} )}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'monthly' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'月K'}</Text>
          </TouchableOpacity>          
        </View>
        <View style={styles.chart}>
          <Image
            style={styles.image}
            source = {this.state.url}
            
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

ChartPage.propTypes = {
  stock: PropTypes.array,
  watchlistResult : PropTypes.shape({})
};

ChartPage.defaultProps = {
  stock: [],
  watchlistResult: {}
};

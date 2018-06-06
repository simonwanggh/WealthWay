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
    const defaultUrl = require('./../img/up.jpg');
    this.state = {
      timeSpan: 'M5',
      url:defaultUrl
    };
  }

  
  render() {
    const picUrl = 'http://tools.cnforex.com/line/MultiChart.ashx?currency={sxen}&type={span}'

    return (
      <View style={styles.container}>
        <View style={styles.timeSpanGroup}>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() =>  this.setState({ timeSpan: 'M5' ,  url : {uri : picUrl.replace('{sxen}', this.props.sx.en).replace('{span}','M5')}})}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'M5' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'M5'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => this.setState({ timeSpan: 'M15' ,  url : {uri : picUrl.replace('{sxen}', this.props.sx.en).replace('{span}','M15')}})}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'M15' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'M15'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
           onPress={() => this.setState({ timeSpan: 'H1' , url : {uri :  picUrl.replace('{sxen}', this.props.sx.en).replace('{span}','H1')}})}
           //onPress={() => console.log("********************* componentDidMount" , this.props.watchResult, this.props.stock[0])} 
           underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'H1' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'H1'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => this.setState({ timeSpan: 'H4' , url : {uri : picUrl.replace('{sxen}', this.props.sx.en).replace('{span}','H4')}} )}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'H4' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'H4'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => this.setState({ timeSpan: 'D1' , url : {uri : picUrl.replace('{sxen}', this.props.sx.en).replace('{span}','D1')}} )}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === 'D1' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'D1'}</Text>
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
  sx: PropTypes.any,
  watchResult : PropTypes.shape({})
};

ChartPage.defaultProps = {
  sx: {},
  watchResult: {}
};

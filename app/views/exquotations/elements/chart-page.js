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
import SxStore from '../../../stores/sx-store';

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
    alignSelf: 'auto',
    backgroundColor: 'transparent',
    opacity: .5
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

  picUrl = 'https://image.cngold.org/chart/forex/{type}.gif'

  componentDidMount() {
    SxStore.listen(state => this.onSxStoreChange(state));
  }

  componentWillUnmount() {
    SxStore.unlisten(state => this.onSxStoreChange(state));
  }

  onSxStoreChange(state) {
    if(state.selectedSx.en){
      let requrl = this.picUrl.replace('{type}', state.selectedSx.en.toLowerCase());
      this.setState({     
        
            timeSpan: '分时',
            url:{uri:requrl}
      
      });
    }
  }
  

 
  render() {
    

    return (
      <View style={styles.container}>
        <View style={styles.timeSpanGroup}>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() =>  {let rep = this.props.sx.en.toLowerCase();  this.setState({ timeSpan: '分时' ,  url : {uri : this.picUrl.replace('{type}', rep)}})}}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === '分时' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'分时'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => {let rep = this.props.sx.en.toLowerCase()+'_dayk'; this.setState({ timeSpan: '日K' ,  url : {uri : this.picUrl.replace('{type}', rep)}})}}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === '日K' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'日K'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
           onPress={() => {let rep = this.props.sx.en.toLowerCase()+'_weekk'; this.setState({ timeSpan: '周K' , url : {uri :  this.picUrl.replace('{type}', rep)}})}}
           //onPress={() => console.log("********************* componentDidMount" , this.props.watchResult, this.props.stock[0])} 
           underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === '周K' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'周K'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timeSpan}
            onPress={() => { let rep =  this.props.sx.en.toLowerCase()+'_monthk'; this.setState({ timeSpan: '月K' , url : {uri : this.picUrl.replace('{type}',rep)}} )}}
            underlayColor="#202020"
          >
            <Text style={[this.state.timeSpan === '月K' ? styles.timeSpanSelectedText : styles.timeSpanText]}>{'月K'}</Text>
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

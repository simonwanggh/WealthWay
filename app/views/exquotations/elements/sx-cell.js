import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

// Flux
import SxActions from '../../../actions/sx-action';
import SxStore from '../../../stores/sx-store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: '#F5F5F5',
  },
  symbol: {
    flex: 3,
  },
  symbolText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 12,
  },
  priceText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  changeRed: {
    backgroundColor: '#FC3D39',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeGreen: {
    backgroundColor: '#53D769',
    flex: 2,
    padding: 5,
    borderRadius: 3,
  },
  changeText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});



export default class SxCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = SxStore.getState();    
  }

  componentDidMount() {
    SxStore.listen(state => this.onSxStoreChange(state));
  }

  componentWillUnmount() {
    SxStore.unlisten(state => this.onSxStoreChange(state));
  }

  onSxStoreChange(state) {
    this.setState({
       selectedSx: state.selectedSx,
    });
  }

  changeSelectedSx(sx) {
    SxActions.selectSx(sx);
  }

  deleteSx(sx){
    SxActions.deleteSx(sx);
  }

  render() {
    let swipeBtns = [{
      text: '删除',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.deleteSx(this.props.sx) }
    }];
    return (
      <Swipeout right={swipeBtns}
      autoClose = {true}
      backgroundColor= 'transparent'>
        <TouchableHighlight
          style={[this.state.selectedSx === this.props.sx ? styles.selected : null]}
          onPress={() => this.changeSelectedSx(this.props.sx)} underlayColor="#202020"
        >
          <View style={[styles.container, this.state.selectedSx === this.props.sx ? styles.selected : null]}>
            <View style={styles.symbol}>
              <Text style={styles.symbolText}>
                {this.props.sx.cn}
              </Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>
                {this.props.watchlistResult && this.props.watchlistResult[this.props.sx.en] && 
                  "买入价:"+this.props.watchlistResult[this.props.sx.en].bid +
                  "   卖出价:"+this.props.watchlistResult[this.props.sx.en].ask+"     "+this.props.watchlistResult[this.props.sx.en].price}
              </Text>
            </View>         
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

SxCell.propTypes = {
  watchlistResult: PropTypes.shape({}),
  sx: PropTypes.shape({
    en: PropTypes.string,
    cn: PropTypes.string
  }),
};

SxCell.defaultProps = {
  watchlistResult: [],
  sx: {},
};

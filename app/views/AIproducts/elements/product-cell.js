import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';



const ROTATE_PROPERTIES = {
  Change: 'MarketCapitalization',
  ChangeinPercent: 'Change',
  MarketCapitalization: 'ChangeinPercent',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    backgroundColor: '#202020',
  },
  symbol: {
    flex: 1,
  },
  symbolText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  price: {
    flex: 6,
  },
  priceText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  longText: {
    fontSize: 12,
    color: 'white',
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
  changeBlue: {
    backgroundColor: '#87CEEB',
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
    color: 'white',
    textAlign: 'center',
  },
});

export default class StockCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};   
  }

  componentDidMount() {
   
  }

  componentWillUnmount() {

  }

 

  changeSelectedProduct(stock) {
   
  }

  render() {
    
    return (
      <TouchableHighlight
        style={['1' === this.props.product ? styles.selected : null]}
        onPress={() => this.changeSelectedProduct(this.props.product)} underlayColor="#202020"
      >
        <View style={[styles.container,'1' === this.props.product ? styles.selected : null]}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>
              AI {this.props.product}
            </Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.longText}>
            {(() => {switch (this.props.product === '1') {
                case true: return '模拟年收益率 21.2%  |  最大回撤 5.9%';
                case false: return '模拟年收益率 10.8%  |  最大回撤 2.1%';
                default: return '模拟年收益率 10.8%  |  最大回撤 2.1%';}})()}        
              
            </Text>
          </View>
          <TouchableHighlight
            style={this.props.product === '1' ? styles.changeRed : styles.changeBlue}    
            underlayColor='#FC3D39'
            onPress={() => console.log("press")}
          >
            <View>
              <Text style={styles.changeText}>
              {(() => {switch (this.props.product === '1') {
                case true: return '风险等级 3';
                case false: return '风险等级 1';
                default: return '风险等级 1';}})()}
                     
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    );
  }
}

StockCell.propTypes = {
  watchlistResult: PropTypes.shape({}),
  stock: PropTypes.shape({
    symbol: PropTypes.string,
  }),
};

StockCell.defaultProps = {
  watchlistResult: [],
  stock: {},
};

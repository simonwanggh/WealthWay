import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ProdActions from './../../../actions/prod-action';
import ProdStore from './../../../stores/prod-store';



const ROTATE_PROPERTIES = {
  Change: 'MarketCapitalization',
  ChangeinPercent: 'Change',
  MarketCapitalization: 'ChangeinPercent',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 1,
    marginRight: 1,
    flexDirection: 'column',
    height: 55,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft:5
  },
  selected: {
    backgroundColor: '#F5F5F5',
  },
  productTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  prodTitleText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
    marginTop: 1,
    marginBottom: 1,
    marginRight: 1,
    paddingRight: 50
  },
  price: {
    flex: 1,
  },
  priceText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'right',
    marginTop: 1,
    marginBottom: 1,
    marginRight: 1,
  },
  longText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
    marginTop: 1,
    marginBottom: 1,
    marginRight: 1,
  },
  changeRed: {
    backgroundColor: '#FC3D39',
    flex: 2,
    padding: 1,
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
  levelTextRed: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    borderColor: '#FC3D39',
    padding: 1,
    borderRadius: 3, 
    borderWidth: 1,
    marginTop : 6,
    marginBottom : 6   
  },
  levelTextBlue: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',  
    borderColor: '#87CEEB',
    padding: 1,
    borderRadius: 3,
    borderWidth: 1,
    marginTop : 6,
    marginBottom : 6  
  }
});

export default class ProductCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {selectedProd : ''}; 
    ProdActions.selectProd('');  
  }

  componentDidMount() {
    ProdStore.listen(state => this.onProdStoreChange(state));
  }

  componentWillUnmount() {
    ProdStore.unlisten(state => this.onProdStoreChange(state));
  }


  onProdStoreChange(state){
    this.setState({selectedProd : state.selectedProd})
  }

 
  changeSelectedProduct(product) {
    ProdActions.selectProd(product)
    Actions.invest();
  }

  render() {
    
    return (
      <TouchableHighlight
        style={[this.state.selectedProd === this.props.product ? styles.selected : null]}
        onPress={() => this.changeSelectedProduct(this.props.product)} underlayColor="#202020"
      >
        <View style={[styles.container,this.state.selectedProd === this.props.product ? styles.selected : null]}>
          <View style={styles.productTitle}>
            <Text style={styles.prodTitleText}>
              AI {this.props.product}
            </Text>
           
            <Text style={this.props.product === '1' ? styles.levelTextRed : styles.levelTextBlue}>
              {(() => {switch (this.props.product === '1') {
                case true: return '风险等级 3';
                case false: return '风险等级 1';
                default: return '风险等级 1';}})()}
                    
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
        </View>
      </TouchableHighlight>
    );
  }
}

ProductCell.propTypes = {
  watchlistResult: PropTypes.shape({}),
  product: PropTypes.string,
};

ProductCell.defaultProps = {
  watchlistResult: {},
  product: '',
};

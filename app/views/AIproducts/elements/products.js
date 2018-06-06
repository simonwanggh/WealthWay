import React from 'react';

import {
    ListView,
    Platform,
    Text,
    StyleSheet,
    TouchableHighlight,
    View,
    RefreshControl,
  } from 'react-native';

import ProductCell from './product-cell';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'black',
    },
    statusBar: {
      height: 20,
    },
    stocksBlock: {
      flexDirection: 'column',
      flex: 9,
    }
  });
  
export default class ProductBody extends React.Component {

    constructor(props) {
        super(props);
    
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['1', '2']),
        };
    }

    render() {
        return (

            <View style={styles.stocksBlock}>
                <ListView
                    key={this.state.key}
                    refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.onRefresh()}
                        />
                    }
                    dataSource={this.state.dataSource}
                    renderRow={product => <ProductCell product={product} />}
                />
            </View>
        );
    }
}
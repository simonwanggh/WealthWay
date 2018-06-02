import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
  },
  details: {
    flex: 5,
    flexDirection: 'column',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsRowColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  separatorThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A6A6A6',
  },
  propertyText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left',
  },
  valueText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right',
  },
});

export default class DetailsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeSpan: '1D',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>
            {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.name) || '--'}
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              今日开盘价
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.todayStartPri) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              涨跌百分比
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.increPer) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              涨跌额
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.increase) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              今日最高价
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.todayMax) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              今日最低价
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.todayMin) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              成交量
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.traNumber) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              成交金额
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.traAmount) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              昨日收盘价
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.yestodEndPri) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              日期
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.date) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>
              时间
              </Text>
              <Text style={styles.valueText}>
                {(this.props.watchlistResult && this.props.watchlistResult[this.props.stock[0]] && this.props.watchlistResult[this.props.stock[0]][0].data.time) || '--'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

DetailsPage.propTypes = {
  watchlistResult: PropTypes.shape({}),
  stock: PropTypes.array,
};

DetailsPage.defaultProps = {
  watchlistResult: [],
  stock: [],
};

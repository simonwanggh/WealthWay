/**
 * Project - react-native-instrument-board
 * Author      : ljunb
 * Date        : 2017/11/22 下午8:33
 * Description : 底部中间的标题和副标题
 */
import React, {Component} from 'react'
import {
  View,
  Text
} from 'react-native';

export default class BoardTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setState({title: nextProps.title})
    }
  }

  render() {
    const {title} = this.state;
    const {startAngle, radius, innerRadius, subTitle} = this.props;
    const x1 = radius + innerRadius * Math.sin(2 * Math.PI / 360 * (360 - startAngle));
    const x2 = radius - innerRadius * Math.sin(2 * Math.PI / 360 * startAngle);
    const y = radius + innerRadius * Math.cos(2 * Math.PI / 360 * startAngle);
    let sourceTitle;
    if(typeof title === 'number'){
      sourceTitle = title.toFixed(2);
      if (Math.floor(sourceTitle) == sourceTitle) {
        sourceTitle = title.toFixed(0);
      }
    }else{
      sourceTitle = title;
    }

    return (
      <View style={{position: 'absolute', top: y - 50, left: x1, right: x2, backgroundColor: 'transparent'}}>
        <Text style={{textAlign: 'center', fontSize: 14, color: 'white'}}>{sourceTitle}</Text>
        <Text style={{textAlign: 'center', fontSize: 10, color: 'white'}}>{subTitle}</Text>
      </View>
    )
  }
}
import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import InstrumentBoard from './../instrumentboard';
import LinearGradient from 'react-native-linear-gradient';

import ProdStore from './../../stores/prod-store';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    headerBlock:{
      flex: 1,
      marginTop : 10
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
    linearGradient: {
      flex: 9, 
      alignSelf: 'stretch', 
      alignItems: 'center', 
      paddingTop: 10  
    },
    divideBlock :{
      flex: 1,
      backgroundColor : '#FAFAD2',
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    bodyBlock:{
      flex: 10, 
      backgroundColor: 'white',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    footerBlock:{
      flex: 2, 
      alignSelf: 'stretch',
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop:5 ,
      paddingBottom:5,
      paddingLeft:1,
      paddingRight:1
      
    },
    
  });


  const deviceWidth = Dimensions.get('window').width;

export default class Investments extends React.Component {

  constructor(props) {
    super(props);
   
    let selProd = ProdStore.state.selectedProd;

    this.state = {
      selectedProd : selProd? selProd : '',
      percentage: selProd === '1' ? 50:0  ,
    };
  }


  // componentDidMount() {
  //   ProdStore.listen(state => this.onProdChange(state)); 
  // }
  

  // componentWillUnmount() {
  //   ProdStore.unlisten(state => this.onProdChange(state));    
  // }

  // onProdChange(state){
  //   console.log("*************",state);
  //   this.setState({selectedProd : state.selectedProd})
  // }

  
    handlePress = () => {
      if (this.state.percentage === 100) {
        this.setState({percentage: 0});
      } if (this.state.percentage + 10.5 >= 100) {
        this.setState({percentage: 100});
      }else {
        this.setState({percentage: this.state.percentage + 10.5});
      }
    };

    onInvest(){
      Alert.alert(
        '敬请期待',
        '马上上线......',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
    }
  
    render() {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#FF4500"
            barStyle="light-content"
          />
          <LinearGradient colors={['#FF4500', '#FF7F50', '#FFA07A']} style={styles.linearGradient}>
            <View style = {styles.headerBlock}>            
              <InstrumentBoard percentage={this.state.percentage}
                                radius = {120}
                                degreeTextRadius = {100}
                                startAngle = {50}
                                strokeWidth = {3}
                                contentStrokeColors = {['#B22222','#B22222','#B22222','#B22222']}
                                degreeTexts = {['1','2','3','4','5']}
                                needleRadius = {60}
                                centerSpotRadius = {5}
                                contentTexts = {['','','','']}
                                title = {this.state.selectedProd === '1' ? '风险等级3' : '风险等级1'}
                                subtitle = {this.state.selectedProd === '1' ? '模拟年收益率 21.2%   最大回撤 5.9%':'模拟年收益率 10.8%  最大回撤 2.1%' }/>
              
            </View>            
          </LinearGradient>
          <View style={styles.divideBlock}>
            <Text>模拟历史数据</Text>
          </View>
          <View style={styles.bodyBlock}>
            <Image source = {this.state.selectedProd === '1' ? require('./img/1.jpg') : require('./img/2.jpg')} 
            resizeMode="contain"
            style={{width: deviceWidth}}>
            </Image>
          </View>
          <View style={styles.footerBlock}>
            <TouchableOpacity onPress={Actions.pop} style={{borderWidth: 0.5,borderColor: '#FF7F50',alignItems: 'center',  justifyContent: 'center',flex:1, alignSelf: 'stretch', marginTop: 10, marginRight:10, marginLeft:10 }}>
              
                <Text style={{fontWeight:'bold'}}>取       消</Text>
            
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onInvest} style={{alignItems: 'center', justifyContent: 'center',flex:1, backgroundColor:'#FF7F50',alignSelf: 'stretch', marginTop: 10, marginRight:10, marginLeft:10 }}>
             
                <Text style={{fontWeight:'bold'}}>一键投资</Text>
             
            </TouchableOpacity>
          </View>
        </View>
        
      );
    }
  }
  
  
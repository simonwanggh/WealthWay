import React from 'react';
import { Component, PropTypes, View, Platform,Text, Image, IntentAndroid, Button,StyleSheet } from 'react-native';
import { Divider,Drawer, COLOR, ThemeProvider } from 'react-native-material-ui';
import ImageOverlay from 'react-native-image-overlay';
import {typography} from 'react-native-material-design-styles';
import { Actions } from 'react-native-router-flux';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const uiTheme = {
    palette: {
        primaryColor: COLOR.lightBlue100,
        accentColor: COLOR.lightBlue800,
    },
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    headerBlock: {
        flexDirection: 'column',
        flex: 3,
    },
    bodyBlock: {
        flexDirection: 'column',
        flex: 7,
    },
    imageContainer: {
      height:128,
      width: 128,
      borderRadius: 64
    },
    image: {
      height:82,
      width: 82,
      borderRadius: 64
    },
    divider: {
        height: 1
    },
    toolbar: {
        height: 56,
        backgroundColor: '#202020',
      },
      navigatorBarIOS: {
        backgroundColor: '#202020',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#424242',
      },
      navigatorLeftButton: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 50,
      },
  });

changeScene = (path, name) => {
    // const { drawer, navigator } = this.context;

    // this.setState({
    //     route: path
    // });
    // navigator.to(path, name);
    // drawer.closeDrawer();
};

export default class MyBody extends React.Component {


    renderToolbar() {
        if (Platform.OS === 'ios') {
          return (
            <NavigationBar
              statusBar={{ tintColor: '#202020', style: 'light-content' }}
              style={styles.navigatorBarIOS}
              title={{ title: "我的", tintColor: 'white' }}
              rightButton={{
                title: 'Done',
                tintColor: '#3CABDA',
                handler: Actions.pop,
              }}
            />
          );
        } else if (Platform.OS === 'android') {
          return (
            <MIcon.ToolbarAndroid
              style={styles.toolbar}
              title='我的'
              titleColor="white"
              actions={[                
                { title: 'back', iconName: 'arrow-back', iconSize: 26, show: 'always' }         
              ]}
              onActionSelected={ Actions.pop}
            />
          );
        }
      }


    render() {        
        return (
            <View style={styles.container}>
                {this.renderToolbar()}
                <View style={styles.headerBlock}>                 
                    <ImageOverlay
                        source={require('./../img/nav.jpg')}
                        contentPosition="bottom">
                        <View>
                            <Image style={styles.image} source={require('./../img/opengraph.png')} />
                            <Text>Amelia Edwards</Text>
                            <Text>Kuala Lumpur, Malaysia</Text>
                        
                        </View>
                    </ImageOverlay>
                </View>
            
                <View style={styles.bodyBlock}>
                <ThemeProvider uiTheme={uiTheme}>
                    <Drawer theme='light'>

                      
                        
                        <Drawer.Section
                            items={[{
                                icon: 'home',
                                value: '欢迎',
                                active: true,
                                onPress: () => this.changeScene('welcome'),
                                onLongPress: () => this.changeScene('welcome')
                            }]}
                        />

                        <Drawer.Section
                            title=""
                            items={[{
                                icon: 'face',
                                value: '推广',
                                label: '12',
                                active: false,
                                onPress: () => this.changeScene('avatars'),
                                onLongPress: () => this.changeScene('avatars')
                            }, {
                                icon: 'label',
                                value: '帮助中心',
                                active: false,
                                label: '8',
                                onPress: () => this.changeScene('buttons'),
                                onLongPress: () => this.changeScene('buttons')
                            }, {
                                icon: 'label',
                                value: '关于我们',
                                label: '7',
                                active: false,
                                onPress: () => this.changeScene('icon-toggles'),
                                onLongPress: () => this.changeScene('icon-toggles')
                            }                    
                            ]}
                        />
                        <Divider style={{ marginTop: 8 }} />
                        <Drawer.Section
                            title="配置"
                            items={[{
                                icon: 'invert-colors',
                                value: '进入',
                                label: '24',
                                active: false,
                                onPress: () => this.changeScene('themes'),
                                onLongPress: () => this.changeScene('themes')
                            }]}
                        />

                    </Drawer>
                
                </ThemeProvider>
                </View>
            </View>
        );
    }

}
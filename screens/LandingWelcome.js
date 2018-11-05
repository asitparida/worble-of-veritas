import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import { WebBrowser } from 'expo';
import { Icon } from 'react-native-elements'

import { MonoText } from '../components/StyledText';

export default class LandingWelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    this.animatedValueForScaling = new Animated.Value(0.5);
    this.animatedValueForRotation = new Animated.Value(0);
  }
  componentDidMount() {
      Animated.loop(Animated.sequence([
        Animated.timing(this.animatedValueForScaling, {
            toValue: 1,
            duration: 300,
            delay: 1000
          }),
          Animated.timing(this.animatedValueForScaling, {
            toValue: 0,
            duration: 300
          }),
          Animated.timing(this.animatedValueForScaling, {
            toValue: 0.5,
            duration: 100
          }),
          Animated.timing(this.animatedValueForScaling, {
            toValue: 0,
            duration: 300            
          }),      
          Animated.timing(this.animatedValueForScaling, {
            toValue: 0.5,
            duration: 300            
          })
      ])).start();
  }

  render() {
      const scaledAnimatedStyle = {
        transform: [
            { 
                scaleX: this.animatedValueForScaling.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.80, 1.2],
                  })
            },
            { 
                scaleY: this.animatedValueForScaling.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2],
                  })
            }
        ]
      }
    return (
      <View style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Welcome</Text>
          <Text style={styles.getStartedText}>to</Text>
          <Text style={styles.getStartedTextBottom}>Veritas</Text>
        </View>
        <View style={styles.welcomeContainer}>
        <Image 
              source={
                require('../assets/images/planet_veritas.png')
              }
              style={styles.welcomeImage} />
        </View>
        <View style={styles.tabBarInfoContainer}>
              <Animated.View style={[styles.centralIconStyles, scaledAnimatedStyle]}>
                <Icon color='#fbfbfb' size={36} name='keyboard-arrow-right' />
              </Animated.View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-start'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20
  },
  welcomeImage: {
    width: 180,
    height: 150,
    resizeMode: 'contain',
    marginTop: 0,
    marginBottom: 30,
    marginLeft: -10,
    ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 1,    
        },
        android: {
          elevation: 20,
        },
      })
  },
  getStartedContainer: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 100,
    marginBottom: 0
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 50,
    marginBottom: 0
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 36,
    color: 'rgba(255,255,255, 0.50)',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'segoe-ui-light',
  },
  getStartedTextBottom: {
    fontSize: 60,
    color: 'rgba(255,255,255, 0.50)',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'segoe-ui-semibold',
    letterSpacing: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.33)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  tabBarInfoContainer: {
    position: 'absolute',
    flex: 1,
    bottom: 10,
    borderRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  centralIconStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    lineHeight: 60,
    borderColor: '#fbfbfb',
    borderStyle: 'solid',
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),  
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

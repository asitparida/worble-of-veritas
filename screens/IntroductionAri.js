import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableWithoutFeedback
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import WorbleManager from '../services/WorbleManager';
import { LinearGradient } from 'expo';

const ariIcon = require('../assets/images/ari_icon_neutral.png');

export default class AriIntroduction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAriComments: true,
            ariCommentAnimation: 'bounceInDown',
            commentTitle: 'Welcome to Planet Veritas!',
            commentText: 'My name is Ari and I am your personal assistant'
        };
    }

    _onPressButton() {
        this.props.handleOnPress();
    }

    componentWillMount() {
        this.animatedValueForScaling = new Animated.Value(0.5);
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
        let { commentText, showAriComments, ariCommentAnimation, commentTitle } = this.state;
        let ariIconWrapperExtra = {};
        if (showAriComments) {
            ariIconWrapperExtra = {
                backgroundColor: 'rgba(255,255,255, 0.6)'
            };
        }
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
            <Animatable.View style={styles.container} animation="fadeIn" easing="ease-out" iterationCount={1} duration={1000}>
                <LinearGradient
                    style={styles.lienarGradientContainer}
                    colors={['rgba(213, 213, 78, 0.6)', 'rgba(51, 138, 200, 0.4)']} >
                    <View style={styles.welcomeContainer}>
                        <View style={styles.commentsContainer}>
                            {showAriComments &&
                                <TouchableWithoutFeedback>
                                    <Animatable.View animation={ariCommentAnimation} style={styles.commentsOuterWrapper} useNativeDriver={true} >
                                        <View style={styles.commentsWrapper}>
                                            <View style={styles.commentTip}></View>
                                            <Text style={styles.commentsText}>{commentTitle}</Text>
                                            <Text style={styles.commentsText}>{commentText}</Text>
                                        </View>
                                    </Animatable.View>
                                </TouchableWithoutFeedback>
                            }
                        </View>
                        <Animatable.Image animation="tada" easing="ease-in" iterationCount={1} duration={1000}
                            source={ariIcon}
                            style={styles.welcomeImage} />
                    </View>
                    <View style={styles.tabBarInfoContainer}>
                        <TouchableWithoutFeedback onPress={this._onPressButton.bind(this)}>
                            <Animated.View style={[styles.centralIconStyles, scaledAnimatedStyle]} >
                                <Icon color='#fff' size={36} name='keyboard-arrow-right' />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </LinearGradient>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    lienarGradientContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1
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
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 0,
        marginLeft: -5,
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
    commentsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        marginBottom: 0,
        marginBottom: 20
    },
    welcomeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
        flex: 1
    },
    tabBarInfoContainer: {
        marginBottom: 20,
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
        backgroundColor: '#2980B9',
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
    ariIconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255, 0.2)',
        marginBottom: 20,
        marginTop: 20,
        marginRight: 20,
        borderRadius: 30,
        marginLeft: 'auto',
        height: 60,
        width: 60
    },
    ariIconStyle: {
        width: 36,
        height: 36,
        resizeMode: 'contain'
    },
    commentsOuterWrapper: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        zIndex: 999,
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 40
    },
    commentsWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        textAlign: 'justify',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexBasis: 0,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        position: 'relative',
        zIndex: 997,
    },
    commentsText: {
        fontFamily: 'shaky-hand-some-comic',
        fontSize: 20,
        letterSpacing: 1,
        lineHeight: 30,
        textAlign: 'center'
    },
    commentTip: {
        zIndex: 998,
        bottom: -25,
        right: '50%',
        width: 0,
        height: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    progressBarWrapper: {
        marginTop: 30
    }
});

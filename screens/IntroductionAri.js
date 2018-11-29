import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import WorbleManager from '../services/WorbleManager';
import { LinearGradient } from 'expo';
import AppConstants from '../constants/AppConstants';
import * as _ from 'lodash';
import WorbleHolder from '../components/WorbleHolder';

const ariIconBig = require('../assets/images/ari_icon_neutral.png');
const ariIconSmall = require('../assets/images/ari_small.png');

export default class AriIntroduction extends React.Component {
    introductions = AppConstants.Introductions;
    nextState = null;
    constructor(props) {
        super(props);
        this.state = {
            showAriComments: true,
            ariCommentAnimation: 'bounceInDown',
            commentTitle: 'Welcome to Planet Veritas!',
            commentText: 'My name is Ari and I am your personal assistant',
            profile: AppConstants.ProfileInfo,
            profileEditing: false,
            nameFocussed: true,
            activeIntroudctionIndex: -1,
            nextButtonDisabled: false,
            showEgg: false,
            egg: WorbleManager.currentEggState || AppConstants.NEW_WORBLE_EGG_STATE,
            profileInfoSaved: false,
            ariIcon: ariIconBig
        };
    }

    onNameChange(name) {
        const profileObj = this.state.profile;
        const profile = Object.assign({}, profileObj, {
            name: name,
            set: true
        })
        this.setState({
            profile: profile
        });
    }

    onNameFocus() {
        this.setState({
            nameFocussed: true
        });
    }

    onNameBlur() {
        this.setState({
            nameFocussed: false
        });
    }

    _onPressButton() {
        let loadState = this.nextState;
        let { profile, profileEditing, activeIntroudctionIndex, showEgg } = this.state;
        if (!profile.set) {
            if (!profileEditing) {
                this.setState({
                    commentTitle: '',
                    commentText: 'What should I call you ?',
                    profileEditing: true
                });
            }
        } else {
            activeIntroudctionIndex += 1;
            if (profileEditing) {
                this.setState({
                    profileEditing: false,
                    commentTitle: `Hey ${profile.name}`,
                    commentText: this.introductions[activeIntroudctionIndex].text,
                    activeIntroudctionIndex: activeIntroudctionIndex
                });
            } else {
                if (activeIntroudctionIndex < this.introductions.length) {
                    this.setState({
                        profileEditing: false,
                        commentTitle: '',
                        commentText: this.introductions[activeIntroudctionIndex].text,
                        activeIntroudctionIndex: activeIntroudctionIndex,
                        ariIcon: ariIconSmall
                    });
                } else {
                    if (loadState !== 'Call.Egg.Decorate' && loadState !== 'Call.LaunchHome') {
                        this.nextState = 'Call.Egg.Decorate';
                        this.setState({
                            commentTitle:'OHHH MYYY !!',
                            commentText: 'This egg was found abandoned. You have been entrusted to raise it.!',
                            showEgg: true,
                            egg: AppConstants.NEW_WORBLE_EGG_STATE
                        })
                    } else if (loadState === 'Call.Egg.Decorate') {
                        this.nextState = 'Call.LaunchHome';
                        this.setState({
                            commentTitle:'',
                            commentText: 'Time to decorate and personalize the egg !',
                            showEgg: true,
                            egg: AppConstants.NEW_WORBLE_EGG_STATE
                        })
                    } else if (loadState === 'Call.LaunchHome') {
                        WorbleManager.setProfileInformation(this.state.profile).then(() => {
                            WorbleManager.profileInfo.next(this.state.profile);
                            WorbleManager.appState.next('READY_TO_INCUBATE');
                        });
                        WorbleManager.setStorage(AppConstants.STORAGE_KEYS.ARI_INTRODUCED, true).then(() => {
                            this.props.handleOnPress();
                        });
                    }
                }
            }
        }
    }

    componentWillMount() {
        this.animatedValueForScaling = new Animated.Value(0.5);
        this.profileInfoSubscription = WorbleManager.profileInfo$.subscribe((data) => {
            this.setState({
                profile: data
            });
        });
    }

    componentWillUnmount() {
        [
            this.profileInfoSubscription
        ].forEach(x => {
            if (x) {
                x.unsubscribe();
                x = null;
            }
        });
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
        let { commentText, showAriComments, ariCommentAnimation, commentTitle, profileEditing, showEgg } = this.state;
        const showCommentsTitle = !_.isEmpty(commentTitle);
        const showCommentsText = !_.isEmpty(commentText);
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
        let activeTextClass = this.state.nameFocussed ? {
            borderBottomColor: 'rgba(0, 0, 0, 0.60)'
        } : {};
        let eggHolderDimensions = {
            height: 100,
            marginBottom: 0
        }
        let eggDimensions = {
            height: 120
        }
        let welcomeContainerMod = {};
        welcomeContainerMod = {
            marginBottom: 20,
            marginTop: 20
        };
        let commentsContainerExtra = {};
        let welcomeImageExtra = {};
        let ariIcon = this.state.ariIcon;
        if (ariIcon === ariIconSmall) {
            commentsContainerExtra = {
                paddingTop: 20,
                marginBottom: 20
            };
            welcomeImageExtra = {
                height: 100
            }
        }
        return (
            <Animatable.View style={styles.container} animation="fadeIn" easing="ease-out" iterationCount={1} duration={1000}>
                <LinearGradient
                    style={styles.lienarGradientContainer}
                    colors={['rgba(213, 213, 78, 0.6)', 'rgba(51, 138, 200, 0.4)']} >
                    <View style={[styles.welcomeContainer, welcomeContainerMod]}>
                        { showEgg && 
                            <WorbleHolder dontCheckPersonalized={true} worbleEggDimensions={eggDimensions} worbleDimensions={eggHolderDimensions} dontListen={true} egg={this.state.egg}  />
                        }
                        <View style={[styles.commentsContainer, commentsContainerExtra]}>
                            {showAriComments &&
                                <TouchableWithoutFeedback>
                                    <Animatable.View animation={ariCommentAnimation} style={styles.commentsOuterWrapper} useNativeDriver={true} >
                                        <View style={styles.commentsWrapper}>
                                            <View style={styles.commentTip}></View>
                                            {showCommentsTitle && <Text style={styles.commentsTitle}>{commentTitle}</Text>}
                                            {showCommentsText && <Text style={styles.commentsText}>{commentText}</Text>}
                                        </View>
                                    </Animatable.View>
                                </TouchableWithoutFeedback>
                            }
                        </View>
                        {
                            profileEditing &&
                            <Animatable.View style={styles.textChanger} animation="bounceIn" delay={100}>
                                <TextInput onFocus={this.onNameFocus.bind(this)} onBlur={this.onNameBlur.bind(this)} autoFocus={true} keyboardType={'default'} keyboardAppearance={'default'} style={[styles.petName, activeTextClass]} onChangeText={this.onNameChange.bind(this)} value={this.state.profile.name} />
                            </Animatable.View>
                        }
                        <Animatable.Image animation="tada" easing="ease-in" iterationCount={1} duration={1000}
                            source={ariIcon}
                            style={[styles.welcomeImage, welcomeImageExtra]} />
                    </View>
                    <View style={styles.tabBarInfoContainer}>
                        <TouchableWithoutFeedback onPress={this._onPressButton.bind(this)} >
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
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 0,
        justifyContent: 'flex-end',
        marginBottom: 80,
        flex: 1
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
        marginBottom: 20
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
    commentsTitle: {
        fontFamily: 'shaky-hand-some-comic',
        fontSize: 24,
        letterSpacing: 1,
        lineHeight: 30,
        textAlign: 'center',
        paddingVertical: 5
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
    },
    textChanger: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 60
    },
    petName: {
        fontSize: 48,
        width: '100%',
        color: 'rgba(0, 0, 0, 0.80)',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'shaky-hand-some-comic',
        textShadowColor: 'rgba(0, 0, 0, 0.33)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 4,
        letterSpacing: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.10)',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 15,
        paddingBottom: 15,
        marginTop: -20
    }
});

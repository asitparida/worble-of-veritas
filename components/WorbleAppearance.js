import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import WorbleManager from '../services/WorbleManager.js'
import { BlurView } from 'expo';
import ProgressBar from './ProgressBar.js';
import Constants from '../constants/Constants.js';
import WorbleHolder from './WorbleHolder.js';

const avatarSrc = require('../assets/images/avatar.png');

export default class WorbleAppearance extends React.Component {

    colorSelected = null;
    colors = [
        { eggBgFill: '#f0867a', eggTextureFill: '#a22112', eggMoonFill: '#C73A4D' },
        { eggBgFill: '#a29bfe', eggTextureFill: '#1002ca', eggMoonFill: '#8a81fd' },
        { eggBgFill: '#fdcb6e', eggTextureFill: '#b37502', eggMoonFill: '#fbad1a' }
    ];

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            egg: WorbleManager.currentEggState || Constants.NEW_WORBLE_EGG_STATE,
            showEgg: true,
            name: 'Harold',
            nameFocussed: false
        };
    }

    choseBgColor(x) {
        if (this.colorSelected !== x.eggBgFill) {
            const egg = Object.assign({}, this.state.egg, x);
            this.setState({
                egg: egg
            })
            WorbleManager.eggState.next(egg);
            this.colorSelected = x.eggBgFill;
        } else {
            const egg = Object.assign({}, this.state.egg, Constants.NEW_WORBLE_EGG_STATE);
            this.setState({
                egg: egg
            })
            WorbleManager.eggState.next(egg);
            this.colorSelected = null;
        }
    }

    closeInbox() {
        WorbleManager.showWorbleAppearance.next(false);
    }

    onNameChange(name) {
        this.setState({
            name: name
        });
        WorbleManager.worbleName.next(name);
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

    render() {
        const dims = Dimensions.get('window');
        let worbleWidth = 0.70 * (dims.width);
        worbleWidth = worbleWidth > 230 ? 230 : worbleWidth;
        let worbleDimensions = {
            width: worbleWidth,
            height: worbleWidth
        }
        let dimension = worbleDimensions.width / 3.25;
        let worbleShadowDimensions = {
            height: dimension,
            width: dimension,
            marginTop: dimension + 20,
            borderRadius: dimension / 2,
            bottom: -15
        }
        if (this.state.showEgg) {
            dimension = 10;
            worbleShadowDimensions = {
                height: dimension,
                width: dimension,
                marginTop: dimension + 20,
                borderRadius: dimension / 2,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderColor: 'rgba(0,0,0,0.03)',
                transform: [
                    { scaleX: 3 },
                    { translateX: -0 }
                ],
                bottom: -15
            }
        }
        let activeTextClass = this.state.nameFocussed ? {
            borderBottomColor: 'rgba(0, 0, 0, 0.60)'
        } : {}
        const colorDivs = this.colors.map((x, i) => {
            return <TouchableWithoutFeedback key={i} onPress={this.choseBgColor.bind(this, x)}>
                <View style={[styles.colorBtn, { backgroundColor: x.eggBgFill }]}></View>
            </TouchableWithoutFeedback>
        });
        return (
            <Animatable.View animation="fadeIn" style={styles.progressContainerWrapper}>
                <BlurView tint="light" intensity={90} style={styles.progressContainerWrapper} >
                    <TouchableWithoutFeedback onPress={this.closeInbox.bind(this)}>
                        <View style={styles.closeContainer}><Text style={styles.closeLabel}>x</Text></View>
                    </TouchableWithoutFeedback>
                    <Animatable.View style={styles.progressContainer} animation="bounceIn" delay={500}>
                        <View style={styles.progressHolderContainer}>
                            <View style={styles.progressHolderWrapper}>
                                <WorbleHolder dontListe={true} egg={this.state.egg} worbleDimensions={worbleDimensions} worbleShadowimensions={worbleShadowDimensions} />
                            </View>
                        </View>
                    </Animatable.View>
                    <Animatable.View style={styles.textChanger} animation="bounceIn" delay={500}>
                        <TextInput onFocus={this.onNameFocus.bind(this)} onBlur={this.onNameBlur.bind(this)} autoFocus={true} keyboardType={'default'} keyboardAppearance={'default'} style={[styles.petName, activeTextClass]} onChangeText={this.onNameChange.bind(this)} value={this.state.name} />
                    </Animatable.View>
                     <Animatable.View style={styles.colorChanger} animation="bounceIn" delay={500}>
                        {colorDivs}
                    </Animatable.View>
                </BlurView>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    progressContainerWrapper: {
        flex: 1,
        paddingHorizontal: 0,
        zIndex: 999,
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
    },
    closeContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4
    },
    closeButtonContainer: {
        height: 48,
        backgroundColor: 'rgba(240, 240, 240, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButtonLabel: {
        color: '#fff',
        textTransform: 'capitalize'
    },
    closeLabel: {
        width: 80,
        lineHeight: 120,
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.80)',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'shaky-hand-some-comic',
        textShadowColor: 'rgba(0, 0, 0, 0.33)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 4,
        letterSpacing: 1
    },
    progressContainer: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 2,
        paddingTop: 30
    },
    labelContainer: {
        height: 60
    },
    labelContainerLabel: {
        fontSize: 36,
        color: 'rgba(0, 0, 0, 0.80)',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'shaky-hand-some-comic',
        textShadowColor: 'rgba(0, 0, 0, 0.33)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 4,
        letterSpacing: 1
    },
    progressHolderContainer: {
        paddingHorizontal: 0,
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0)',
    },
    progressHolderWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    messageItemWrapper: {
        flexBasis: 0,
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 20
    },
    messageStatusContainer: {
        width: 30,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    status: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3498db'
    },
    colorChanger: {
        flexBasis: 0,
        flexGrow: 1,
        height: 60,
        position: 'absolute',
        bottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        width: '100%',
        flexDirection: 'row'
    },
    colorBtn: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        height: 60,
        width: 60,
        borderRadius: 30,
        borderColor: 'rgba(0,0,0,0.50)',
        borderStyle: 'solid',
        borderWidth: 4
    },
    textChanger: {
        flexBasis: 0,
        flexGrow: 1,
        height: 100,
        position: 'absolute',
        top: 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 80
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

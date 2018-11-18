import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import WorbleManager from '../services/WorbleManager.js'
import { BlurView } from 'expo';
import ProgressBar from './ProgressBar.js';

const avatarSrc = require('../assets/images/avatar.png');

const Messages = [
    { id: 1, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 2, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 3, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 4, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 5, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 6, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 7, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 8, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' }
];

export default class AppProgress extends React.Component {

    updateProgressInterval;
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        };
    }

    closeInbox() {
        WorbleManager.isInboxShown.next(false);
    }

    componentDidMount() {
        this.updateProgressInterval = true;
        const indeterminate = this.props.indeterminate || true;
        this.state.progress = 0;
        if (indeterminate) {
            const updateProgress = () => {
                this.state.progress++;
                if (this.state.progress >= 100) {
                    this.state.progress = 0;
                }
                if (this.updateProgressInterval) {
                    this.setState({
                        progress: this.state.progress
                    })
                    requestAnimationFrame(updateProgress);
                }
            };
            if (this.updateProgressInterval) {
                requestAnimationFrame(updateProgress);
            }
        }
    }

    componentWillUnmount() {
        this.updateProgressInterval = false;
    }


    render() {
        const progress = this.state.progress
        return (
            <Animatable.View animation="fadeIn" style={styles.progressContainerWrapper}>
                <BlurView tint="light" intensity={85} style={styles.progressContainerWrapper} >
                    <View style={styles.progressContainer}>
                        <View style={styles.progressHolderContainer}>
                            <View style={styles.progressHolderWrapper}>
                                <ProgressBar progress={progress} label={'working ...'} width={'50%'} />
                            </View>
                        </View>
                    </View>
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
        borderRadius: 10,
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
        zIndex: 2
    },
    closeButtonContainer: {
        height: 48,
        backgroundColor: 'rgba(240, 240, 240, 1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButtonLabel: {
        color: '#2980b9',
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
        paddingTop: 40,
        flexDirection: 'column',
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
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0)',
    },
    progressHolderWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});

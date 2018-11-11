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
import { Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import WorbleManager from '../services/worbleService.js'

const avatarSrc = require('../assets/images/avatar.png');

const Messages = [
    { id: 1, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 2, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 3, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' },
    { id: 4, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW' }
];

export default class Inbox extends React.Component {

    constructor(props) {
        super(props);
    }

    closeInbox () {
        console.log(787897697);
        WorbleManager.isInboxShown.next(false);
    }

    render() {
        const MessagesView = Messages.map((item, i) => {
            return <View style={styles.messageItemWrapper} key={item.id}>
                <View style={styles.messageStatusContainer}>
                    <View style={styles.status}></View>
                </View>
                <View style={styles.messagePhotoContainer}>
                    <Image style={styles.avatarImage} source={avatarSrc}></Image>
                </View>
                <View style={styles.messageDetailsContainer}>
                    <Text style={styles.avatarName}>{item.name}</Text>
                    <Text style={styles.avatarMessage} numberOfLines={1}>{item.message}</Text>
                </View>
                <View style={styles.messageTimeContainer}>
                    <Text style={styles.timeInfo} >{item.time}</Text>
                </View>
            </View>
        });
        return (
            <Animatable.View animation="slideInDown" style={styles.inboxContainerWrapper}>
                <TouchableWithoutFeedback onPress={this.closeInbox.bind(this)}>
                    <View style={styles.closeContainer}><Text style={ styles.closeLabel }>x</Text></View>
                </TouchableWithoutFeedback>
                <View style={styles.inboxContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelContainerLabel}>Inbox</Text>
                    </View>
                    <View style={styles.messagesContainer}>
                        <ScrollView>
                            <View style={styles.messgesWrapper}>
                                {MessagesView}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    inboxContainerWrapper: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 20,
        zIndex: 999,
        backgroundColor: 'rgba(255,255,255,1)',
        flexDirection: 'column',
        borderRadius: 10,
        position: 'relative',
        zIndex: 1
    },
    closeContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        justifyContent:'center',
        alignItems: 'center',
        zIndex: 2
    },
    closeLabel: {
        padding: 20,
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.33)',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'shaky-hand-some-comic',
        textShadowColor: 'rgba(0, 0, 0, 0.33)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 4,
        letterSpacing: 1
    },
    inboxContainer: {
        flex: 1,
        padding: 20,
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
    messagesContainer: {
        flex: 1,
    },
    messgesWrapper: {
        flex: 1,
        flexDirection: 'column',
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
        paddingVertical: 10
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
    messagePhotoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(240, 240, 240, 1)',
        overflow: 'hidden',
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    avatarImage: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    messageDetailsContainer: {
        flexGrow: 1,
        flexBasis: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 10
    },
    avatarMessage: {
        color: 'rgba(0, 0, 0, 0.90)',
        fontFamily: 'segoe-ui-semilight'
    },
    avatarName: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.75)',
        fontWeight: 'bold'
    },
    messageTimeContainer: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    timeInfo: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.75)',
        textAlign: 'left',
        fontFamily: 'segoe-ui-semilight'
    }
});
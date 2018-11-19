import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    WebView
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import WorbleManager from '../services/WorbleManager.js'
import { BlurView } from 'expo';

const avatarSrc = require('../assets/images/avatar.png');

const textMsgContent = {
    title: 'Hello World',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
};

const Messages = [
    { id: 1, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent },
    { id: 2, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent },
    { id: 3, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent },
    { id: 4, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent },
    { id: 5, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent },
    { id: 6, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent },
    { id: 7, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent },
    { id: 8, name: 'Gordon', message: 'Lorem ipsum dolor sit amet sit amet dolor', time: '2 days ago', status: 'NEW', opened: false, messageContent: textMsgContent }
];

export default class WorbleInbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: Messages
        };
    }

    closeInbox() {
        WorbleManager.isInboxShown.next(false);
    }

    toggleMessage(i) {
        const messages = [].concat(Messages);
        messages.forEach((mess, j) => {
            mess.opened = i === j ? !mess.opened : false;
            if (mess.opened) {
                mess.status = 'READ'
            }
        });
        this.setState({
            messages: messages
        })
    }

    render() {
        const MessagesView = this.state.messages.map((item, i) => {
            const statusBackgroundColor = item.status === 'NEW' ? {
                backgroundColor: '#3498db'
            }: {};
            return <Animatable.View style={styles.messageItemWrapper} key={item.id} animation="bounceIn" delay={33 * i} useNativeDriver={true}>
                <TouchableWithoutFeedback onPress={this.toggleMessage.bind(this, i)}>
                    <View style={styles.messagePeekView}>
                        <View style={styles.messageStatusContainer}>
                            <View style={[styles.status, statusBackgroundColor]}></View>
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
                </TouchableWithoutFeedback>
                {item.opened &&
                    <View style={styles.messageTextContainer}>
                        <Text style={styles.messageContentTitle} >{item.messageContent.title}</Text>
                        <Text style={styles.messageContentText}>{item.messageContent.text}</Text>
                        <Text style={styles.messageContentTitle} >{item.name}</Text>
                    </View>
                }
            </Animatable.View>
        });
        return (
            <Animatable.View animation="fadeIn" style={styles.inboxContainerWrapper}>
                <BlurView tint="light" intensity={75} style={styles.inboxContainerWrapper} >
                    <TouchableWithoutFeedback onPress={this.closeInbox.bind(this)}>
                        <View style={styles.closeContainer}><Text style={styles.closeLabel}>x</Text></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.inboxContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.labelContainerLabel}>Inbox</Text>
                        </View>
                        <View style={styles.messagesContainer}>
                            <ScrollView style={styles.messagesScrollContainer}>
                                <View style={styles.messgesWrapper}>
                                    {MessagesView}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.closeInbox.bind(this)}>
                        <View style={styles.closeButtonContainer}>
                            <Text style={styles.closeButtonLabel}>Close</Text>
                        </View>
                    </TouchableOpacity>
                </BlurView>
            </Animatable.View>
        );
    }

}

const styles = StyleSheet.create({
    inboxContainerWrapper: {
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
    inboxContainer: {
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
    messagesContainer: {
        paddingHorizontal: 0,
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    messagesScrollContainer: {
        paddingHorizontal: 20
    },
    messgesWrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    messageItemWrapper: {
        flexBasis: 0,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 20
    },
    messagePeekView: {
        flexBasis: 0,
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
        borderRadius: 5
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
    messageTextContainer: {
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 10,
        paddingTop: 20
    },
    messageContentTitle: {
    },
    messageContentText: {
        textAlign: 'justify',
        marginVertical: 10
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

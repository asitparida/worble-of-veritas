import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    Animated,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import WorbleManager from '../services/WorbleManager.js'
import * as Animatable from 'react-native-animatable';
import { WorbleActions } from '../constants/WorbleActions';
import { Subscription } from 'rxjs';

export default class WorbleActionsBar extends React.Component {
    hideActionsSubscription = null;
    constructor(props) {
        super(props);
        this.state = {
            showWorbleActions: false
        };
        this.hideActionsSubscription = WorbleManager.hideActions$.subscribe((data) => {
            if (data) {
                this.setState({
                    showWorbleActions: false
                });
            }
        });
    }

    componentWillMount() {
        this.animatedValueForOpacity = new Animated.Value(0);
    }
    componentWillUnmount() {
        if (this.hideActionsSubscription) {
            this.hideActionsSubscription.unsubscribe();
            this.hideActionsSubscription = null;
        }
    }
    onAction(id) {
        switch (id) {
            case 'WORBLE_ACTIONS': {
                if (!this.state.showWorbleActions) {
                    WorbleManager.actionTaken.next('WORBLE_ACTIONS');
                }
                this.setState({
                    showWorbleActions: !this.state.showWorbleActions
                });
                break;
            }
            case 'OPEN_INBOX': {
                this.setState({
                    showWorbleActions: false
                });
                WorbleManager.isInboxShown.next(true);
            }
        }
    }

    onWorbleAction(item) {
        if (item) {
            if (item.action) {
                WorbleManager.action.next(item.action);
            }
            this.setState({
                showWorbleActions: false
            });
        }
    }

    closeWorbleActions() {
        if (this.state.showWorbleActions) {
            this.setState({
                showWorbleActions: false
            });
        }
    }

    render() {
        const showWorbleActions = this.state.showWorbleActions;
        const WorbleViewActions = WorbleActions.map(x => {
            return  <TouchableWithoutFeedback onPress={this.onWorbleAction.bind(this, x)} key={x.id}>
                <View  style={styles.actionBoxExtra}><Text style={styles.actionBoxExtraText}>{x.text}</Text></View>
            </TouchableWithoutFeedback>;
        })
        return (
            <View style={styles.getStartedContainer}>
                <TouchableWithoutFeedback>
                    <View style={styles.actionBox} >
                        <TouchableWithoutFeedback onPress={this.onAction.bind(this, 'WORBLE_ACTIONS')}>
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={
                                        require('../assets/images/worble_icon.png')
                                    }
                                    style={styles.actionBoxImage} />
                                <Text style={styles.actionBoxlabel}>Actions</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {showWorbleActions &&
                            <Animatable.View animation="flipInX" easing="ease-out" iterationCount={1} duration={500} ref={this.handleWorbleActionsListViewRef}>
                            <View style={{ marginTop: 20, flexDirection: 'column' }}>
                                {WorbleViewActions}
                            </View>
                        </Animatable.View>
                        }
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onAction.bind(this, 'OPEN_INBOX')}>
                    <View style={styles.actionBox}>
                        <Image
                            source={
                                require('../assets/images/messages_icon.png')
                            }
                            style={styles.actionBoxImage} />
                        <Text style={styles.actionBoxlabel}>Inbox</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.actionBox}>
                    <Image
                        source={
                            require('../assets/images/book_icon.png')
                        }
                        style={styles.actionBoxImage} />
                    <Text style={styles.actionBoxlabel}>Veripedia</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    getStartedContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    actionBox: {
        flexBasis: 0,
        flexGrow: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.80)',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'flex-start',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        })
    },
    actionBoxImage: {
        height: 36,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    actionBoxlabel: {
        fontSize: 20,
        color: 'rgba(0,0,0, 0.80)',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'shaky-hand-some-comic',
        marginTop: 10,
        letterSpacing: 1
    },
    actionBoxExtra: {
        borderBottomColor: 'rgba(0,0,0, 0)',
        borderLeftColor: 'rgba(0,0,0, 0)',
        borderRightColor: 'rgba(0,0,0, 0)',
        borderTopColor: 'rgba(0,0,0, 0.33)',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    actionBoxExtraText: {
        fontSize: 20,
        color: 'rgba(0,0,0, 0.80)',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'shaky-hand-some-comic',
        lineHeight: 48,
        paddingTop: 5
    }
});

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
    TouchableHighlight,
    Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import WorbleManager from '../services/WorbleManager';
import { concat } from 'rxjs';

export default class Overlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            menuOptions: [],
            modalVisible: false
        };
        this.actionSubscriber = WorbleManager.action$.subscribe((data) => {
            if (data.type === 'OVERLAY_MENU') {
                this.setState({
                    title: data.title,
                    menuOptions: data.data,
                    modalVisible: true
                });
            }
        });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillUnmount() {
        if (this.actionSubscriber) {
            this.actionSubscriber.unsubscribe();
            this.actionSubscriber = null;
        }
    }

    render() {
        const { title, menuOptions, modalVisible } = this.state;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }}>
                    <View style={styles.modalWrapper}>
                        <Animatable.View animation="bounceInUp" style={styles.modalContainer} useNativeDriver={true}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.label}>{title}</Text>
                            </View>
                            { menuOptions.length > 0 && menuOptions.map(x => {
                                return <View style={styles.actionItemWrapper} key={x.id}>
                                        <Text style={styles.actionItem}>{x.text}</Text>
                                    </View>;
                            })}
                        </Animatable.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        );
    }

}

const styles = StyleSheet.create({
    modalWrapper: {
        padding: 40, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.50)'
    },
    modalContainer: {
        paddingHorizontal: 0, 
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 10,
        overflow: 'hidden',
        paddingBottom: 15
    },
    actionItem: {
        fontSize: 20,
        letterSpacing: 1,
        textAlign: 'center',
        textTransform: 'capitalize',
        fontFamily: 'shaky-hand-some-comic',
        
    },
    actionItemBorder: {
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    actionItemWrapper: {
        paddingVertical: 15,
        paddingHorizontal: 40
    },
    labelWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        backgroundColor: 'rgba(240, 240, 240, 1)',
        marginBottom: 15
    },
    label: {
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'shaky-hand-some-comic',
        color: 'rgba(0,0,0,0.50)',
        letterSpacing: 1,
        paddingHorizontal: 40
    }
});

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
import { BlurView } from 'expo';

export default class WorbleHolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			worbleState: {
				name: 'Harold',
				imgSrc: require('../assets/images/worble.png')
			}
		};
    }
    componentWillUnmount() {
		[this.worbleStateSusbscription].forEach(x => {
			if (x) {
				x.unsubscribe();
				x = null;
			}	
		});
    }
    componentWillMount() {
		this.worbleStateSusbscription = WorbleManager.worbleState$.subscribe((state) => {
			this.setState({
				worbleState: state
			});
		});
    }
    componentDidMount() {
		WorbleManager.worbleState.next({
			name: 'Harold',
			imgSrc: require('../assets/images/happyworble.gif')
		});

	}
    getProgressBarStyle = () => {
        const progress = this.props.progress;
        const progresBarWidth = (progress / 100) * 200;
        styles.progressBar.width = progresBarWidth;
        return Object.assign({}, styles.progressBar, {
            width: progresBarWidth
        });
    }
    render() {
        let worbleState = this.state.worbleState;
        return (
            <View style={[this.props.worbleDimensions, { position: 'relative' }]} >
                <Image
                    source={worbleState.imgSrc}
                    style={[styles.welcomeImage, this.props.worbleDimensions]} />
                <BlurView tint="dark" intensity={75} style={[styles.shadowBar, this.props.worbleShadowimensions]} />
            </View>
        );
    }
}
let styles = StyleSheet.create({
    welcomeImage: {
		position: 'relative',
		zIndex: 2,
		resizeMode: 'contain',
		marginTop: 20,
		marginLeft: -10,
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.10,
				shadowRadius: 10,
			},
			android: {
				elevation: 20,
			}
		})
    },
    shadowBar: {
		position: 'absolute',
		alignSelf: 'center',
		backgroundColor: 'rgba(0,0,0,0.05)',
		zIndex: 1,
		bottom: -30,
		borderWidth: 2,
		borderColor: 'rgba(0,0,0,0.05)',
		transform: [
			{ scaleX: 3 },
			{ translateX: -3 }
		]
	},
});
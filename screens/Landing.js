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

export default class Landing extends React.Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
	}

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
	_onPressButton() {
		this.props.handleOnPress();
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
					<Text style={styles.getStartedText}>welcome to</Text>
					<Text style={styles.getStartedTextBottom}>Veritas</Text>
				</View>
				<View style={styles.welcomeContainer}>
					<Animatable.Image animation="rotate" easing="linear" iterationCount="infinite" duration={20000}
						source={
							require('../assets/images/planet_veritas.png')
						}
						style={styles.welcomeImage} />
				</View>
				<View style={styles.tabBarInfoContainer}>
					<TouchableWithoutFeedback onPress={this._onPressButton.bind(this)}>
						<Animated.View style={[styles.centralIconStyles, scaledAnimatedStyle]} >
							<Icon color='#fff' size={36} name='keyboard-arrow-right' />
						</Animated.View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
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
	getStartedContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 100,
		marginBottom: 0
	},
	welcomeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
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
		color: 'rgba(41,128,185, 0.50)',
		textAlign: 'center',
		textTransform: 'lowercase',
		fontFamily: 'shaky-hand-some-comic',
	},
	getStartedTextBottom: {
		fontSize: 60,
		color: 'rgba(41,128,185, 0.80)',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontFamily: 'shaky-hand-some-comic',
		letterSpacing: 5,
		textShadowColor: 'rgba(0, 0, 0, 0.33)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 5,
		marginTop: 20,
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
});

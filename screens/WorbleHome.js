import React from 'react';
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	View,
	Animated,
	Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements'
import { LinearGradient } from 'expo';
import ProgressBar from '../components/ProgressBar';

export default class WorbleHomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			progress: 0
		};
	}

	componentWillMount() {
		this.animatedValueForOpacity = new Animated.Value(0);
	}
	componentDidMount() {
		this.state.progress = 0;
		const updateProgress = ()=> {
			this.state.progress++;
			if (this.state.progress >= 100) {
				this.state.progress = 0;
			}
			this.setState({
				progress: this.state.progress
			})
			requestAnimationFrame(updateProgress);
		};
		requestAnimationFrame(updateProgress);
		Animated.timing(this.animatedValueForOpacity, {
			toValue: 1,
			duration: 1000
		}).start();
	}

	render() {
		const scaledAnimatedStyle = {
			opacity: this.animatedValueForOpacity.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			})
		}
		const dims = Dimensions.get('window');
		const midTop = 0.5 * (dims.height);
		const groundContainerAddn = {
			top: midTop + 20,
			height: dims.height,
			width: dims.width,
			borderRadius: dims.width,
		};
		const progress = this.state.progress;
		return (
			<Animated.View style={[styles.container, scaledAnimatedStyle]}>
				<LinearGradient
					style={styles.lienarGradientContainer}
					colors={['rgba(213, 213, 78, 0.6)', 'rgba(51, 138, 200, 0.4)']} >
					<View style={[styles.groundContainer, groundContainerAddn]}>
						<LinearGradient style={styles.insideGroundContainer} start={[0.5, 0]} colors={['rgba(84, 165, 81, 0.75)', 'rgba(13, 69, 12, 1)', 'rgba(13, 69, 12, 1)']} />
					</View>
					<View style={styles.wrapper}>
						<View style={styles.getStartedContainer}>
							<View style={styles.actionBox}>
								<Image
									source={
										require('../assets/images/worble_icon.png')
									}
									style={styles.actionBoxImage} />
								<Text style={styles.actionBoxlabel}>Actions</Text>
							</View>
							<View style={styles.actionBox}>
								<Image
									source={
										require('../assets/images/messages_icon.png')
									}
									style={styles.actionBoxImage} />
								<Text style={styles.actionBoxlabel}>Inbox</Text>
							</View>
							<View style={styles.actionBox}>
								<Image
									source={
										require('../assets/images/book_icon.png')
									}
									style={styles.actionBoxImage} />
								<Text style={styles.actionBoxlabel}>Veripedia</Text>
							</View>
						</View>
						<View style={styles.welcomeContainer}>
							<Image
								source={
									require('../assets/images/worble.png')
								}
								style={styles.welcomeImage} />
						</View>
						<Text style={styles.petName}>Groot</Text>
						<View style={styles.tabBarInfoContainer}>
							<ProgressBar progress={progress} />
						</View>
					</View>
				</LinearGradient>
			</Animated.View>
		);
	}

}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	container: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	lienarGradientContainer: {
		flex: 1
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
		position: 'absolute',
		flex: 1,
		top: 0,
		left: 0
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 0,
		marginBottom: 20,
		flex: 1
	},
	welcomeImage: {
		width: 250,
		height: 250,
		resizeMode: 'contain',
		marginBottom: 30,
		marginLeft: -10,
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
	imageShadowBox: {
		width: 170,
		height: 50,
		backgroundColor: '#000000',
		borderRadius: 300,
		position: 'absolute',
		bottom: 20,
		overflow: 'hidden',
		opacity: 0.75,
	},
	getStartedContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
		marginBottom: 0,
		flexDirection: 'row'
	},
	welcomeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
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
		color: 'rgba(255,255,255, 0.50)',
		textAlign: 'center',
		textTransform: 'capitalize',
		fontFamily: 'shaky-hand-some-comic',
	},
	getStartedTextBottom: {
		fontSize: 60,
		color: 'rgba(255,255,255, 0.50)',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontFamily: 'shaky-hand-some-comic',
		letterSpacing: 5,
		textShadowColor: 'rgba(0, 0, 0, 0.33)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 5
	},
	petName: {
		fontSize: 36,
		color: 'rgba(255, 255, 255, 1)',
		textAlign: 'center',
		textTransform: 'capitalize',
		fontFamily: 'shaky-hand-some-comic'
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
		paddingVertical: 20
	},
	centralIconStyles: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 60,
		borderRadius: 30,
		lineHeight: 60,
		borderColor: '#fbfbfb',
		borderStyle: 'solid',
		borderWidth: 2,
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
	actionBox: {
		width: 90,
		height: 90,
		backgroundColor: 'rgba(255, 255, 255, 0.80)',
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
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
		resizeMode: 'contain'
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
	groundContainer: {
		flex: 1,
		position: 'absolute',
		left: 0,
		overflow: 'hidden',
		transform: [
			{ scaleX: 2 }
		]
	},
	insideGroundContainer: {
		flex: 1
	}
});

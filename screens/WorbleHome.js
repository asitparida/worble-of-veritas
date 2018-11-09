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
import { LinearGradient } from 'expo';
import ProgressBar from '../components/ProgressBar';
import * as Animatable from 'react-native-animatable';

const ariIconSrc = require('../assets/images/ari_small.png');

export default class WorbleHomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			showWorbleActions: false
		};
	}

	componentWillMount() {
		this.animatedValueForOpacity = new Animated.Value(0);
	}
	componentDidMount() {
		this.state.progress = 0;
		const updateProgress = () => {
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
	onAction() {
		this.setState({
			showWorbleActions: !this.state.showWorbleActions
		});
	}

	closeWorbleActions() {
		if (this.state.showWorbleActions) {
			this.setState({
				showWorbleActions: false
			});
		}
	}

	render() {
		const scaledAnimatedStyle = {
			opacity: this.animatedValueForOpacity.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 1],
			})
		}
		const dims = Dimensions.get('window');
		const midTop = 0.6 * (dims.height);
		const groundContainerAddn = {
			top: midTop + 20,
			height: dims.height,
			width: dims.width,
			borderRadius: dims.width,
		};
		const progress = this.state.progress;
		const showWorbleActions = this.state.showWorbleActions;
		let worbleWidth = 0.70 * (dims.width);
		worbleWidth = worbleWidth > 250 ? 250 : worbleWidth;
		const worbleDimensions = {
			width: worbleWidth,
			height: worbleWidth
		}
		return (
			<Animated.View style={[styles.container, scaledAnimatedStyle]}>
				<LinearGradient
					style={styles.lienarGradientContainer}
					colors={['rgba(213, 213, 78, 0.6)', 'rgba(51, 138, 200, 0.4)']} >
					<View style={[styles.groundContainer, groundContainerAddn]}>
						<LinearGradient style={styles.insideGroundContainer} start={[0.5, 0]} colors={['rgba(84, 165, 81, 0.75)', 'rgba(13, 69, 12, 1)', 'rgba(13, 69, 12, 1)']} />
					</View>
					<TouchableWithoutFeedback onPress={this.closeWorbleActions.bind(this)}>
						<View style={styles.wrapper}>
							<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
								<View style={styles.welcomeContainer} >
									<Image
										source={
											require('../assets/images/worble.png')
										}
										style={[styles.welcomeImage, worbleDimensions]} />
									<Text style={styles.petName}>Groot</Text>
								</View>
							</View>
							<View style={styles.getStartedContainer}>
								<TouchableWithoutFeedback>
									<View style={styles.actionBox} >
										<TouchableWithoutFeedback onPress={this.onAction.bind(this)}>
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
											<Animatable.View animation="flipInX" easing="ease-out" iterationCount={1} duration={500}>
												<View style={{ marginTop: 20, flexDirection: 'column' }}>
													<View style={styles.actionBoxExtra}><Text style={styles.actionBoxExtraText}>Feed</Text></View>
													<View style={styles.actionBoxExtra}><Text style={styles.actionBoxExtraText}>Bathe</Text></View>
												</View>
											</Animatable.View>
										}
									</View>
								</TouchableWithoutFeedback>
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
							<View style={styles.tabBarInfoContainer}>
								<View style={styles.tabBarInfoContainerWrapper}>
									<View>
										<Image source={ariIconSrc} style={styles.ariIconStyle} />
									</View>
									<View style={{ marginLeft: 'auto' }}>
										<ProgressBar progress={progress} />
									</View>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</LinearGradient>
			</Animated.View>
		);
	}

}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'flex-end'
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
	welcomeContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 120,
		marginBottom: 0,
		backgroundColor: 'rgba(255,255,255, 0)',
	},
	welcomeImage: {
		resizeMode: 'contain',
		marginBottom: 20,
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
	getStartedContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginTop: 50,
		marginBottom: 0,
		flexDirection: 'row',
		marginLeft: 20,
		marginRight: 20
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
		fontSize: 48,
		color: 'rgba(255, 255, 255, 1)',
		textAlign: 'center',
		textTransform: 'capitalize',
		fontFamily: 'shaky-hand-some-comic'
	},
	tabBarInfoContainerOuterWrapper: {
		flexBasis: 0,
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabBarInfoContainerWrapper: {
		flexBasis: 0,
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 50,
		paddingRight: 50,
	},
	tabBarInfoContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: 'rgba(0,0,0,0.0)',
		position: 'absolute',
		bottom: 0,
		marginBottom: 0,
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
	},
	ariIconStyle: {
		width: 60,
		resizeMode: 'contain'
	}
});

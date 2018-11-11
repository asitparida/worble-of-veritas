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
import WorbleActionsBar from './WorbleActionsBar';
import WorbleManager from '../services/worbleService.js'

const ariIconSrc = require('../assets/images/ari_small.png');

export default class WorbleHomeScreen extends React.Component {
	worbleActionMenuOpen = false;
	constructor(props) {
		super(props);
		this.state = {
			progress: 0,
			showWorbleActions: false,
			showAriComments: false,
			ariCommentAnimation: 'bounceInRight'
		};
		WorbleManager.actionTaken$.subscribe((data) => {
			switch (data) {
				case 'WORBLE_ACTIONS': {
					this.worbleActionMenuOpen = true;
					break;
				}
			}
		});
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

	closeWorbleActions() {
		if (this.worbleActionMenuOpen) {
			this.worbleActionMenuOpen = false;
			WorbleManager.hideActions.next(true);
		}
		if (this.state.showAriComments) {
			this.setState({
				showAriComments: false
			});
		}
	}
	openAriComments() {
		this.setState({
			showAriComments: !this.state.showAriComments
		});
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
		let worbleWidth = 0.70 * (dims.width);
		worbleWidth = worbleWidth > 230 ? 230 : worbleWidth;
		const worbleDimensions = {
			width: worbleWidth,
			height: worbleWidth
		}
		const showAriComments = this.state.showAriComments;
		let ariIconWrapperExtra = {};
		if (showAriComments) {
			ariIconWrapperExtra = {
				backgroundColor: 'rgba(255,255,255, 0.6)'
			};
		}
		let ariCommentAnimation = this.state.ariCommentAnimation;
		// if (showAriComments) {
		// 	ariCommentAnimation = 'bounceOutRight';
		// }
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
									<Text style={styles.petName}>Groot</Text>
									<Image
										source={
											require('../assets/images/worble.png')
										}
										style={[styles.welcomeImage, worbleDimensions]} />
								</View>
							</View>
							<View style={styles.getStartedContainer}>
								<WorbleActionsBar />
							</View>
							{showAriComments &&
								<TouchableWithoutFeedback>
									<Animatable.View animation={ariCommentAnimation} style={styles.commentsOuterWrapper} useNativeDriver={true} >
										<View style={styles.commentsWrapper}>
											<View style={styles.commentTip}></View>
											<Text style={styles.commentsText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
										</View>
									</Animatable.View>
								</TouchableWithoutFeedback>
							}
							<View style={styles.tabBarInfoContainer}>
								<View style={styles.tabBarInfoContainerWrapper}>
									<View style={styles.progressBarWrapper}>
										<ProgressBar progress={progress} />
									</View>
									<TouchableWithoutFeedback onPress={this.openAriComments.bind(this)}>
										<View style={[styles.ariIconWrapper, ariIconWrapperExtra]}>
											<Image source={ariIconSrc} style={styles.ariIconStyle} />
										</View>
									</TouchableWithoutFeedback>
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
		marginTop: 50,
		marginBottom: 0,
		backgroundColor: 'rgba(255,255,255, 0)',
	},
	welcomeImage: {
		resizeMode: 'contain',
		marginTop: 20,
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
			}
		})
	},
	getStartedContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		alignItems: 'center',
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
		color: 'rgba(255, 255, 255, 0.80)',
		textAlign: 'center',
		textTransform: 'capitalize',
		fontFamily: 'shaky-hand-some-comic',
		textShadowColor: 'rgba(0, 0, 0, 0.33)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 4,
		letterSpacing: 1
	},
	tabBarInfoContainerWrapper: {
		flexBasis: 0,
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
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
		justifyContent: 'center'
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
	ariIconWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(255,255,255, 0.2)',
		marginBottom: 20,
		marginTop: 20,
		marginRight: 20,
		borderRadius: 30,
		marginLeft: 'auto',
		height: 60,
		width: 60
	},
	ariIconStyle: {
		width: 36,
		height: 36,
		resizeMode: 'contain'
	},
	commentsOuterWrapper: {
		position: 'absolute',
		bottom: 80,
		left: 0,
		flexBasis: 0,
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		zIndex: 999,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	commentsWrapper: {
		backgroundColor: 'rgba(255, 255, 255, 1)',
		textAlign: 'justify',
		padding: 20,
		borderRadius: 10,
		flexBasis: 0,
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
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
		position: 'relative',
		zIndex: 997,
	},
	commentsText: {
		fontFamily: 'shaky-hand-some-comic',
		fontSize: 20,
		letterSpacing: 1,
		lineHeight: 20
	},
	commentTip: {
		zIndex: 998,
		bottom: -25,
		right: 15,
		width: 0,
		height: 0,
		position: 'absolute',
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderColor: 'rgba(255, 255, 255, 1)',
		borderWidth: 15,
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		borderBottomColor: 'transparent',
	},
	progressBarWrapper: {
	}
});

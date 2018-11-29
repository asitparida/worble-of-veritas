import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon, Permissions, Notifications } from 'expo';
import Landing from './screens/Landing';
import Home from './screens/Home';
import WorbleInbox from './components/WorbleInbox';
import Veripedia from './components/Veripedia';
import WorbleManager from './services/WorbleManager';
import Overlay from './screens/Overlay';
import AriIntroduction from './screens/IntroductionAri';
import AppProgress from './components/AppProgress';
import WorbleAppearance from './components/WorbleAppearance';
import AppConstants from './constants/AppConstants';
import WorbleGamePlay from './services/WorbleGamePlay';

export default class App extends React.Component {
	currentAppLoaderData = null;
	state = {
		isLoadingComplete: false,
		showHome: false,
		showLanding: true,
		showInbox: false,
		showAriIntroduction: false,
		showAppLoader: false,
		showWorbleAppearanceChanger: false,
		appLoaderMessage: '',
		appLoaderDimissTimer: 5000,
		showVeripedia: false
	};

	constructor(props) {
		super(props);
		WorbleGamePlay.initSubscriptions();
	}

	componentWillUnmount() {
		WorbleGamePlay.cleanSubscriptions();
		[
			this.isInboxShownSubscription,
			this.appProgressLoaderSubscription,
			this.showWorbleAppearanceSubscription,
			this.isVeripediaShownSubscription
		].forEach(x => {
			if (x) {
				x.unsubscribe();
				x = null;
			}
		});
	}
	async componentWillMount() {

		//CLEANUP
		let StorageCleanUp = [
			AppConstants.STORAGE_KEYS.ARI_INTRODUCED,
			AppConstants.STORAGE_KEYS.FIRST_EGG_PERSONALIZED,
			AppConstants.STORAGE_KEYS.EGG_STATE,
			AppConstants.STORAGE_KEYS.PROFILE_INFO
		];
		// StorageCleanUp = [];
		StorageCleanUp.forEach(x => {
			WorbleManager.deleteStorage(x).then(() => {
				console.log(`${x} cleaned up - SUCCESS`);
			}, () => {
				console.log(`${x} cleaned up - FAILED`);
			});
		});

		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		if (status !== 'granted') {
			await Permissions.askAsync(Permissions.NOTIFICATIONS);
		} else {
			const token = await Notifications.getExpoPushTokenAsync();
			this.listenForNotifications();
		}
		this.isInboxShownSubscription = WorbleManager.isInboxShown$.subscribe((state) => {
			this.setState({
				showInbox: state
			});
		});
		this.isVeripediaShownSubscription = WorbleManager.isVeripediaShown$.subscribe((state) => {
			this.setState({
				showVeripedia: state
			});
		});
		this.appProgressLoaderSubscription = WorbleManager.appProgressLoader$.subscribe((data) => {
			if (data && data.state) {
				this.currentAppLoaderData = data;
				console.log(this.currentAppLoaderData);
				this.setState({
					showAppLoader: true,
					appLoaderMessage: data.message,
					appLoaderDimissTimer: data.autoDismiss || 0
				});
				// if (data.autoDismiss && data.autoDismiss > 0) {
				// 	const nextAppState = data.stateOnDimsiss;
				// 	setTimeout(() => {
				// 		this.setState({
				// 			showAppLoader: false
				// 		})
				// 		if (nextAppState) {
				// 			WorbleManager.appState.next(nextAppState);
				// 		}
				// 	}, data.autoDismiss);
				// }
			}
		});
		this.showWorbleAppearanceSubscription = WorbleManager.showWorbleAppearance$.subscribe(state => {
			this.setState({
				showWorbleAppearanceChanger: state
			});
		})
	}
	listenForNotifications = () => {
		Notifications.addListener(response => {
			if (response.origin === 'selected') {
				Alert.alert(response.data.title, response.data.message);
			}
		});
	};

	_onStartApp() {
		// WorbleManager.sendNotification();
		WorbleManager.getStorage(AppConstants.STORAGE_KEYS.ARI_INTRODUCED).then((data) => {
			if (data === 'true') {
				this.setState({
					showLanding: false,
					showHome: true
				});
			} else {
				this.setState({
					showLanding: false,
					showAriIntroduction: true
				});
			}
		}, () => {
			this.setState({
				showLanding: false,
				showAriIntroduction: true
			});
		});
	}

	_onAriWelcomeDone() {
		this.setState({
			showHome: true,
			showAriIntroduction: false
		});
	}

	appLoderComplete() {
		if (this.currentAppLoaderData) {
			this.setState({
				showAppLoader: false
			})
			const { stateOnDimsiss } = this.currentAppLoaderData;
			if (stateOnDimsiss) {
				WorbleManager.appState.next(stateOnDimsiss);
			}
		}
	}

	render() {
		const { showHome, showAriIntroduction, showLanding, showInbox, showAppLoader, showWorbleAppearanceChanger, appLoaderMessage, appLoaderDimissTimer, showVeripedia } = this.state;
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return (
				<View style={styles.container}>
					{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
					{showLanding && <Landing handleOnPress={this._onStartApp.bind(this)} />}
					{showAriIntroduction && <AriIntroduction handleOnPress={this._onAriWelcomeDone.bind(this)} />}
					{showHome && <Home />}
					{showInbox &&
						<View style={styles.inboxWrapperOuter}>
							<WorbleInbox />
						</View>
					}
					{showVeripedia &&
						<View style={styles.inboxWrapperOuter}>
							<Veripedia />
						</View>
					}
					{showAppLoader &&
						<View style={styles.inboxWrapperOuter}>
							<AppProgress message={appLoaderMessage} timer={appLoaderDimissTimer} onComplete={this.appLoderComplete.bind(this)} />
						</View>
					}
					{showWorbleAppearanceChanger &&
						<View style={styles.inboxWrapperOuter}>
							<WorbleAppearance />
						</View>
					}
					<Overlay />
				</View>
			);
		}
	}

	_loadResourcesAsync = async () => {
		return Promise.all([
			Asset.loadAsync([
				require('./assets/images/robot-dev.png'),
				require('./assets/images/robot-prod.png'),
			]),
			Font.loadAsync({
				// This is the font that we are using for our tab bar
				...Icon.Ionicons.font,
				// We include SpaceMono because we use it in HomeScreen.js. Feel free
				// to remove this if you are not using it in your app
				'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				'segoe-ui-light': require('./assets/fonts/segoeuil.ttf'),
				'segoe-ui-regular': require('./assets/fonts/segoeui.ttf'),
				'segoe-ui-semilight': require('./assets/fonts/seguihis.ttf'),
				'segoe-ui-semibold': require('./assets/fonts/seguisb.ttf'),
				'shaky-hand-some-comic': require('./assets/fonts/ShakyHandSomeComic.otf'),
			}),
		]);
	};

	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#96DDFF',
	},
	inboxWrapperOuter: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

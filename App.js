import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert } from 'react-native';
import { AppLoading, Asset, Font, Icon, Permissions, Constants, Notifications } from 'expo';
import Landing from './screens/Landing';
import Home from './screens/Home';
import WorbleInbox from './components/WorbleInbox';
import WorbleManager from './services/WorbleManager';
import Overlay from './screens/Overlay';
import AriIntroduction from './screens/IntroductionAri';
import AppProgress from './components/AppProgress';

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
		showHome: true,
		showLanding: false,
		showInbox: false,
		showAriIntroduction: false,
		showAppLoader: false
	};

	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		[this.isInboxShownSubscription, this.appProgressLoaderSubscription].forEach(x => {
			if (x) {
				x.unsubscribe();
				x = null;
			}	
		});
	}
	async componentWillMount() {
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
		this.appProgressLoaderSubscription = WorbleManager.appProgressLoader$.subscribe((state) => {
			this.setState({
				showAppLoader: state
			});
		});
	}
	listenForNotifications = () => {
		Notifications.addListener(response => {
			if (response.origin === 'selected') {
				Alert.alert(response.data.title, response.data.message);
			}
		});
	};

	componentDidMount() {
		// setTimeout(() => {
		// 	WorbleManager.appProgressLoader.next(true);
		// 	setTimeout(() => {
		// 		WorbleManager.appProgressLoader.next(false);
		// 	}, 6000);
		// }, 3000);
	}

	_onStartApp() {
		// WorbleManager.sendNotification();
		this.setState({
			showLanding: false,
			showAriIntroduction: true
		});
	}
	
	_onAriWelcomeDone() {
		this.setState({
			showHome: true,
			showAriIntroduction: false
		});
	}

	render() {
		const { showHome, showAriIntroduction, showLanding, showInbox, showAppLoader} =  this.state;
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
					{showAppLoader && 
						<View style={styles.inboxWrapperOuter}>
							<AppProgress />
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

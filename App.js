import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon, Permissions, Constants, Notifications } from 'expo';
import Landing from './screens/Landing';
import Home from './screens/Home';
import WorbleInbox from './components/WorbleInbox';
import WorbleManager from './services/WorbleManager';
import Overlay from './screens/Overlay';
import Veripedia from './components/Veripedia';

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
		isAppStartable: true,
		showHome: false,
		showLanding: true,
		showInbox: false,
		showVeripedia: false
	};
	constructor(props) {
		super(props);
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
	}

	componentWillUnmount() {
		if (this.isInboxShownSubscription) {
			this.isInboxShownSubscription.unsubscribe();
			this.isInboxShownSubscription = null;
		}
	}
	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		if (status !== 'granted') {
			await Permissions.askAsync(Permissions.NOTIFICATIONS);
		} else {
			const token = await Notifications.getExpoPushTokenAsync();
			this.listenForNotifications();
		}
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
		this.setState({
			showLanding: false,
			showHome: true
		});
	}

	render() {
		const showHome = this.state.showHome;
		const showLanding = this.state.showLanding;
		const showInbox = this.state.showInbox;
		const showVeripedia = this.state.showVeripedia;
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
					{showHome && <Home />}
					{showInbox &&
						<View style={styles.inboxWrapperOuter}>
							<WorbleInbox />
						</View>
					}
					{showVeripedia &&
						<View style={styles.veripediaWrapperOuter}>
							<Veripedia/>
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
	},
	veripediaWrapperOuter: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

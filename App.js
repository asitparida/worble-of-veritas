import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import LandingWelcomeScreen from './screens/LandingWelcome';
import WorbleHomeScreen from './screens/WorbleHome';

export default class App extends React.Component {
	state = {
		isLoadingComplete: false,
		isAppStartable: true
	};

	_onStartApp() {
		this.setState({
			isAppStartable: true
		});
	}

	render() {
		const isAppStartable = this.state.isAppStartable;
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
					{!isAppStartable && <LandingWelcomeScreen handleOnPress={this._onStartApp.bind(this)} />}
					{isAppStartable && <WorbleHomeScreen />}
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
});

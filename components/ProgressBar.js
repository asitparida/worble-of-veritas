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
import { WebBrowser } from 'expo';
import { Icon } from 'react-native-elements'
import { LinearGradient } from 'expo';
import { hidden } from 'ansi-colors';

import Colors from '../constants/Colors';

export default class ProgressBar extends React.Component {
	getProgressBarStyle = () => {
		const progress = this.props.progress;
		const progresBarWidth = (progress / 100) * 200;
		styles.progressBar.width = progresBarWidth;
		return Object.assign({}, styles.progressBar, {
			width: progresBarWidth
		});
	}
	render() {
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<Text style={styles.levelTextStyle}>Level 2</Text>
				<View style={styles.progressBarWrapper}>
					<View style={{ flexDirection: 'row' }}>
						<View style={this.getProgressBarStyle()} />
					</View>
				</View>
			</View>
		);
	}
}
let styles = StyleSheet.create({
	progressBarWrapper: {
		width: 100,
		height: 30,
		backgroundColor: '#fff',
		borderRadius: 15,
		overflow: 'hidden'
	},
	progressBar: {
		width: 100,
		height: 30,
		borderRadius: 0,
		backgroundColor: '#feca57',
		position: 'absolute',
		top: 0,
		left: 0
	},
	levelTextStyle: {
		lineHeight: 30,
		marginRight: 15,
		fontSize: 18,
		letterSpacing: 1,
		color: 'rgba(255,255,255, 1)',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontFamily: 'shaky-hand-some-comic',
		position: 'relative',
		top: 2
	}
});
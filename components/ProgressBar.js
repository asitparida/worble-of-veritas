import React from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Dimensions
} from 'react-native';

export default class ProgressBar extends React.Component {
	constructor(props) {
		super(props);
	}
	getProgressBarStyle = () => {
		let width = 200;
		if (this.props.width) {
			width = Dimensions.get('window').width;
		}
		const progress = this.props.progress;
		const progresBarWidth = (progress / 100) * width;
		styles.progressBar.width = progresBarWidth;
		return Object.assign({}, styles.progressBar, {
			width: progresBarWidth
		});
	}
	render() {
		const label = this.props.label;
		let widthStyles = {};
		if (this.props.width) {
			widthStyles = {
				width: `${this.props.width}%`
			};
		}
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<View style={[styles.progressBarWrapper, widthStyles]}>
					<View style={{ flexDirection: 'row', alignItems: 'center', alignItems: 'center' }}>
						<View style={this.getProgressBarStyle()} />
						<Text style={styles.levelTextStyle}>{label}</Text>
					</View>
				</View>
			</View>
		);
	}
}
let styles = StyleSheet.create({
	progressBarWrapper: {
		width: 175,
		height: 48,
		backgroundColor: '#fff',
		borderRadius: 24,
		overflow: 'hidden',
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0,0,0,1)',
				shadowOffset: { height: 0 },
				shadowOpacity: 1,
				shadowRadius: 1,
			},
			android: {
				elevation: 20,
			},
		}),
	},
	progressBar: {
		width: 175,
		height: 48,
		borderRadius: 0,
		backgroundColor: '#feca57',
		position: 'absolute',
		top: 0,
		left: 0
	},
	levelTextStyle: {
		lineHeight: 48,
		fontSize: 18,
		letterSpacing: 2,
		color: 'rgba(0,0,0, 1)',
		textAlign: 'center',
		textTransform: 'uppercase',
		fontFamily: 'shaky-hand-some-comic',
		flexBasis: 0,
		flexGrow: 1,
		position: 'relative',
		top: 2
	}
});
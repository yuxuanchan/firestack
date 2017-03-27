import React, { Component } from 'react';
import { View, Platform, PermissionsAndroid } from 'react-native';
import Button from './button';
import { withNavigation } from '@expo/ex-navigation';
import { sendFBMessage, requestPermission } from '../../utils/func';
import Router from '../../router';

@withNavigation
export default class extends Component {
	constructor(props) {
		super(props);
		this.onPressScan = this.onPressScan.bind(this);
	}
	onPressScan() {
		if (Platform.OS === 'android' && Platform.Version >= 23) {
			requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA).then((response) => {
				if (response) {
					requestPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((nextResponse) => {
						if (nextResponse) {
							this.props.navigator.push(Router.getRoute('camera'));
						}
					});
				}
			});
		} else {
			this.props.navigator.push(Router.getRoute('camera'));
		}
	}
	render() {
		const tintColor = '#ffffff';

		const barStyle = {
			position: 'absolute',
			left: 16,
			right: 16,
			...Platform.select({
				ios: {
					top: 36,
					zIndex: 999,
				},
				android: {
					top: 22,
				},
			}),
		};
		const leftButton = {
			position: 'absolute',
			left: 0,
			top: 0,
		};
		const rightButton = {
			position: 'absolute',
			right: 0,
			top: 0,
			flexDirection: 'row',
		};

		const transparentBackground = {
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
			borderRadius: 50,
		};
		if (this.props.showScan === false) {
			return (
				<View style={barStyle}>
					<View style={leftButton}>
						<Button.Icon iconName={'arrow-back'} iconColor={tintColor} style={transparentBackground} onPress={() => this.props.navigator.pop()} />
					</View>
					<View style={rightButton}>
						<Button.Icon iconName={'question-answer'} iconColor={tintColor} style={transparentBackground} onPress={sendFBMessage} />
					</View>
				</View>
			);
		}
		return (
			<View style={barStyle}>
				<View style={leftButton}>
					<Button.Icon iconName={'arrow-back'} iconColor={tintColor} style={transparentBackground} onPress={() => this.props.navigator.pop()} />
				</View>
				<View style={rightButton}>
					<Button.Icon iconName={'crop-free'} iconColor={tintColor} style={[transparentBackground, { marginRight: 16 }]} onPress={() => { this.onPressScan(); }} />
					<Button.Icon iconName={'question-answer'} iconColor={tintColor} style={transparentBackground} onPress={sendFBMessage} />
				</View>
			</View>
		);
	}
}

// const renderLeft = (route, props) => {
// 	// console.log(route);
// 	// console.log(props);
// 	const defaultStyle = {
// 		marginLeft: 16,
// 		marginTop: 9,
// 	};
// 	if (props.scene.index > 0) {
// 		return (<BackButton tintColor={route.getBarTintColor()} />);
// 	}
// 	return (
// 		<Button.Icon iconSize={23} iconName={'view-list'} iconColor={route.getBarTintColor()} style={defaultStyle} onPress={() => console.log('clicked')} />
// 	);
// };

// const renderRight = (route, props) => {
// 	const defaultStyle = {
// 		marginRight: 16,
// 		marginTop: 15,
// 	};
// 	return (
// 		<Button.Icon iconName={'search'} iconColor={route.getBarTintColor()} style={defaultStyle} onPress={() => console.log('clicked')} />
// 	);
// };

// const renderBackground = (route, props) => {
// 	const defaultStyle = {
// 		marginRight: 16,
// 		marginTop: 15,
// 	};
// 	return (
// 		<View style={{ backgroundColor: 'transparent' }} />
// 	);
// };

// const renderTitle = (route, props) => {
// 	const defaultStyle = {
// 		position: 'absolute',
// 		left: 72,
// 		bottom: 13,
// 	};
// 	return (
// 		<Text.Title
// 			color={route.getBarTintColor()}
// 			style={defaultStyle}
// 		>
// 			{route.getTitle()}
// 		</Text.Title>
// 	);
// };


// export default {
// 	navigationBar: {
// 		// renderBackground,
// 		backgroundColor: 'rgba(255,255,255,0)',
// 		// tintColor: '#ffffff',
// 		tintColor: '#313A48',
// 		renderTitle,
// 		translucent: true,
// 		renderLeft,
// 		// renderRight,
// 	},
// };

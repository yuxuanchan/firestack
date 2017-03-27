import { withNavigation, NavigationStyles } from '@expo/ex-navigation';
import React, { Component } from 'react';
import { Platform, StatusBar, View, PermissionsAndroid } from 'react-native';
import Text from './text';
import Logo from './logo';
import Button from './button';
import Router from '../../router';
import { sendFBMessage, requestPermission } from '../../utils/func';

const navigationBarHeight = 56 + (Platform.OS === 'ios' ? 20 : 0);
const buttonTop = Platform.OS === 'ios' ? 8 : 10;

@withNavigation
class BackButton extends Component {
	render() {
		const { tintColor } = this.props;
		const defaultStyle = {
			marginLeft: 16,
			marginTop: buttonTop,
		};
		return (
			<Button.Icon iconName={'arrow-back'} iconColor={tintColor} style={defaultStyle} onPress={() => this.props.navigator.pop()} />
		);
	}
}

@withNavigation
class PushButton extends Component {
	static propTypes = {
		view: React.PropTypes.string,
		iconColor: React.PropTypes.string,
		iconName: React.PropTypes.string,
		iconStyle: React.PropTypes.arrayOf(React.PropTypes.any),
		navigator: React.PropTypes.objectOf(React.PropTypes.any),
	};
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
		const { iconColor, iconName, iconStyle } = this.props;
		return (
			<View>
				{Platform.select({ android: <StatusBar backgroundColor="#313A48" /> })}
				<Button.Icon iconName={iconName} iconColor={iconColor} style={iconStyle} onPress={this.onPressScan} />
			</View>
		);
	}
}

const renderLeft = (route, props) => (
	<BackButton tintColor={route.getBarTintColor()} />
	);

const renderRight = (route, props) => {
	const defaultStyle = {
		marginTop: buttonTop,
	};
	if (route.routeName === 'camera') {
		return <Button.Icon iconName={'question-answer'} style={[defaultStyle, { marginRight: Platform.OS === 'ios' ? 8 : 0 }]} iconColor={route.getBarTintColor()} onPress={sendFBMessage} />;
	}
	if (route.routeName === 'accountRecoveryPhone') {
		return <Button.Icon iconName={'question-answer'} style={[defaultStyle, { marginRight: Platform.OS === 'ios' ? 8 : 0 }]} iconColor={route.getBarTintColor()} onPress={sendFBMessage} />;
	}

	return (
		<View style={{ flexDirection: 'row' }}>
			<PushButton iconName={'crop-free'} iconStyle={[defaultStyle, { marginRight: 8 }]} iconColor={route.getBarTintColor()} />
			<Button.Icon iconName={'question-answer'} style={[defaultStyle, { marginRight: Platform.OS === 'ios' ? 8 : 0 }]} iconColor={route.getBarTintColor()} onPress={sendFBMessage} />
		</View>
	);
};

const renderTitle = (route, props) => {
	const defaultStyle = {
		position: 'absolute',
		left: Platform.OS === 'ios' ? 72 : 20,
		top: Platform.OS === 'ios' ? 10 : 11,
	};
	return (
		<Text.Title
			color={route.getBarTintColor()}
			style={defaultStyle}
		>
			{route.getTitle()}
		</Text.Title>
	);
};


const NavigationSyles = {
	gestures: (params) => {
		const newParams = Object.assign({}, params, { gestureResponseDistance: 50 });
		return NavigationStyles.SlideHorizontal.gestures(newParams);
	},
};

export default {
	navigationBar: {
		height: navigationBarHeight,
		backgroundColor: '#313A48',
		tintColor: '#ffffff',
		renderTitle,
		renderLeft,
		renderRight,
	},
	styles: NavigationSyles,
};

export { sendFBMessage };

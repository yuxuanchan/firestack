import React from 'react';
import { ScrollView, View, Keyboard, Dimensions, Platform } from 'react-native';
import FinComponent from '../finComponent';
import dismissKeyboard from 'dismissKeyboard';
const { height } = Dimensions.get('window');

export default class Content extends FinComponent {
	constructor(props) {
		super(props);
		this.state = {
			// visible: false,
		};
		this.onPress = this.onPress.bind(this);
		this.keyboardDidShown = this.keyboardDidShown.bind(this);
		this.keyboardDidHide = this.keyboardDidHide.bind(this);
		this.visible = false;
	}
	onPress() {
		dismissKeyboard();
	}
	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShown);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
	}
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	keyboardDidShown() {
		// console.log('show');
		this.visible = true;
	}
	keyboardDidHide() {
		// console.log('hide');
		this.visible = false;
	}
	render() {
		let { style } = this.props;
		if (this.props.form) {
			const formStyle = {
				backgroundColor: this.getTheme().backgroundColor,
				padding: 16,
				minHeight: height,
				...this.props.style,
			};
			style = Object.assign(formStyle);
		}
		let backgroundColor = {};
		if (style && style.backgroundColor) {
			backgroundColor = { backgroundColor: style.backgroundColor };
		}
		return (
			Platform.select({
				ios:
					<ScrollView style={backgroundColor} keyboardShouldPersistTaps keyboardDismissMode={'on-drag'} >
						<View style={style} onStartShouldSetResponder={() => (this.visible)} onResponderRelease={this.onPress} {...this.props} />
					</ScrollView>,
				android:
					<ScrollView style={backgroundColor} keyboardShouldPersistTaps>
						<View style={style} onStartShouldSetResponder={() => (this.visible)} onResponderRelease={this.onPress} {...this.props} />
					</ScrollView>,
			})
		);
	}
}

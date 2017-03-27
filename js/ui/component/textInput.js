import React from 'react';
import { View, TextInput, Platform, Animated, StyleSheet } from 'react-native';
import Text, { CreateText } from './text';
import List from './list';
import Button from './button';
import FinComponent from '../finComponent';
import validate from 'validate.js';
import { constraints } from './validateRules';
import Accounts from '../../realm/accounts';

const TextAnimated = Animated.createAnimatedComponent(CreateText);
const accounts = new Accounts();
// TODO dismiss keyboard and trigger the onpress row of the list in same time.
export default class FTextInput extends FinComponent {

	static propTypes = {
		placeholder: React.PropTypes.string,
		validate: React.PropTypes.string,
		fontColor: React.PropTypes.string,
		onChangeText: React.PropTypes.func,
	};

	static defaultProps = {
		placeholder: '',
		validate: '',
		fontColor: '',
		onChangeText: () => {},
	};

	constructor(props) {
		super(props);
		this.placeholderColorAnimation = this.placeholderColorAnimation.bind(this);
		this.placeholderPositionAnimation = this.placeholderPositionAnimation.bind(this);
		this.placeholderSizeAnimation = this.placeholderSizeAnimation.bind(this);
		this.underlineColorAnimation = this.underlineColorAnimation.bind(this);
		this.underlineLengthAnimation = this.underlineLengthAnimation.bind(this);
		this.listMarginTopAnimation = this.listMarginTopAnimation.bind(this);
		this.animationValues = this.animationValues.bind(this);
		this.startAnimation = this.startAnimation.bind(this);
		this.stopAnimation = this.stopAnimation.bind(this);
		this.onLayout = this.onLayout.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onEndEditing = this.onEndEditing.bind(this);
		this.validate = this.validate.bind(this);
		this.checkDefaultText = this.checkDefaultText.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.onSubmitEditing = this.onSubmitEditing.bind(this);
		this.listAccount = this.listAccount.bind(this);
		this.delAccount = this.delAccount.bind(this);
		this.renderAutoComplete = this.renderAutoComplete.bind(this);
		this.onPressListRow = this.onPressListRow.bind(this);

		this.underlineLength = new Animated.Value(0);
		this.underlineColor = new Animated.Value(0);
		this.placeholderPosition = new Animated.Value(0);
		this.placeholderSize = new Animated.Value(0);
		this.placeholderColor = new Animated.Value(0);
		this.listLength = new Animated.Value(0);
		this.listOpacity = new Animated.Value(0);
		this.listMarginTop = new Animated.Value(0);
		this.sceneID = this.props.autoComplete ? this.props.autoComplete : '';
		this.text = '';
		this.dataSource = '';
		this.showButton = false;
		this.state = {
			message: '',
		};
	}
	componentDidMount() {
		this.animationValues();
		this.checkDefaultText();
		this.listAccount();
	}


// Initilize animation values
	animationValues() {
		const color = this.getTheme().textinputColor;
		const top = Platform.OS === 'ios' ? 17 : 22;
		const margin = Platform.OS === 'ios' ? -12 : -10;
		this.state.underlineColor = this.underlineColor.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [color[0], color[1], color[2]],
		});
		this.state.placeholderPosition = this.placeholderPosition.interpolate({
			inputRange: [0, 1],
			outputRange: [top, -3],
		});
		this.state.placeholderSize = this.placeholderSize.interpolate({
			inputRange: [0, 1],
			outputRange: [16, 12],
		});
		this.state.placeholderColor = this.placeholderColor.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [color[0], color[1], color[2]],
		});
		this.state.listMarginTop = this.listMarginTop.interpolate({
			inputRange: [0, 1],
			outputRange: [margin, 6],
		});
	}
	checkDefaultText() {
		if (this.props.value || this.props.defaultValue) {
			this.placeholderSize.setValue(1);
			this.placeholderPosition.setValue(1);
			this.text = this.props.defaultValue;
		}
	}
	// Dynamically get underline length
	onLayout(evt) {
		const { width } = evt.nativeEvent.layout;
		this.setState({
			underlineLength: width,
		});
		// console.log(evt.nativeEvent);
	}

	underlineLengthAnimation(length) {
		return Animated.timing(this.underlineLength, {
			toValue: length,
			duration: 200,
		});
	}

	underlineColorAnimation(color) {
		return Animated.timing(this.underlineColor, {
			toValue: color,
			duration: 200,
		});
	}

	placeholderPositionAnimation(position) {
		return Animated.timing(this.placeholderPosition, {
			toValue: position,
			duration: 200,
		});
	}

	placeholderSizeAnimation(size) {
		return 	Animated.timing(this.placeholderSize, {
			toValue: size,
			duration: 200,
		});
	}

	placeholderColorAnimation(color) {
		return 	Animated.timing(this.placeholderColor, {
			toValue: color,
			duration: 200,
		});
	}
	listMarginTopAnimation(value) {
		return Animated.timing(this.listMarginTop, {
			toValue: value,
			duration: 200,
		});
	}

	startAnimation(placeholderLength, placeholderPosition, placeholderColor, placeholderSize, underlineColor, listMarginTop) {
		Animated.parallel([
			placeholderLength,
			underlineColor,
			placeholderPosition,
			placeholderColor,
			placeholderSize,
			listMarginTop,
		]).start();
		Animated.parallel([
			Animated.timing(this.listLength, {
				toValue: this.state.underlineLength,
				duration: 200,
			}),
			Animated.timing(this.listOpacity, {
				toValue: 1,
				duration: 200,
				delay: 200,
			}),
		]).start();
	}

	stopAnimation(placeholderLength, placeholderPosition, placeholderColor, placeholderSize, underlineColor, listMarginTop) {
		Animated.parallel([
			placeholderLength,
			underlineColor,
			placeholderPosition,
			placeholderColor,
			placeholderSize,
			listMarginTop,
		]).start();
	}

	onFocus() {
		// console.log('focus');
		this.startAnimation(
			this.underlineLengthAnimation(this.state.underlineLength),
			this.underlineColorAnimation(1),
			this.placeholderPositionAnimation(1),
			this.placeholderSizeAnimation(1),
			this.placeholderColorAnimation(1),
			);
		if (this.props.onFocus) {
			this.props.onFocus();
		}
		this.showButton = false;
	}

	onEndEditing() {
		// console.log('blur');
		this.validate(this.text);
		// check if there is a text. If so, Dont stopAnimation.
		if (this.text === '') {
			this.stopAnimation(
				this.underlineLengthAnimation(0),
				this.underlineColorAnimation(0),
				this.placeholderColorAnimation(0),
				this.placeholderPositionAnimation(0),
				this.placeholderSizeAnimation(0),
			);
		} else {
			this.stopAnimation(
				this.underlineLengthAnimation(0),
				this.underlineColorAnimation(0),
				this.placeholderColorAnimation(0),
			);
		}

		this.listLength.setValue(0);
		this.listOpacity.setValue(0);
		if (this.props.onBlur) {
			this.props.onBlur();
		}
		this.showButton = false;
	}

	listAccount() {
		if (this.text !== '') {
			const resp = accounts.query(this.sceneID, this.text);
			if (resp.length > 0) {
				this.dataSource = resp;
			}
		} else {
			const mostUsed = accounts.mostUsed(this.sceneID);
			this.dataSource = mostUsed;
		}
		// fix view not re-render issue after delete
		this.forceUpdate();
	}

	delAccount(id) {
		accounts.del(id);
		this.dataSource = '';
		this.listAccount();
	}

	onSubmitEditing() {
		if (this.sceneID !== '') {
			const exist = accounts.exist(this.text, this.sceneID);
			if (exist.length === 0) {
				if (this.validate(this.text)) {
					accounts.add({
						account: this.text,
						scene: this.sceneID,
						name: '',
						used: 0,
					});
				}
			// insert data
			} else {
			// increase used number
				accounts.used(this.text, this.sceneID);
			}
		}
		if (this.props.onSubmitEditing) {
			this.props.onSubmitEditing();
		}
		return true;
	}
	onChangeText(text) {
		this.text = text;
		this.props.onChangeText(text);
		this.dataSource = '';
		this.listAccount();
	}
	onPressListRow(account) {
		this.input.setNativeProps({ text: account });
		this.onChangeText(account);
		this.input.blur();
		this.listLength.setValue(0);
		this.listOpacity.setValue(0);
		this.placeholderSize.setValue(1);
		this.placeholderPosition.setValue(1);
	}

	renderAutoComplete() {
		const row = {
			flex: 1,
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderColor: '#ECECEC',
		};
		const listStyle = {
			width: this.listLength,
			marginTop: this.state.listMarginTop,
			opacity: this.listOpacity,
			backgroundColor: '#FFFFFF',
			borderRadius: 3,
			shadowColor: '#CDCDCD',
			shadowOpacity: 1,
			shadowRadius: 0.9,
			shadowOffset: {
				height: 1,
				width: 0,
			},
			...Platform.select({
				ios: {
					position: 'absolute',
				},
				android: {
					elevation: 1,
					marginLeft: 4,
				},
			}),
		};
		if (this.dataSource.length > 0) {
			const listAccount = this.dataSource.map((props, key) => {
				const child = (<Button.Flat text={'DELETE'} textColor={'#FF6E6E'} buttonColor={'transparent'} onPress={() => this.delAccount(props.id)} />);
				return (
					<View style={row} key={key}>

						<List
							title={props.account}
							onPress={() => { this.onPressListRow(props.account); }}
							child={child}
							showChild={this.showButton}
							tileHeight={56}
						/>

					</View>
				);
			},
		);
			return (
				<Animated.View style={listStyle}>
					{listAccount}
				</Animated.View>
			);
		}
		return null;
	}
	validate(value) {
		const key = this.props.validate;
		const obj = {
			[key]: value,
		};
		// console.log(obj);

		// Before using datetime we must add the parse and format functions
		validate.extend(validate.validators.datetime, {
		// The value is guaranteed not to be null or undefined but otherwise it
			parse: () => {
			},
		// Input is a unix timestamp
			format: () => {
			},
		});

		const result = validate(obj, constraints);
		if (typeof result[key] !== 'undefined') {
			// console.log(result[key]);
			this.setState({
				message: result[key][0],
			});
			this.startAnimation(
				this.underlineLengthAnimation(this.state.underlineLength),
				this.underlineColorAnimation(2),
				this.placeholderColorAnimation(0),
			);
			this.listMarginTop.setValue(1);
			return false;
		}
		this.setState({
			message: '',
		});
		this.listMarginTop.setValue(0);
		return true;
	}

	get isValid() {
		return this.validate(this.text);
	}


	render() {
		const container = {
			paddingTop: 16,
			// flexWrap: 'nowrap',
		};

		const underLine = {
			borderBottomWidth: 1,
			borderBottomColor: this.getTheme().textinputBorderBottomColor,
			alignItems: 'center',
			top: Platform.OS === 'ios' ? 0 : -5,
			left: Platform.OS === 'ios' ? 0 : 4,
		};

		const input = {
			fontFamily: this.getTheme().fontFamily,
			height: Platform.OS === 'ios' ? 30 : 42,
			fontSize: 16,
			color: this.props.fontColor ? this.props.fontColor : this.getTheme().fontColor.body,
			lineHeight: this.getTheme().lineHeight.body,
			// marginTop: 3,
			// paddingBottom: 8,
			// paddingTop: 8,
		};
		const animatedText = {
			position: 'absolute',
			top: this.state.placeholderPosition,
			left: Platform.OS === 'ios' ? 0 : 4,
			fontSize: this.state.placeholderSize,
			color: this.state.placeholderColor,
			backgroundColor: 'transparent',
		};
		const messageStyle = {
			color: this.getTheme().textinputColor[2],
			top: Platform.OS === 'ios' ? 3 : -6,
			left: Platform.OS === 'ios' ? 0 : 4,
			backgroundColor: 'transparent',
		};

		return (

			<View style={[{ margin: 8 }, this.props.style]}>
				<View style={container} >
					<TextAnimated type={'body'} style={animatedText}>{this.props.placeholder}</TextAnimated>
					<TextInput
						ref={(i) => { this.input = i; }}
						onFocus={this.onFocus}
						onEndEditing={this.onEndEditing}
						underlineColorAndroid={'transparent'}
						{...this.props}
						onChangeText={this.onChangeText}
						onSubmitEditing={this.onSubmitEditing}
						style={input}
						placeholder={''}
					/>
					<View onLayout={this.onLayout} style={underLine} >
						<Animated.View
							style={[{
								marginBottom: -1,
								height: 2.5,
								width: this.underlineLength,
								backgroundColor: this.state.underlineColor,
							}]}
						/>
					</View>
					<Text.Caption style={messageStyle}>{this.state.message}</Text.Caption>
				</View>
				{this.renderAutoComplete()}
			</View>

		);
	}
}

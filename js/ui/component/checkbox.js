import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RippleEffect from './rippleEffect';
import Text from './text';
import FinComponent from '../finComponent';

export default class extends FinComponent {

	static propTypes = {
		color: React.PropTypes.string,
		underlayColor: React.PropTypes.string,
		rippleCircleColor: React.PropTypes.string,
	}

	static defaultProps = {
		color: '#303949',
		underlayColor: '#fff',
		rippleCircleColor: '#fff',
	};

	render() {
		const { containerStyle, inlineStyle, checkboxStyle, onPress, name, color, text, underlayColor, rippleCircleColor } = this.props;

		const defaultContainerStyle = {
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: '#737373',
			borderRadius: 5,
			marginHorizontal: 4,
			marginTop: 8,
		};

		const defaultInlineStyle = {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: Platform.OS === 'ios' ? 4 : 8,
			paddingHorizontal: 8,
		};

		const defaultCheckboxStyle = {
			fontSize: 16,
			color: '#737373',
			marginRight: 4,
		};

		return (
			<RippleEffect underlayColor={underlayColor} rippleCircleColor={rippleCircleColor} style={[defaultContainerStyle, containerStyle]} onPress={onPress}>
				<View style={[defaultInlineStyle, inlineStyle]}>
					<Icon style={[defaultCheckboxStyle, checkboxStyle]} name={name} />
					<Text.Body style={{ marginTop: Platform.OS === 'ios' ? 0 : -6 }} color={color}>{text}</Text.Body>
				</View>
			</RippleEffect>
		);
	}
}


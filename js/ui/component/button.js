import React from 'react';
import { View, Animated, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native';
import FinComponent from '../finComponent';
import Text from './text';
import RippleEffect from './rippleEffect';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
export default class FButton extends FinComponent {

	static propTypes = {
		text: React.PropTypes.string,
		disable: React.PropTypes.bool,
	};

	static defaultProps = {
		text: '',
		disable: false,
	};
	static Flat(props) {
		return (<FlatButton {...props} />);
	}
	static ToolbarButton(props) {
		return (<ToolbarButton {...props} />);
	}
	static Raised(props) {
		return (<RaisedButton {...props} />);
	}
	static Float(props) {
		return (<FloatingButton {...props} />);
	}
	static Icon(props) {
		return (<IconButton {...props} />);
	}
	static Group(props) {
		return (<GroupButton {...props} />);
	}

	render() {
		const boxStyle = {
			backgroundColor: this.props.disable && this.props.buttonColor ? '#DFDFDF' : this.props.buttonColor,
			borderRadius: 2,
			height: 40,
			paddingTop: Platform.OS === 'ios' ? 8 : 0,
			paddingBottom: Platform.OS === 'ios' ? 8 : 5,
			paddingLeft: 8,
			paddingRight: 8,
			minWidth: 64,
			justifyContent: 'space-around',
			alignItems: 'center',
		};
		if (this.props.disable) {
			return (
				<View style={[this.props.style, { padding: 8 }]}>
					<View style={[boxStyle, this.props.boxStyle]}>
						<Text.Button color={this.props.disable && this.props.buttonColor ? '#A5A5A5' : '#B0B0B0'}>{this.props.text}</Text.Button>
					</View>
				</View>);
		}
		return (
			<View style={[this.props.style, { padding: 8 }]}>
				<RippleEffect onPress={this.props.onPress} shadow={this.props.shadow} rippleCircleColor={this.props.rippleCircleColor} >
					<View style={[boxStyle, this.props.boxStyle]}>
						<Text.Button color={this.props.textColor}>{this.props.text}</Text.Button>
					</View>
				</RippleEffect>
			</View>
		);
	}
}


class FlatButton extends FinComponent {
	static propTypes = {
		disable: React.PropTypes.bool,
		textColor: React.PropTypes.string,
	};

	static defaultProps = {
		disable: false,
		textColor: '#2196F3',
	};

	render() {
		const boxStyle = {
			// backgroundColor: '#2196F3',
		};
		return (
			<FButton boxStyle={boxStyle} {...this.props} />
		);
	}
}

class RaisedButton extends FinComponent {
	static propTypes = {
		disable: React.PropTypes.bool,
		textColor: React.PropTypes.string,
		buttonColor: React.PropTypes.string,
		shadow: React.PropTypes.bool,
		rippleCircleColor: React.PropTypes.string,
	};

	static defaultProps = {
		disable: false,
		textColor: '#FFFFFF',
		buttonColor: '#2196F3',
		shadow: true,
		rippleCircleColor: '#FFFFFF',
	};

	render() {
		const boxStyle = {
		};
		return (
			<FButton boxStyle={boxStyle} {...this.props} />
		);
	}
}

class FloatingButton extends FinComponent {
	static propTypes = {
		disable: React.PropTypes.bool,
		iconName: React.PropTypes.string,
		iconColor: React.PropTypes.string,
		buttonColor: React.PropTypes.string,
	};

	static defaultProps = {
		disable: false,
		buttonColor: '#2196F3',
		iconColor: '#F2F2F2',
	};
	constructor(props) {
		super(props);
		this.state = {
			shape: new Animated.Value(0),
			rotation: new Animated.Value(0),
		};
		this.onPressIn = this.onPressIn.bind(this);
		this.shape = this.state.shape.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 0],
		});
		this.rotate = this.state.rotation.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg'],
		});
	}

	onPressIn() {
		this.state.shape.setValue(0);
		this.state.rotation.setValue(1);
		Animated.timing(this.state.shape, {
			toValue: 1,
			duration: 200,
		}).start(() => this.fadeOut());
	}
	fadeOut() {
		Animated.parallel([
			Animated.timing(this.state.shape, {
				toValue: 0,
				duration: 200,
				delay: 200,
			}),
			Animated.spring(this.state.rotation, {
				toValue: 0,
				duration: 200,
				delay: 200,
			}),
		]).start();
		this.props.onPress();
	}
	render() {
		const boxStyle = {
			elevation: 5,
			backgroundColor: this.props.buttonColor,
			borderRadius: 28,
			height: 56,
			width: 56,
			paddingLeft: 16,
			paddingRight: 16,
			shadowColor: 'rgba(0,0,0,0.26)',
			shadowOpacity: 1,
			shadowRadius: 3,
			shadowOffset: {
				height: 5,
				width: 0,
			},
			justifyContent: 'center',
			transform: [
				{
					scale: this.shape,
				},
				{
					rotate: this.rotate,
				},
			],
		};
		const iconStyle = {
			fontSize: 24,
			color: this.props.iconColor,
		};
		return (
			<View style={this.props.style}>
				<TouchableWithoutFeedback disabled={this.props.disable} onPressIn={this.onPressIn}>
					<Animated.View style={[boxStyle, this.props.boxStyle]} >
						<Icon name={this.props.iconName} style={[iconStyle, this.props.iconStyle]} />
					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}


class IconButton extends FinComponent {
	static propTypes = {
		disable: React.PropTypes.bool,
		iconName: React.PropTypes.string,
		iconColor: React.PropTypes.string,
		iconSize: React.PropTypes.number,
	};

	static defaultProps = {
		disable: false,
		iconSize: 24,
		iconColor: '#6D6D6D',
	};
	constructor(props) {
		super(props);
		this.state = {
			opacity: new Animated.Value(0),
			shape: new Animated.Value(0),
			rippleContainerHeight: 50,
			rippleContainerWidth: 50,
		};
		this.onPressIn = this.onPressIn.bind(this);
		this.onPressOut = this.onPressOut.bind(this);
		this.onPress = this.onPress.bind(this);
		this.onLayout = this.onLayout.bind(this);
		this.shape = this.state.shape.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [0.3, 0.5, 0.7],
		});
	}
	onPressIn() {
		this.state.shape.setValue(0);
		this.state.opacity.setValue(0);
		Animated.parallel([
			Animated.timing(this.state.opacity, {
				toValue: 0.2,
				duration: 30,
			}),
			Animated.timing(this.state.shape, {
				toValue: 1,
				duration: 30,
			}),
		]).start();
	}
	onPressOut() {
		Animated.sequence([
			Animated.timing(this.state.shape, {
				toValue: 2,
				duration: 100,
			}),
			Animated.timing(this.state.opacity, {
				toValue: 0,
				duration: 300,
			}),
		]).start();
		// // 让子弹飞一会
		// setTimeout(this.props.onPress, 200);
	}

	onPress() {
		setTimeout(() => {
			this.props.onPress();
		}, 200);
	}

	onLayout(evt) {
		this.setState({
			rippleContainerHeight: evt.nativeEvent.layout.height,
			rippleContainerWidth: evt.nativeEvent.layout.width,
		});
	}

	render() {
		const iconStyle = {
			fontSize: this.props.iconSize,
			color: this.props.disable ? '#B0B0B0' : this.props.iconColor,
			alignSelf: 'center',
			top: Platform.OS === 'ios' ? 6 : 10,
			backgroundColor: 'transparent',
		};
		const rippleCircleStyle = {
			position: 'absolute',
			backgroundColor: this.props.iconColor,
			height: this.state.rippleContainerHeight + 33,
			width: this.state.rippleContainerWidth + 33,
			top: Platform.OS === 'ios' ? -10 : -6,
			left: Platform.OS === 'ios' ? -10 : -6,
			borderRadius: 40,
			opacity: this.state.opacity,
			transform: [
				{
					scale: this.shape,
				},
			],
		};
		if (this.props.disable) {
			return (
				<View style={this.props.style}>
					<Icon name={this.props.iconName} style={iconStyle} />
				</View>);
		}
		return (
			<View style={this.props.style}>
				<TouchableWithoutFeedback onPressIn={this.onPressIn} onPressOut={this.onPressOut} onPress={this.onPress}>
					<View style={{ height: Platform.OS === 'ios' ? 35 : 45, width: Platform.OS === 'ios' ? 35 : 45 }}>
						<Icon onLayout={this.onLayout} name={this.props.iconName} style={iconStyle} />
						<Animated.View style={rippleCircleStyle} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}
class ToolbarButton extends FinComponent {

	static propTypes = {
		iconName: React.PropTypes.string,
		text: React.PropTypes.string,
		color: React.PropTypes.string,
		onPress: React.PropTypes.func,
	};

	static defaultProps = {
		onPress: () => { },
		color: '#ffffff',
	};

	render() {
		const styles = {
			toolbarButton: {
				alignItems: 'center',
				width: width / 4,
				height: 68,
				justifyContent: 'center',
				backgroundColor: 'transparent',
			},
			toolbarIcon: {
				fontSize: 25,
				color: this.props.disable ? '#DFDFDF' : this.props.color,
			},
		};
		let beta;
		if (this.props.beta) {
			beta = (
				<Text.Caption bold style={{ fontSize: 9, marginLeft: 2 }} color={'#FF6347'}>BETA</Text.Caption>
			);
		}
		if (this.props.disable) {
			return (
				<View style={[styles.toolbarButton, { opacity: 0.7 }]}>
					<Icon style={styles.toolbarIcon} name={this.props.iconName} />
					<View style={{ flexDirection: 'row' }}>
						<Text.Body color={'#DFDFDF'}>{this.props.text}</Text.Body>
						{beta}
					</View>
				</View>);
		}
		return (
			<RippleEffect rippleCircleColor={this.props.color} onPress={this.props.onPress} >
				<View style={styles.toolbarButton}>
					<Icon style={styles.toolbarIcon} name={this.props.iconName} />
					<View style={{ flexDirection: 'row' }}>
						<Text.Body color={this.props.color}>{this.props.text}</Text.Body>
						{beta}
					</View>
				</View>
			</RippleEffect>
		);
	}
}

class GroupButton extends FinComponent {
	static propTypes = {
		height: React.PropTypes.number,
	};

	static defaultProps = {
		height: 68,
	};

	render() {
		const boxStyle = {
			flexDirection: 'row',
			justifyContent: 'space-around',
			backgroundColor: 'transparent',
			alignItems: 'center',
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: this.props.height,
		};
		return (
			<View style={boxStyle}>{this.props.children}</View>
		);
	}
}

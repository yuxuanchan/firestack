import React, { Component } from 'react';
import { View, Animated, TouchableWithoutFeedback } from 'react-native';

const defaultAnimation = {
	opacity: 0,
	shape: 0,
	backgroundOpacity: 0,
};

const targetAnimation = {
	opacity: 0.4,
	shape: 1,
	backgroundOpacity: 0.2,
};

export default class extends Component {

	static propTypes = {
		rippleCircleColor: React.PropTypes.string,
		shadow: React.PropTypes.bool,
		onPress: React.PropTypes.func,
		onPressIn: React.PropTypes.func,
		onPressOut: React.PropTypes.func,
		onLongPress: React.PropTypes.func,
	};

	static defaultProps = {
		rippleCircleColor: '#999999',
		shadow: false,
		onPress: () => {},
		onPressIn: () => {},
		onPressOut: () => {},
		onLongPress: () => {},
	};

	constructor(props) {
		super(props);
		this.state = {
			rippleContainerHeight: 0,
			rippleContainerWidth: 0,
			x: 0,
			y: 0,
		};
		this.waveAnimation = this.waveAnimation.bind(this);
		this.onLayout = this.onLayout.bind(this);
		this.onPressIn = this.onPressIn.bind(this);
		this.onPressOut = this.onPressOut.bind(this);
		this.onPress = this.onPress.bind(this);
		this.backgroundOpacity = new Animated.Value(defaultAnimation.backgroundOpacity);
		this.opacity = new Animated.Value(defaultAnimation.opacity);

		this.shape = new Animated.Value(defaultAnimation.shape);
		const circleScaleOnPress = 2.5;
		const circleScaleOnRelease = circleScaleOnPress + 3;
		this.shapeStyle = this.shape.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [1, circleScaleOnPress, circleScaleOnRelease],
		});
	}

	onPressIn(evt) {
		this.opacity.setValue(0);
		this.backgroundOpacity.setValue(0);
		this.shape.setValue(0);

		this.setState({
			x: evt.nativeEvent.locationX,
			y: evt.nativeEvent.locationY,
		});

		Animated.timing(this.opacity, {
			toValue: targetAnimation.opacity,
			duration: 0,
		}).start();

		Animated.timing(this.backgroundOpacity, {
			toValue: targetAnimation.backgroundOpacity,
			duration: 150,
		}).start();

		Animated.timing(this.shape, {
			toValue: targetAnimation.shape,
			duration: 200,
		}).start((status) => {
			// start wave animation onLongPress
			if (status.finished) {
				setTimeout(() => {
					this.waveAnimation(targetAnimation.shape);
				}, 500);
			}
		});

		if (this.props.onPressIn) {
			this.props.onPressIn();
		}
	}

	onPressOut() {
		Animated.timing(this.backgroundOpacity, {
			toValue: defaultAnimation.backgroundOpacity,
			duration: 250,
		}).start();

		Animated.timing(this.opacity, {
			toValue: defaultAnimation.opacity,
			duration: 300,
		}).start();

		Animated.timing(this.shape, {
			toValue: targetAnimation.shape + 1,
			duration: 200,
		}).start();

		if (this.props.onPressOut) {
			this.props.onPressOut();
		}
	}

	onPress() {
		setTimeout(() => {
			this.props.onPress();
		}, 200);
	}

	onLayout(evt) {
		const { height, width } = evt.nativeEvent.layout;
		this.setState({
			rippleContainerHeight: height,
			rippleContainerWidth: width,
		});
	}

	waveAnimation(size) {
		const normal = targetAnimation.shape;
		const big = targetAnimation.shape + 0.1;
		const scale = size === normal ? big : normal;
		Animated.timing(this.shape, {
			toValue: scale,
			duration: 1000,
		}).start((status) => {
			if (status.finished) {
				this.waveAnimation(scale);
			}
		});
	}

	render() {
		let componentShadowStyle = {
			overflow: 'hidden',
		};

		if (this.props.shadow) {
			componentShadowStyle = {
				overflow: 'hidden',
				shadowColor: 'rgba(0,0,0,0.26)',
				shadowOpacity: 1,
				shadowRadius: 2,
				shadowOffset: {
					height: 2,
					width: 0,
				},
			};
		}

		const rippleBackgroundStyle = {
			backgroundColor: '#999999',
			opacity: this.backgroundOpacity,
			height: this.state.rippleContainerHeight ? this.state.rippleContainerHeight : undefined,
			width: this.state.rippleContainerWidth ? this.state.rippleContainerWidth : undefined,
			position: 'absolute',
			borderRadius: 2,
			top: 0,
			left: 0,
		};

		let circleSize = this.state.rippleContainerWidth ? this.state.rippleContainerWidth : 50;
		circleSize /= 3;

		const rippleCircleStyle = {
			position: 'absolute',
			backgroundColor: this.props.rippleCircleColor,
			height: circleSize,
			width: circleSize,
			top: this.state.y - (circleSize / 2),
			left: this.state.x - (circleSize / 2),
			borderRadius: circleSize / 2,
			opacity: this.opacity,
			transform: [
				{
					scale: this.shapeStyle,
				},
			],
		};

		return (
			<View style={this.props.style}>
				<View elevation={3} style={componentShadowStyle}>
					<TouchableWithoutFeedback
						onPressIn={this.onPressIn}
						onPressOut={this.onPressOut}
						onPress={this.onPress}
						onLongPress={this.props.onLongPress}
						delayLongPress={1000}
					>
						<View>
							<View onLayout={this.onLayout}>{this.props.children}</View>
							<Animated.View style={rippleCircleStyle} />
							<Animated.View style={rippleBackgroundStyle} />
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		);
	}
}

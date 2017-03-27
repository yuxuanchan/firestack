import React from 'react';
import { View, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FinComponent from '../finComponent';

const { width } = Dimensions.get('window');

export default class Toolbar extends FinComponent {
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
			width: '',
			height: '',
			borderRadius: '',
			marginBottom: '',
			marginRight: '',
			opacity: '',
			buttonActive: null,
		};
		this.startAnimation = this.startAnimation.bind(this);
		this.stopAnimation = this.stopAnimation.bind(this);
		this.onPress = this.onPress.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.cachedContentOffsetY = 0;
		this.scrolling = false;
		this.scrollListener = this.scrollListener.bind(this);
		this.renderChildren = this.renderChildren.bind(this);
		this.renderOtherChildrens = this.renderOtherChildrens.bind(this);
		this.width = new Animated.Value(0);
		this.height = new Animated.Value(0);
		this.borderRadius = new Animated.Value(0);
		this.marginBottom = new Animated.Value(0);
		this.opacity = new Animated.Value(0);
		this.marginRight = new Animated.Value(0);
		this.state.width = this.width.interpolate({
			inputRange: [0, 1],
			outputRange: [56, width],
		});
		this.state.height = this.height.interpolate({
			inputRange: [0, 1],
			outputRange: [56, 68],
		});
		this.state.borderRadius = this.borderRadius.interpolate({
			inputRange: [0, 1],
			outputRange: [28, 0],
		});
		this.state.marginBottom = this.marginBottom.interpolate({
			inputRange: [0, 1],
			outputRange: [64, 0],
		});
		this.state.marginRight = this.marginRight.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [16, 82, 0],
		});
		this.state.opacity = this.opacity.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
		});
	}


	componentWillReceiveProps(newPorps) {
		if (newPorps.scroll) {
			this.stopAnimation();
		}
	}

	startAnimation() {
		this.opacity.setValue(0);
		Animated.sequence([
			Animated.parallel([
				Animated.timing(this.marginBottom, {
					toValue: 1,
					duration: 150,
				}),
				Animated.timing(this.marginRight, {
					toValue: 1,
					duration: 150,
				}),
			]),
			Animated.parallel([
				Animated.timing(this.width, {
					toValue: 1,
					duration: 150,
				}),
				Animated.timing(this.height, {
					toValue: 1,
					duration: 150,
				}),
				Animated.timing(this.marginRight, {
					toValue: 2,
					duration: 150,
				}),
				Animated.timing(this.borderRadius, {
					toValue: 1,
					duration: 150,
					delay: 50,
				}),
			]),
			Animated.timing(this.opacity, {
				toValue: 1,
				duration: 150,
			}),
		]).start(this.setState({ buttonActive: true }));
	}

	stopAnimation() {
		const duration = 300;
		Animated.sequence([
			Animated.parallel([
				Animated.timing(this.width, {
					toValue: 0,
					duration,
				}),
				Animated.timing(this.height, {
					toValue: 0,
					duration,
				}),
				Animated.timing(this.marginRight, {
					toValue: 1,
					duration,
				}),
				Animated.timing(this.borderRadius, {
					toValue: 0,
					duration,
				}),

			]),
			Animated.parallel([
				Animated.timing(this.marginBottom, {
					toValue: 0,
					duration,
				}),
				Animated.timing(this.marginRight, {
					toValue: 0,
					duration,
				}),
			]),
		]).start(this.setState({ buttonActive: false }));
	}

	componentDidMount() {
		// start scroll listener
		this.scrollListener();
	}

	componentWillUnmount() {
		// stop scroll listener
		clearInterval(this.setInterval);
	}

	scrollListener() {
		this.setInterval = setInterval(() => {
			// check if scrolling stoped
			if (this.cachedContentOffsetY === this.contentOffsetY) {
				this.scrolling = false;
			} else {
				this.cachedContentOffsetY = this.contentOffsetY;
				this.scrolling = true;
			}
			// console.log(`scrolling ${this.scrolling}`);
		}, 100);
	}

	onScroll(e) {
		this.contentOffsetY = e.nativeEvent.contentOffset.y;

		if (this.state.buttonActive === true && this.scrolling === false) {
			this.stopAnimation();
		}
	}

	onPress() {
		if (!this.state.buttonActive) {
			this.startAnimation();

			// close button
			if (this.state.buttonActive === true && this.scrolling === false) {
				this.stopAnimation();
			}
		}
	}

	renderButtonIcon() {
		const iconStyle = {
			fontSize: 24,
			color: this.props.iconColor,
		};
		if (this.state.buttonActive) return null;
		const renderIcon = (
			<Icon name={this.props.iconName} style={[iconStyle, this.props.iconStyle]} />
		);
		return renderIcon;
	}

	renderChildren() {
		const childrenStyle = {
			opacity: this.opacity,
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			height: 68,
		};
		if (!this.state.buttonActive) return null;
		const actionButtons = (
			<Animated.View style={childrenStyle} pointerEvents={'box-none'}>
				{this.props.children[0]}
			</Animated.View>
		);

		return actionButtons;
	}

	renderOtherChildrens() {
		return this.props.children.map((item, key) => {
			if (key > 1) {
				return React.cloneElement(item, { key });
			}
			return null;
		});
	}

	render() {
		const ButtonPosition = {
			position: 'absolute',
			height: this.state.height,
			width: this.state.width,
			bottom: this.state.marginBottom,
			right: this.state.marginRight,
		};
		const boxStyle = {
			backgroundColor: this.props.buttonColor,
			borderRadius: this.state.borderRadius,
			height: this.state.height,
			width: this.state.width,
			paddingLeft: 16,
			paddingRight: 16,
			shadowColor: 'rgba(0,0,0,0.26)',
			shadowOpacity: 1,
			shadowRadius: 3,
			shadowOffset: {
				height: 5,
				width: 0,
			},
			alignSelf: 'center',
			justifyContent: 'center',

		};
		const props = {
			onScroll: this.onScroll,
		};

		return (
			<View style={{ flex: 1, ...this.props.style }}>
				{React.cloneElement(this.props.children[1], props)}
				<TouchableWithoutFeedback onPress={this.onPress}>
					<Animated.View style={ButtonPosition} >
						<Animated.View style={[boxStyle, this.props.boxStyle]} >
							{this.renderButtonIcon()}
						</Animated.View>
						{this.renderChildren()}
					</Animated.View>
				</TouchableWithoutFeedback>
				{this.renderOtherChildrens()}
			</View>
		);
	}
}

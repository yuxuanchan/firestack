import React, { Component, PropTypes } from 'react';
import FinComponent from '../finComponent';
import { Animated, ART, Easing, View, TouchableWithoutFeedback } from 'react-native';

const CIRCLE = Math.PI * 2;

function makeArcPath(x, y, startAngleArg, endAngleArg, radius, direction) {
	let startAngle = startAngleArg;
	let endAngle = endAngleArg;
	if (endAngle - startAngle >= CIRCLE) {
		endAngle = CIRCLE + (endAngle % CIRCLE);
	} else {
		endAngle = endAngle % CIRCLE;
	}
	startAngle = startAngle % CIRCLE;
	const angle = startAngle > endAngle ? CIRCLE - startAngle + endAngle : endAngle - startAngle;

	if (angle >= CIRCLE) {
		return ART.Path()
		.moveTo(x + radius, y)
		.arc(0, radius * 2, radius, radius)
		.arc(0, radius * -2, radius, radius)
		.close();
	}

	const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
	endAngle *= directionFactor;
	startAngle *= directionFactor;
	const startSine = Math.sin(startAngle);
	const startCosine = Math.cos(startAngle);
	const endSine = Math.sin(endAngle);
	const endCosine = Math.cos(endAngle);

	const arcFlag = angle > Math.PI ? 1 : 0;
	const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;

	return `M${x + radius * (1 + startSine)} ${y + radius - radius * startCosine}
	A${radius} ${radius} 0 ${arcFlag} ${reverseFlag} ${x + radius * (1 + endSine)} ${y + radius - radius * endCosine}`;
}

class Arc extends Component {
	static propTypes = {
		startAngle: PropTypes.number.isRequired, // in radians
		endAngle: PropTypes.number.isRequired, // in radians
		radius: PropTypes.number.isRequired,
		offset: PropTypes.shape({
			top: PropTypes.number,
			left: PropTypes.number,
		}),
		strokeWidth: PropTypes.number,
		direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
	};

	static defaultProps = {
		startAngle: 0,
		offset: { top: 0, left: 0 },
		strokeWidth: 0,
		direction: 'clockwise',
	};

	render() {
		const { startAngle, endAngle, radius, offset, direction, strokeWidth, ...restProps } = this.props;
		const path = makeArcPath(
		(offset.left || 0) + strokeWidth / 2,
		(offset.top || 0) + strokeWidth / 2,
		startAngle,
		endAngle,
		radius - strokeWidth / 2,
		direction,
		);
		return (
			<ART.Shape
				d={path}
				strokeCap="butt"
				strokeWidth={strokeWidth}
				{...restProps}
			/>
		);
	}
}


const AnimatedArc = Animated.createAnimatedComponent(Arc);
const AnimatedSurface = Animated.createAnimatedComponent(ART.Surface);
const MIN_ARC_ANGLE = 0.1;
const MAX_ARC_ANGLE = 1.5 * Math.PI;

export default class FProgressCircle extends FinComponent {

	static Determinate(props) {
		return (<Determinate {...props} />);
	}
	static Indeterminate(props) {
		return (<Indeterminate {...props} />);
	}

}
class Determinate extends FinComponent {
	static propTypes = {
		color: PropTypes.string,
		children: React.PropTypes.node,
		direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
		progress: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.instanceOf(Animated.Value),
		]),
		rotation: PropTypes.instanceOf(Animated.Value),
		size: PropTypes.number,
		style: View.propTypes.style,
		thickness: PropTypes.number,
	};

	static defaultProps = {
		color: '#ffffff',
		direction: 'clockwise',
		progress: 0,
		size: 50,
		thickness: 4,
	};
	constructor(props) {
		super(props);
		this.animate = this.animate.bind(this);
		this.state = {
			progressEnabled: false,
			IndeterminateEnabled: true,
			endAngle: new Animated.Value(0),
		};
	}
	componentWillReceiveProps(props) {
		if (props) {
			this.setState({ progressEnabled: true });
			this.setState({ IndeterminateEnabled: false });
			const angle = (props.progress * CIRCLE) / 100;
			this.animate(angle);
			// if (props.progress === 100) {
			// 	this.setState({ progressEnabled: false });
			// }
		}
	}
	animate(progress) {
		Animated.timing(this.state.endAngle, {
			duration: 500,
			toValue: progress,
		}).start();
	}
	renderDeterminateCircle() {
		if (this.state.progressEnabled === false) return null;
		const { color, children, direction, rotation, size, thickness } = this.props;

		const border = 0;

		const radius = (size / 2) - border;
		const offset = {
			top: border,
			left: border,
		};

		return (
			<View>
				<AnimatedSurface
					width={size}
					height={size}
					style={{
						transform: [{
							rotate: rotation ? rotation.interpolate({
								inputRange: [0, 1],
								outputRange: ['0deg', '360deg'],
							}) : '0deg',
						}],
					}}
				>
					<AnimatedArc
						radius={radius}
						offset={offset}
						startAngle={0}
						endAngle={this.state.endAngle}
						direction={direction}
						stroke={color}
						strokeWidth={thickness}
					/>
				</AnimatedSurface>
				{children}
			</View>
		);
	}
	renderIndeterminateCircle() {
		if (this.state.IndeterminateEnabled === false) return null;
		return (<Indeterminate size={120} />);
	}
	render() {
		const { style, ...restProps } = this.props;
		const styles = {
			container: {
				backgroundColor: 'transparent',
				overflow: 'hidden',
			},
		};

		return (
			<View style={[styles.container, style]} {...restProps} >
				{this.renderIndeterminateCircle()}
				{this.renderDeterminateCircle()}
			</View>
		);
	}
}
class Indeterminate extends FinComponent {
	static propTypes = {
		animating: PropTypes.bool,
		color: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
		]),
		direction: PropTypes.oneOf(['clockwise', 'counter-clockwise']),
		hidesWhenStopped: PropTypes.bool,
		size: PropTypes.number,
		thickness: PropTypes.number,
		duration: PropTypes.number,
		spinDuration: PropTypes.number,
	};

	static defaultProps = {
		animating: true,
		color: '#ffffff',
		direction: 'clockwise',
		hidesWhenStopped: false,
		size: 100,
		thickness: 8,
	};

	constructor(props) {
		super(props);
		this.onPressIn = this.onPressIn.bind(this);
		this.onPressOut = this.onPressOut.bind(this);
		this.state = {
			startAngle: new Animated.Value(-MIN_ARC_ANGLE),
			endAngle: new Animated.Value(0),
			rotation: new Animated.Value(0),
			circleScale: new Animated.Value(0),
			colorIndex: 0,
		};
	}

	componentDidMount() {
		if (this.props.animating) {
			this.animate();
			this.spin();
		}
	}

	componentWillReceiveProps(props) {
		// console.log(props);
		if (props.animating !== this.props.animating) {
			if (props.animating) {
				this.animate();
				this.spin();
			} else {
				this.stopAnimations();
			}
		}
	}
	onPressIn() {
		this.state.circleScale.setValue(0);
		 Animated.spring(this.state.circleScale, {
			toValue: 1,
			velocity: 3,  // Velocity makes it move
			friction: 1,  // Oscillate a lot
		}).start();
	}

	onPressOut() {
		 Animated.spring(this.state.circleScale, {
			toValue: 0,
			velocity: 3,  // Velocity makes it move
			friction: 1,  // Oscillate a lot
		}).start();
		if (this.props.onPressOut) {
			this.props.onPressOut();
		}
	}

	animate(iteration = 1) {
		Animated.sequence([
			Animated.timing(this.state.startAngle, {
				toValue: -MAX_ARC_ANGLE * iteration - MIN_ARC_ANGLE,
				duration: this.props.duration || 1000,
				isInteraction: false,
				easing: Easing.inOut(Easing.quad),
			}),
			Animated.timing(this.state.endAngle, {
				toValue: -MAX_ARC_ANGLE * iteration,
				duration: this.props.duration || 1000,
				isInteraction: false,
				easing: Easing.inOut(Easing.quad),
			}),
		]).start((endState) => {
			if (endState.finished) {
				if (Array.isArray(this.props.color)) {
					this.setState({
						colorIndex: iteration % this.props.color.length,
					});
				}
				this.animate(iteration + 1);
			}
		});
	}

	spin() {
		Animated.timing(this.state.rotation, {
			toValue: 1,
			duration: this.props.spinDuration || 1000,
			easing: Easing.linear,
			isInteraction: false,
		}).start((endState) => {
			if (endState.finished) {
				this.state.rotation.setValue(0);
				this.spin();
			}
		});
	}

	stopAnimations() {
		this.state.startAngle.stopAnimation();
		this.state.endAngle.stopAnimation();
		this.state.rotation.stopAnimation();
	}

	render() {
		const {
			animating,
			hidesWhenStopped,
			size,
			thickness,
			color,
			style,
			children,
			direction,
			...restProps
			} = this.props;
		if (!animating && hidesWhenStopped) {
			return null;
		}
		const radius = size / 2 - thickness;
		const offset = {
			top: thickness,
			left: thickness,
		};
		// console.log(this.state.circleScale);
		const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
		return (
			<TouchableWithoutFeedback onPressIn={this.onPressIn} onPressOut={this.onPressOut} onLongPress={this.props.onLongPress} delayLongPress={1000}>
				<Animated.View
					{...restProps}
					style={[
						style,
						{
							backgroundColor: 'transparent',
							overflow: 'hidden',
							transform: [{
								rotate: this.state.rotation.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', `${directionFactor * 360}deg`],
								}),
							}],
						},
					]}
				>
					<AnimatedSurface
						width={size}
						height={size}
						style={{ transform: [
							{
								scale: this.state.circleScale.interpolate({
									inputRange: [0, 1],
									outputRange: [0.5, 0.7],
								}),
							},
						],
						}}
					>
						<AnimatedArc
							direction={direction === 'counter-clockwise' ? 'clockwise' : 'counter-clockwise'}
							radius={radius}
							stroke={Array.isArray(color) ? color[this.state.colorIndex] : color}
							offset={offset}
							startAngle={this.state.startAngle}
							endAngle={this.state.endAngle}
							strokeCap="round"
							strokeWidth={thickness}
						/>
					</AnimatedSurface>
					{children}
				</Animated.View>
			</TouchableWithoutFeedback>

		);
	}
}


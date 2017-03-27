import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import FinComponent from '../finComponent';


const { width } = Dimensions.get('window');
const barWidth = 180;
const barHeight = 5;

export default class FProgressBar extends FinComponent {

	static propTypes = {
		progress: React.PropTypes.number.isRequired,
	}

	static defaultProps = {
		progress: 0,
	}

	static Determinate = props => (<ProgressBarDeterminate {...props} />);
	static Indeterminate = props => (<ProgressBarIndeterminate {...props} />);

	render() {
		const barBackground = {
			backgroundColor: this.getTheme().progressBarBackgroundColor,
			height: barHeight,
		};

		const bar = {
			backgroundColor: this.getTheme().progressBarColor,
			height: barHeight,
			zIndex: 10,
			marginTop: -barHeight,
			...this.props.bar,
		};

		return (
			<View style={this.props.style}>
				<View style={barBackground} />
				<Animated.View style={bar} />
			</View>
		);
	}

}


class ProgressBarDeterminate extends FinComponent {
	constructor(props) {
		super(props);
		this.state = {
			barWidth: new Animated.Value(0),
		};
	}

	progress= React
	componentDidMount() {
		this.update(this.props.progress);
	}

	componentWillReceiveProps(newProps) {
		this.update(newProps.progress);
	}

	update(progress) {
		Animated.timing(this.state.barWidth, {
			toValue: progress,
			duration: 1000,
		}).start();
	}

	render() {
		const bar = {
			width: this.state.barWidth,
		};

		return (
			<FProgressBar bar={bar} {...this.props} />
		);
	}
}


class ProgressBarIndeterminate extends FinComponent {
	constructor(props) {
		super(props);
		this.state = {
			goRight: new Animated.Value(-barWidth),
		};

		this.loop = this.loop.bind(this);
	}

	componentDidMount() {
		this.loop();
	}

	loop() {
		this.state.goRight.setValue(-barWidth);
		Animated.timing(this.state.goRight, {
			toValue: width + barWidth,
			duration: 1500,
		}).start(this.loop);
	}

	render() {
		const bar = {
			width: barWidth,
			transform: [{
				translateX: this.state.goRight,
			}],
		};

		return (
			<FProgressBar bar={bar} {...this.props} />
		);
	}
}

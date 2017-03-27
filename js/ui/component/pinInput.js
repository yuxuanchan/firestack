import React from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import FinComponent from '../finComponent';


export default class extends FinComponent {

	static propTypes = {
		onChangeText: React.PropTypes.func,
	};
	static defaultProps = {
		onChangeText: () => { },
	}

	constructor(props) {
		super(props);
		this.state = {
			pin: '',
		};
		this.onChangeText = this.onChangeText.bind(this);
		this.focus = this.focus.bind(this);
		this.input = null;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.clean !== null && nextProps.clean) {
			this.setState({
				pin: '',
			});
		}
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.input !== null) {
				this.input.focus();
			}
		}, 100);
	}

	componentWillUnmount() {
		if (this.input !== null) {
			this.input.clear();
			this.input.blur();
		}
	}

	onChangeText(pin) {
		this.setState({ pin });
		this.props.onChangeText(pin);
	}

	focus() {
		if (this.input.isFocused() === false) {
			this.input.focus();
		}
	}


	render() {
		const defaultStyle = {
			margin: 4,
		};
		const styles = {
			pinBox: {
				flexDirection: 'row',
			},
			box: {
				height: 40,
				width: 40,
				justifyContent: 'center',
				alignItems: 'center',
			},
		};

		const iconActive = (<Icon name={'lens'} style={{ color: '#78AFDF', fontSize: 15 }} />);
		const iconInactive = (<Icon name={'lens'} style={{ color: '#DADBDC', fontSize: 15 }} />);
		return (
			<TouchableWithoutFeedback onPress={this.focus}>
				<View {...this.props} style={[defaultStyle, this.props.style]} >
					<View style={styles.pinBox}>
						<View style={styles.box}>{this.state.pin.length >= 1 ? iconActive : iconInactive}</View>
						<View style={styles.box}>{this.state.pin.length >= 2 ? iconActive : iconInactive}</View>
						<View style={styles.box}>{this.state.pin.length >= 3 ? iconActive : iconInactive}</View>
						<View style={styles.box}>{this.state.pin.length >= 4 ? iconActive : iconInactive}</View>
						<View style={styles.box}>{this.state.pin.length >= 5 ? iconActive : iconInactive}</View>
						<View style={styles.box}>{this.state.pin.length >= 6 ? iconActive : iconInactive}</View>
					</View>
					<TextInput ref={(i) => { this.input = i; }} keyboardType={'numeric'} onChangeText={this.onChangeText} maxLength={6} style={{ position: 'absolute', top: 0, left: 0, right: 0, width: 240, height: 50, opacity: 0 }} />
				</View>
			</TouchableWithoutFeedback>
		);
	}

}

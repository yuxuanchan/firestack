import React from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FinComponent from '../finComponent';
import Text from './text';

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
		this.focus = this.focus.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
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
			this.input.focus();
		}, 100);
	}

	componentWillUnmount() {
		this.input.clear();
		this.input.blur();
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
			margin: 8,
		};
		const styles = {
			pinBox: {
				flexDirection: 'row',
			},
			box: {
				borderColor: '#E7E6E6',
				borderWidth: StyleSheet.hairlineWidth,
				height: 45,
				width: 45,
				justifyContent: 'center',
				alignItems: 'center',
			},
		};

		return (
			<TouchableWithoutFeedback onPress={this.focus}>
				<View {...this.props} style={[defaultStyle, this.props.style]}>
					<View style={styles.pinBox}>
						<View style={styles.box}><Text.Title>{this.state.pin.length >= 1 && this.state.pin[0]}</Text.Title></View>
						<View style={styles.box}><Text.Title>{this.state.pin.length >= 2 && this.state.pin[1]}</Text.Title></View>
						<View style={styles.box}><Text.Title>{this.state.pin.length >= 3 && this.state.pin[2]}</Text.Title></View>
						<View style={styles.box}><Text.Title>{this.state.pin.length >= 4 && this.state.pin[3]}</Text.Title></View>
						<View style={styles.box}><Text.Title>{this.state.pin.length >= 5 && this.state.pin[4]}</Text.Title></View>
						<View style={styles.box}><Text.Title>{this.state.pin.length >= 6 && this.state.pin[5]}</Text.Title></View>
					</View>
					<TextInput ref={(i) => { this.input = i; }} keyboardType={'numeric'} onChangeText={this.onChangeText} maxLength={6} style={{ position: 'absolute', top: 0, left: 0, right: 0, width: 240, height: 50, opacity: 0 }} />
				</View>
			</TouchableWithoutFeedback>
		);
	}

}

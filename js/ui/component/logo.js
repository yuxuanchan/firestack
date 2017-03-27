import React from 'react';
import { Image } from 'react-native';
import FinComponent from '../finComponent';
import FIcon from './fontIcon';

export default class FLogo extends FinComponent {

	static FPX(props) {
		return (<LogoFPX {...props} />);
	}

	static Fin(props) {
		return (<LogoFin {...props} />);
	}
	render() {
		return null;
	}

}

class LogoFPX extends FinComponent {
	static propTypes = {
		color: React.PropTypes.bool,
		size: React.PropTypes.number,
	}

	static defaultProps = {
		color: true,
		size: 1.5,
	}

	render() {
		const { size, color, style } = this.props;
		return (
			<Image source={{ uri: color ? 'fpx' : 'fpxwithoutcolor' }} style={[{ height: 200 / size, width: 480 / size }, style]} />
		);
	}
}


class LogoFin extends FinComponent {
	static propTypes = {
		color: React.PropTypes.string,
		size: React.PropTypes.number,
	}

	static defaultProps = {
		color: '#1f2143',
		size: 35,
	}

	render() {
		const { size, color, style } = this.props;
		return (
			<FIcon name={'fin'} style={[{ color, fontSize: size }, style]} />
		);
	}
}

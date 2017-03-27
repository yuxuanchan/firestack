import React from 'react';
import { Image } from 'react-native';
import FinComponent from '../finComponent';

export default class FThumbnail extends FinComponent {

	static propTypes = {
		size: React.PropTypes.number,
		circular: React.PropTypes.bool,
		square: React.PropTypes.bool,
		rectangle: React.PropTypes.bool,
		height: React.PropTypes.number,
		width: React.PropTypes.number,
	};

	static defaultProps = {
		size: 40,
		circular: true,
		square: false,
		width: 0,
		height: 0,
	}

	render() {
		const { size, square, height, width } = this.props;
		const defaultStyle = {
			borderRadius: square ? 0 : (size / 2),
			width: width === 0 ? size : width,
			height: height === 0 ? size : height,
		};

		return (
			<Image {...this.props} style={[defaultStyle, this.props.style]} />
		);
	}
}

import React from 'react';
import { View, Dimensions, Image, ScrollView } from 'react-native';
import FinComponent from '../finComponent';
import Text from './text';

const { width, height } = Dimensions.get('window');

export default class FError extends FinComponent {
	static propTypes = {
		backgroundColor: React.PropTypes.string,
	}

	static defaultProps = {
		backgroundColor: '#ffffff',
	};

	render() {
		const defaultStyle = {
			flex: 1,
			backgroundColor: this.getTheme().backgroundColor,
		};

		const { img, title, details } = this.props;

		const containerStyle = {
			marginLeft: 16,
			marginRight: 16,
			paddingTop: 100,

		};

		const imageStyle = {
			alignSelf: 'center',
			height: height / 4,
			width,
		};

		const detailText = {
			marginTop: 10,
			marginLeft: 16,
			marginRight: 16,
			textAlign: 'center',
			alignSelf: 'center',
		};

		return (
			<ScrollView style={[defaultStyle, this.props.style]}>
				<View style={containerStyle}>
					<Image style={imageStyle} source={{ uri: img }} />
					<Text.Title style={detailText}>{title}</Text.Title>
					<Text.Body style={detailText}>{details}</Text.Body>
				</View>
			</ScrollView>
		);
	}
}

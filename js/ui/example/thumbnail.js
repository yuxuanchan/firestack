import React from 'react';
import { Container, Thumbnail } from '../../ui';

export default class extends React.Component {

	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	render() {
		return (
			<Container>
				<Thumbnail source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }} />
				<Thumbnail size={80} source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }} />
				<Thumbnail circular size={80} source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }} />
				<Thumbnail square resizeMode={'repeat'} source={{ uri: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' }} />
			</Container>

		);
	}
}

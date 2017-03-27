import React from 'react';
import { Container, TextInput } from '../../ui';

export default class extends React.Component {

	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	render() {
		const inputStyle = {
			marginLeft: 16,
			marginRight: 16,
		};
		return (
			<Container>
				<TextInput placeholder={'Username'} style={inputStyle} validate={'username'} />
				<TextInput placeholder={'Phone'} style={inputStyle} validate={'phone'} />
				<TextInput placeholder={'Email'} style={inputStyle} validate={'email'} />
				<TextInput placeholder={'Time'} style={inputStyle} validate={'time'} />
				<TextInput placeholder={'Date time'} style={inputStyle} validate={'datetime'} />
				<TextInput placeholder={'Password'} style={inputStyle} validate={'password'} secureTextEntry />
				<TextInput placeholder={'Confirm password'} style={inputStyle} validate={'confirmPassword'} secureTextEntry />
			</Container>
		);
	}
}

import React, { Component } from 'react';
import Markdown from 'react-native-simple-markdown';

export default class extends Component {

	render() {
		const style = {
		};

		return (
			<Markdown styles={style}>{this.props.children}</Markdown>
		);
	}

}

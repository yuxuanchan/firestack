import React, { Component } from 'react';
import defaultTheme from './defaultTheme';

export default class extends Component {

	static propTypes = {
		theme: React.PropTypes.shape(),
	}

	static contextTypes = {
		theme: React.PropTypes.object,
	}
	static childContextTypes = {
		theme: React.PropTypes.object,
	}

	getChildContext() {
		return {
			theme: this.props.theme ? this.props.theme : this.getTheme(),
		};
	}

	getTheme() {
		return this.props.theme ? this.props.theme :
		this.context.theme || defaultTheme;
	}
}

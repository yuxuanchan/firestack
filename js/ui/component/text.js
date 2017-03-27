import React from 'react';
import { Text } from 'react-native';
import FinComponent from '../finComponent';


export default class FText extends FinComponent {

	static Display4(props) {
		return (<CreateText {...props} type={'display4'} />);
	}

	static Display3(props) {
		return (<CreateText {...props} type={'display3'} />);
	}

	static Display2(props) {
		return (<CreateText {...props} type={'display2'} />);
	}

	static Display1(props) {
		return (<CreateText {...props} type={'display1'} />);
	}

	static Headline(props) {
		return (<CreateText {...props} type={'headline'} />);
	}

	static Title(props) {
		return (<CreateText {...props} type={'title'} />);
	}

	static Subheading(props) {
		return (<CreateText {...props} type={'subheading'} />);
	}

	static Body(props) {
		return (<CreateText {...props} type={'body'} />);
	}

	static Caption(props) {
		return (<CreateText {...props} type={'caption'} />);
	}

	static Menu(props) {
		return (<CreateText {...props} type={'body'} bold />);
	}

	static Button(props) {
		return (<CreateText {...props} type={'button'}>{props.children.toUpperCase()}</CreateText>);
	}

	render() {
		const defaultStyle = {
			fontFamily: this.getTheme().fontFamily,
		};

		return (
			<Text {...this.props} style={[defaultStyle, this.props.style]} />
		);
	}

}


export class CreateText extends FinComponent {
	static propTypes = {
		bold: React.PropTypes.bool,
	};

	static defaultProps = {
		bold: false,
	};
	render() {
		const { type, bold, color, style } = this.props;
		const defaultStyle = {
			fontSize: this.getTheme().fontSize[type],
			color: color || this.getTheme().fontColor[type],
			lineHeight: this.getTheme().lineHeight[type],
			fontWeight: bold ? '500' : this.getTheme().fontWeight[type],
		};
		return (
			<FText {...this.props} style={[defaultStyle, style]} />
		);
	}
}

import React from 'react';
import { View, Modal, Dimensions } from 'react-native';
import FinComponent from '../finComponent';
import Text from './text';

const { width, height } = Dimensions.get('window');

export default class FDialog extends FinComponent {

	static Alert(props) {
		return (<DialogAlert {...props} />);
	}

	render() {
		const defaultStyle = {
			backgroundColor: '#FFFFFF',
			borderRadius: 2,
			marginLeft: 24,
			marginRight: 24,
			shadowColor: '#000000',
			shadowOpacity: 0.35,
			shadowRadius: 12,
			shadowOffset: {
				height: 15,
				width: 0,
			},
		};

		return (
			<View {...this.props} style={[defaultStyle, this.props.style]} />
		);
	}

}


class DialogAlert extends FinComponent {

	static propTypes = {
		title: React.PropTypes.string,
		description: React.PropTypes.string,
		dialogVisible: React.PropTypes.bool,
		darkBackground: React.PropTypes.bool,
	}

	static defaultProps = {
		title: '',
		description: '',
		dialogVisible: null,
		darkBackground: true,
	};

	constructor(props) {
		super(props);
		this.state = {
			dialogVisible: this.props.dialogVisible !== null ? this.props.dialogVisible : true,
		};
		// this.renderChildren = this.renderChildren.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dialogVisible !== null) {
			this.setState({
				dialogVisible: nextProps.dialogVisible,
			});
		}
	}

	renderDescription() {
		if (!this.props.description) {
			return null;
		}
		const descriptionStyle = {
			marginLeft: 24,
			marginRight: 24,
			marginBottom: 24,
		};
		return (
			<View style={descriptionStyle}>
				<Text style={{ color: '#757575', fontWeight: '400', lineHeight: 24, fontSize: 16 }}>{this.props.description}</Text>
			</View>
		);
	}

	// renderChildren() {
	// 	// onPressCtrl take control of the onPress that is 'cancel'
	// 	const onPressCtrl = (children) => {
	// 		if (children && children.props && children.props.cancel) {
	// 			return React.cloneElement(children, { onPress: () => {
	// 				this.setState({ dialogVisible: false });
	// 				if (children.props.onPress) {
	// 					children.props.onPress();
	// 				}
	// 			} });
	// 		}
	// 		return children;
	// 	};

	// 	// loop every children to use onPressCtrl
	// 	const everyChildren = (children) => {
	// 		if (Array.isArray(children)) {
	// 			return children.map((item) => {
	// 				const subchildren = onPressCtrl(item);
	// 				if (subchildren.props.children && typeof (subchildren.props.children) === 'object') {
	// 					subchildren.props.children = Object.assign(subchildren.props.children, everyChildren(subchildren.props.children));
	// 				}
	// 				return subchildren;
	// 			});
	// 		}

	// 		const newChildren = onPressCtrl(children);
	// 		if (newChildren.props && newChildren.props.children && typeof (newChildren.props.children) === 'object') {
	// 			const subchildren = everyChildren(newChildren.props.children);
	// 			newChildren.props.children = Object.assign(newChildren.props.children, subchildren);
	// 		}

	// 		return newChildren;
	// 	};

	// 	return everyChildren(this.props.children);
	// }

	renderTitle() {
		if (!this.props.title) {
			return null;
		}
		const titleStyle = {
			marginTop: 24,
			marginBottom: 20,
			marginLeft: 24,
			marginRight: 24,
		};
		return (<View style={titleStyle}><Text.Title>{this.props.title}</Text.Title></View>);
	}

	render() {
		const container = {
			position: 'absolute',
			top: 0,
			height,
			width,
			backgroundColor: this.props.darkBackground ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
			justifyContent: 'center',
			flex: 1,
			padding: 16,
		};

		return (
			<Modal
				animationType={'fade'} transparent visible={this.state.dialogVisible} {...this.props} onRequestClose={() => {
					this.setState({
						dialogVisible: false,
					});
				}}
			>
				<View style={container}>
					<FDialog>
						{this.renderTitle()}
						{this.renderDescription()}
						{this.props.children}
					</FDialog>
				</View>
			</Modal>
		);
	}
}

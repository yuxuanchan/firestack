import React from 'react';
import { View, Platform, Animated, Easing } from 'react-native';
import FinComponent from '../finComponent';
import Text from './text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RippleEffect from './rippleEffect';

export default class extends FinComponent {

	constructor(props) {
		super(props);
		this.state = {
		};
		this.onLongPress = this.onLongPress.bind(this);
		this.renderChild = this.renderChild.bind(this);
		this.startAnimation = this.startAnimation.bind(this);
		this.listLength = new Animated.Value(0);
		this.listOpacity = new Animated.Value(0);
		this.showChild = this.props.showChild;
	}
	componentWillReceiveProps(newProps) {
		this.showChild = !newProps.showChild;
		this.onLongPress();
	}

	onLongPress() {
		if (!this.showChild) {
			this.showChild = true;
			this.startAnimation();
		} else {
			this.showChild = false;
			this.listLength.setValue(0);
			this.listOpacity.setValue(0);
		}
	}
	startAnimation() {
		Animated.parallel([
			Animated.timing(this.listLength, {
				toValue: 90,
				duration: 200,
				easing: Easing.elastic(2),
			}),
			Animated.timing(this.listOpacity, {
				toValue: 1,
				duration: 50,
				delay: 50,
			}),
		]).start();
	}

	renderChild() {
		const childStyle = {
			position: 'absolute',
			zIndex: 99,
			right: 0,
			width: this.listLength,
			opacity: this.listOpacity,
		};
		return (
			<Animated.View style={[childStyle, this.props.childStyle]}>
				{this.props.child}
			</Animated.View>
		);
	}

	render() {
		const { title, subtitle, children, topRight, bottomRight, rightBottomIcons, tileHeight } = this.props;
		const containerStyle = {
			paddingLeft: 16,
			paddingRight: 16,
			minHeight: tileHeight || this.getTheme().tileHeight,
			flexDirection: 'row',
			flex: 1,
			justifyContent: 'space-between',
			alignItems: 'center',
		};

		const titleStyle = {
			marginTop: Platform.OS === 'ios' ? 0 : -6,
		};

		const rightTopStyle = {
			marginTop: Platform.OS === 'ios' ? 0 : -6,
			alignItems: 'flex-end',
		};

		const subtitleStyle = {
			marginTop: -5,
		};

		const rightBottomStyle = {
			alignItems: 'flex-end',
			marginTop: -5,
		};

		const leftChildStyle = {
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center',
			paddingTop: 4,
			paddingBottom: 4,
		};

		const rightChildStyle = {
			flexDirection: 'column',
			justifyContent: 'flex-end',
			alignItems: 'center',
			paddingTop: 4,
			paddingBottom: 4,
		};

		let contentStyle;
		const defaultContentStyle = {
			flexDirection: 'column',
			justifyContent: 'center',
		};
		let leftSide = [];
		let rightSide = [];
		let leftIndex = 0;
		let rightIndex = 0;
		if (Array.isArray(children)) {
			for (let i = 0; i < children.length; i += 1) {
				if (children[i].props.atRight) {
					rightSide[rightIndex] = (<View style={{ paddingTop: 4, paddingBottom: 4 }} key={i}>{children[i]}</View>);
					rightIndex += 1;
				} else { // if not define left or right, by default the child will be put at left side
					leftSide[leftIndex] = (<View style={{ paddingTop: 4, paddingBottom: 4 }} key={i}>{children[i]}</View>);
					leftIndex += 1;
				}
			}
			contentStyle = {
				marginLeft: 16,
				marginRight: 16,
				...defaultContentStyle,
			};
		} else if (children) {
			if (children.props.atRight) {
				rightSide = children;
				contentStyle = {
					...defaultContentStyle,
				};
			} else {
				leftSide = children;
				contentStyle = {
					marginLeft: 16,
					marginRight: 16,
					...defaultContentStyle,
				};
			}
		}

		// for (let i = 0; i < leftIndex; i += 1) {
		// 	leftSide[i] = (<View style={{ paddingTop: 4, paddingBottom: 4 }}>{leftSide[i]}</View>);
		// }

		let rightTop;
		if (topRight) {
			rightTop = (
				<View style={rightTopStyle}><Text.Subheading style={this.props.topRightFont}>{topRight}</Text.Subheading></View>
			);
		}

		let rightBottomIcon;
		if (rightBottomIcons) {
			rightBottomIcon = (<Icon name={rightBottomIcons} style={{ fontSize: 18, color: '#737373', marginRight: 8, marginTop: -10 }} />);
		}

		let rightBottom;
		if (bottomRight) {
			rightBottom = (
				<View style={rightBottomStyle}>
					<View style={{ flexDirection: 'row' }}>
						{rightBottomIcon}
						<Text.Caption style={this.props.bottomRightFont}>{bottomRight}</Text.Caption>
					</View>
				</View>
			);
		}

		let secondLine;
		if (subtitle || rightBottom) {
			secondLine = (
				<View flexDirection={'row'} justifyContent={'space-between'}>
					<View style={subtitleStyle}><Text.Caption style={this.props.subtitleFont}>{subtitle}</Text.Caption></View>
					{rightBottom}
				</View>
			);
		}

		return (
			<Animated.View style={this.props.style}>
				{this.renderChild()}

				<RippleEffect onLongPress={this.onLongPress} underlayColor={'#EDEDED'} onPress={this.props.onPress}>
					<View style={containerStyle}>
						<View style={leftChildStyle}>
							{leftSide}
						</View>
						<View flexDirection={'column'} flex={1}>
							<View style={contentStyle}>
								<View flexDirection={'row'} justifyContent={'space-between'}>
									<View style={titleStyle}>
										<Text.Subheading style={this.props.titleFont}>
											{title.length >= 30 ? `${title.substr(0, 30)}...` : title}
										</Text.Subheading>
									</View>
									{rightTop}
								</View>
								{secondLine}
							</View>
						</View>
						<View style={rightChildStyle}>{rightSide}</View>
					</View>
				</RippleEffect>

			</Animated.View>
		);
	}
}

import React from 'react';
import { View, Image, Dimensions, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';
import FinComponent from '../finComponent';
import Text from './text';
import Thumbnail from './thumbnail';
import Markdown from './markdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RippleEffect from './rippleEffect';

const { width, height } = Dimensions.get('window');
const ratio = width / height;
const imageHeight = width * ratio;
const imageWidth = height * ratio;
export default class FCard extends FinComponent {

	static Plain(props) {
		return (<CardPlain {...props} />);
	}

	static Image(props) {
		return (<CardImage {...props} />);
	}

	static Fullview(props) {
		return (<CardFullview {...props} />);
	}

	static Preview(props) {
		return (<CardPreview {...props} />);
	}

	static IconImage(props) {
		return (<CardIconImage {...props} />);
	}

	static SimpleIconImage(props) {
		return (<CardSimpleIconImage {...props} />);
	}

	static ThumbnailPreview(props) {
		return (<CardThumbnailPreview {...props} />);
	}

	static BankCard(props) {
		return (<CardBankCard {...props} />);
	}

	static FinWallet(props) {
		return (<CardFinWallet {...props} />);
	}

	static Order(props) {
		return (<CardOrder {...props} />);
	}

	static propTypes = {
		backgroundColor: React.PropTypes.string,
	}

	static defaultProps = {
		backgroundColor: '#ffffff',
	};

	render() {
		const defaultStyle = {
			margin: 8,
			backgroundColor: this.props.backgroundColor || '#ffffff',
			borderRadius: 2,
			shadowColor: '#000000',
			shadowOpacity: 0.2,
			shadowRadius: 0.9,
			shadowOffset: {
				height: 2,
				width: 0,
			},
		};

		return (
			<View elevation={2} {...this.props} style={[defaultStyle, this.props.style]} />
		);
	}

}

class CardOrder extends FinComponent {
	static propTypes = {
		thumbnail: React.PropTypes.string,
		title: React.PropTypes.string,
		onPress: React.PropTypes.func,
		subtitle: React.PropTypes.string,
		backgroundColor: React.PropTypes.string,
		size: React.PropTypes.number,
	}

	static defaultProps = {
		thumbnail: '',
		title: '',
		onPress: () => {},
		subtitle: '',
		backgroundColor: '',
		size: 60,
	};
	render() {
		const { thumbnail, title, status, account, quantity, optionTags, price, children, backgroundColor, onPress, markdown, cardStyle, size } = this.props;


		const container = {
			justifyContent: 'space-between',
			flexDirection: 'row',
			paddingTop: 16,
			paddingLeft: 16,
			paddingRight: 16,
		};

		let renderAccount = null;
		if (account) {
			renderAccount = (
				<View style={{ flexDirection: 'row' }}><Text.Body>Account: </Text.Body><Text.Body>{account}</Text.Body></View>
			);
		}

		let renderMarkdown = null;
		if (markdown) {
			renderMarkdown = (
				<View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: this.getTheme().borderColor, paddingTop: 8, marginLeft: 16, marginRight: 16, paddingBottom: 8 }}>
					<Markdown>
						{markdown}
					</Markdown>
				</View>
			);
		}
		let renderOptionsTags = null;
		if (optionTags) {
			if (optionTags.length === 1 && (optionTags[0].Name === '0' || optionTags[0].Name === '')) {
				renderOptionsTags = null;
			} else {
				renderOptionsTags = optionTags.slice().map((item, key) => (
					<View key={key} style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: '#737373', borderRadius: 2, padding: 4, marginLeft: 4, marginRight: 4, marginTop: 8 }}>
						<Text.Caption>{item.Name}</Text.Caption>
					</View>
		));
			}
		}
		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<View style={container}>
					<View style={{ flex: 1 }}>
						<TouchableWithoutFeedback onPress={onPress}><Thumbnail round size={size} source={{ uri: thumbnail }} /></TouchableWithoutFeedback>
					</View>
					<View style={{ flex: 3 }}>
						<Text.Subheading bold>{title}</Text.Subheading>
						<View style={{ flexDirection: 'row' }}><Text.Body>Status: </Text.Body><Text.Body bold style={{ color: status === 'Succeed' ? '#70D6C2' : '#FFC835' }}>{status}</Text.Body></View>
						{renderAccount}
						<View style={{ flexDirection: 'row' }}><Text.Body>Quantity: </Text.Body><Text.Body>{quantity}</Text.Body></View>
						<View style={{ flexDirection: 'row' }}><Text.Body>Price: </Text.Body><Text.Body>{price}</Text.Body></View>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginLeft: -4, marginTop: 8, marginBottom: 16 }}>{renderOptionsTags}</View>
						{children}
					</View>
				</View>
				{renderMarkdown}

			</FCard>
		);
	}
}

class CardHeaderImage extends FinComponent {
	static propTypes = {
		image: React.PropTypes.string,
		title: React.PropTypes.string,
		onPress: React.PropTypes.func,
	}

	static defaultProps = {
		image: '',
		title: '',
		onPress: () => {},
	};

	render() {
		const { image, title, onPress, imageStyle } = this.props;
		const imageTitleStyle = {
			flexDirection: 'row',
			paddingVertical: 8,
			paddingHorizontal: 8,
			justifyContent: 'center',
			alignItems: 'center',
		};
		const defaultTextStyle = {
			fontSize: 12,
			lineHeight: 14,
		};
		let renderTitle = null;
		if (title) {
			renderTitle = (
				<View style={imageTitleStyle}>
					<Text.Body style={[defaultTextStyle, this.props.textStyle]}>{title}</Text.Body>
				</View>
			);
		}
		return (
			<View style={{ overflow: 'hidden', borderRadius: 2, width: imageStyle.width }}>
				<RippleEffect onPress={onPress} rippleCircleColor={'#ffffff'}>
					<Image source={{ uri: image }} style={imageStyle} resizeMode={'cover'} />
					{renderTitle}
				</RippleEffect>
			</View>
		);
	}
}

class CardSimpleIconImage extends FinComponent {
	static propTypes = {
		image: React.PropTypes.string,
		title: React.PropTypes.string,
		onPress: React.PropTypes.func,
		backgroundColor: React.PropTypes.string,
	}

	static defaultProps = {
		image: '',
		title: '',
		onPress: () => {},
		backgroundColor: '',
	};
	render() {
		const { imageStyle, image, title, cardStyle, onPress, backgroundColor } = this.props;

		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<CardHeaderImage image={image} title={title} onPress={onPress} imageStyle={imageStyle} {...this.props} />
			</FCard>
		);
	}
}


class CardIconImage extends FinComponent {
	static propTypes = {
		image: React.PropTypes.string,
		onPress: React.PropTypes.func,
		size: React.PropTypes.number,
	}

	static defaultProps = {
		image: '',
		size: 1,
		onPress: () => {},
	};
	render() {
		const { image, onPress, size, children, title, backgroundColor, cardStyle } = this.props;

		const imageStyle = {
			height: imageHeight / size,
			width: imageWidth / size,
		};
		const bottomContainer = {
			flexDirection: 'row',
			padding: 16,
		};
		const bottomComponent = {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-around',
		};
		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<CardHeaderImage image={image} title={title} onPress={onPress} imageStyle={imageStyle} />

				<View style={bottomContainer}>
					<View style={{ flex: 1 }} />
					<View style={bottomComponent}>
						{children}
					</View>
				</View>
			</FCard>
		);
	}
}


class CardPreview extends FinComponent {
	static propTypes = {
		thumbnail: React.PropTypes.string,
		onPress: React.PropTypes.func,
		title: React.PropTypes.string,
		subtitle: React.PropTypes.string,
		text: React.PropTypes.string,
		backgroundColor: React.PropTypes.string,
		size: React.PropTypes.number,
	}

	static defaultProps = {
		thumbnail: '',
		onPress: () => {},
		title: '',
		subtitle: '',
		text: '',
		backgroundColor: '',
		size: 80,
	};
	render() {
		const { thumbnail, title, subtitle, size, children, backgroundColor, cardStyle } = this.props;


		const container = {
			justifyContent: 'space-between',
			flexDirection: 'row',
			paddingLeft: 16,
			paddingRight: 16,
		};
		const titleStyle = {
			paddingTop: 24,
			flex: 3,
		};
		const thumbnailStyle = {
			flex: 1,
			paddingTop: 16,
		};
		const bottomContainer = {
			flexDirection: 'row',
			paddingTop: 8,
			paddingBottom: 8,
		};

		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<View style={container}>
					<View style={titleStyle}>
						<Text.Title>{title}</Text.Title>
						<Text.Subheading color={'#737373'}>{subtitle}</Text.Subheading>
					</View>
					<View style={thumbnailStyle}>
						<Thumbnail square size={size} source={{ uri: thumbnail }} />
					</View>
				</View>
				<View style={bottomContainer}>
					{children}
				</View>
			</FCard>
		);
	}
}


class CardFullview extends FinComponent {
	static propTypes = {
		image: React.PropTypes.string,
		thumbnail: React.PropTypes.string,
		onPress: React.PropTypes.func,
		title: React.PropTypes.string,
		subtitle: React.PropTypes.string,
		text: React.PropTypes.string,
		backgroundColor: React.PropTypes.string,
	}

	static defaultProps = {
		image: '',
		thumbnail: '',
		onPress: () => {},
		title: '',
		subtitle: '',
		text: '',
		backgroundColor: '',
	};
	render() {
		const { image, thumbnail, title, subtitle, text, backgroundColor, children, cardStyle } = this.props;
		const headerContainer = {
			height: 72,
			padding: 16,
		};
		const headerComponent = {
			flexDirection: 'row',
		};
		const titleStyle = {
			justifyContent: 'space-around',
			marginLeft: 8,
		};
		const imageStyle = {
			height: imageHeight,
		};

		const textStyle = {
			padding: 16,
		};

		const cardBottom = {
			flexDirection: 'row',
		};

		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<View style={headerContainer}>
					<View style={headerComponent}>
						<Thumbnail circular source={{ uri: thumbnail }} />
						<View style={titleStyle}>
							<Text.Title style={{ fontSize: 16 }}>{title}</Text.Title>
							<Text.Subheading style={{ color: '#737373' }}>{subtitle}</Text.Subheading>
						</View>
					</View>
				</View>
				<Image source={{ uri: image }} style={imageStyle} />
				<View style={textStyle}><Text.Body>{text}</Text.Body></View>
				<View style={cardBottom}>
					{children}
				</View>
			</FCard>
		);
	}
}


class CardImage extends FinComponent {
	static propTypes = {
		image: React.PropTypes.string,
		onPress: React.PropTypes.func,
		title: React.PropTypes.string,
		backgroundColor: React.PropTypes.string,
	}

	static defaultProps = {
		image: '',
		onPress: () => {},
		title: '',
		backgroundColor: '',
	};

	render() {
		const { image, onPress, title, style, cardStyle, backgroundColor } = this.props;
		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<CardHeaderImage image={image} title={title} onPress={onPress} imageStyle={style} {...this.props} />
			</FCard>
		);
	}
}


class CardPlain extends FinComponent {
	static propTypes = {
		title: React.PropTypes.string,
		subtitle: React.PropTypes.string,
		text: React.PropTypes.string,
		backgroundColor: React.PropTypes.string,
	}

	static defaultProps = {
		title: '',
		subtitle: '',
		text: '',
		backgroundColor: '',
	};

	constructor(props) {
		super(props);
		this.renderSubtitle = this.renderSubtitle.bind(this);
	}

	renderSubtitle() {
		const subtitleStyle = {
			marginLeft: 16,
			marginRight: 16,
		};
		if (this.props.subtitle !== '') {
			return (
				<View style={subtitleStyle}><Text.Subheading style={{ color: '#737373' }}>{this.props.subtitle}</Text.Subheading></View>
			);
		}
		return null;
	}

	render() {
		const { title, text, children, backgroundColor, cardStyle } = this.props;

		const titleStyle = {
			marginTop: 24,
			marginBottom: 4,
			marginLeft: 16,
			marginRight: 16,
		};
		const textStyle = {
			marginTop: 8,
			marginLeft: 16,
			marginRight: 16,
			marginBottom: 16,
		};
		const cardBottom = {
			flexDirection: 'row',
			marginTop: -16,
		};
		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<View style={titleStyle}><Text.Headline>{title}</Text.Headline></View>
				{this.renderSubtitle()}
				<View style={textStyle}><Text.Body>{text}</Text.Body></View>
				<View style={cardBottom}>
					{children}
				</View>
			</FCard>
		);
	}
}

class CardThumbnailPreview extends FinComponent {
	static propTypes = {
		thumbnail: React.PropTypes.string,
		onPress: React.PropTypes.func,
		title: React.PropTypes.string,
		subtitle: React.PropTypes.string,
		size: React.PropTypes.number,
		backgroundColor: React.PropTypes.string,
		fontColor: React.PropTypes.string,
	}

	static defaultProps = {
		thumbnail: '',
		onPress: () => {},
		title: '',
		subtitle: '',
		size: 90,
		backgroundColor: '',
		fontColor: '',
	};
	render() {
		const { thumbnail, onPress, title, subtitle, size, backgroundColor, fontColor, cardStyle } = this.props;

		const styles = {
			container: {
				flexDirection: 'row',
				alignItems: 'center',
				paddingTop: 16,
				paddingBottom: 16,
				paddingLeft: 16,
				justifyContent: 'flex-start',
			},
			content: {
				marginLeft: 16,
			},
		};
		return (
			<FCard backgroundColor={backgroundColor} style={cardStyle}>
				<RippleEffect onPress={onPress} rippleCircleColor={'#ffffff'} >
					<View>
						<View style={styles.container}>
							<Thumbnail square size={size} source={{ uri: thumbnail }} />
							<View style={styles.content}>
								<Text.Title bold color={fontColor}>{title}</Text.Title>
								<Text.Body color={fontColor}>{subtitle}</Text.Body>
							</View>
						</View>
					</View>
				</RippleEffect>
			</FCard>
		);
	}
}

class CardBankCard extends FinComponent {
	static propTypes = {
		thumbnail: React.PropTypes.string,
		onPress: React.PropTypes.func,
		title: React.PropTypes.string,
		subtitle: React.PropTypes.string,
		balance: React.PropTypes.string,
		size: React.PropTypes.number,
		fontColor: React.PropTypes.string,
	}

	static defaultProps = {
		thumbnail: '',
		onPress: () => {},
		title: '',
		subtitle: '',
		balance: '',
		size: 90,
		fontColor: '',
	};
	render() {
		const { thumbnail, onPress, title, subtitle, balance, size, fontColor, backgroundColor } = this.props;

		const styles = {
			outerContainer: {
				flexDirection: 'row',
				justifyContent: 'space-between',
			},
			container: {
				flexDirection: 'row',
				alignItems: 'center',
				paddingTop: 16,
				paddingBottom: 16,
				paddingLeft: 16,
			},
			content: {
				marginLeft: 10,
				width: width > 325 ? width * 0.35 : width * 0.3,
				backgroundColor: 'transparent',
			},
			rightContainer: {
				flexDirection: 'row',
				alignItems: 'center',
				paddingRight: 16,
			},
		};
		return (
			<FCard>
				<RippleEffect onPress={onPress} rippleCircleColor={'#ffffff'} style={{ backgroundColor }}>
					<View style={styles.outerContainer}>
						<View style={styles.container}>
							<Thumbnail square size={size} source={{ uri: thumbnail }} />
							<View style={styles.content}>
								<Text.Subheading bold color={fontColor}>{subtitle}</Text.Subheading>
								<Text.Body color={fontColor}>{title}</Text.Body>
							</View>
						</View>
						<View style={styles.rightContainer}>
							<Text.Subheading bold color={fontColor}>{balance}</Text.Subheading>
						</View>
					</View>
				</RippleEffect>
			</FCard>
		);
	}
}

class CardFinWallet extends FinComponent {
	static propTypes = {
		thumbnail: React.PropTypes.string,
		backgroundImage: React.PropTypes.string,
		title: React.PropTypes.string,
		balance: React.PropTypes.string,
		leftIcon: React.PropTypes.string,
		leftButtonContent: React.PropTypes.string,
		rightIcon: React.PropTypes.string,
		rightButtonContent: React.PropTypes.string,
		size: React.PropTypes.number,
		fontColor: React.PropTypes.string,
		leftOnPress: React.PropTypes.func,
		rightOnPress: React.PropTypes.func,
	}

	static defaultProps = {
		thumbnail: '',
		backgroundImage: 'finshadow',
		title: '',
		balance: '',
		leftIcon: '',
		leftButtonContent: '',
		rightIcon: '',
		rightButtonContent: '',
		size: 80,
		fontColor: '#ffffff',
		leftOnPress: () => {},
		rightOnPress: () => {},
	};
	render() {
		const { thumbnail, backgroundImage, title, balance, leftIcon, leftButtonContent, rightIcon, rightButtonContent, size, fontColor, leftOnPress, rightOnPress } = this.props;

		const styles = {
			container: {
				flexDirection: 'row',
				justifyContent: 'space-around',
				paddingTop: 24,
				paddingBottom: 16,
			},
			backgroundImage: {
				flex: 1,
				backgroundColor: this.getTheme().finLightBlue,
				borderRadius: 2,
				resizeMode: 'stretch',
			},
			content: {
				marginTop: 8,
				backgroundColor: 'transparent',
			},
			icon: {
				color: '#fff',
				fontSize: 14,
				marginRight: 6,
			},
			buttonContainer: {
				flexDirection: 'row',
				alignSelf: 'center',
				paddingBottom: 16,
				paddingHorizontal: 4,
			},
			buttonStyle: {
				flexDirection: 'row',
				alignItems: 'center',
				margin: 4,
				paddingBottom: Platform.OS === 'ios' ? 0 : 4,
			},
		};

		return (
			<FCard>
				<Image source={{ uri: backgroundImage }} style={styles.backgroundImage} >
					<View style={styles.container}>
						<Thumbnail square size={size} source={{ uri: thumbnail }} />
						<View style={styles.content}>
							<Text.Body color={fontColor}>{title}</Text.Body>
							<View style={{ paddingTop: 4 }}><Text.Display2 color={fontColor}>{balance}</Text.Display2></View>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<View style={{ marginRight: 16 }}>
							<RippleEffect onPress={leftOnPress} rippleCircleColor={'#ffffff'} >
								<View style={styles.buttonStyle}>
									<Icon name={leftIcon} style={styles.icon} />
									<Text.Caption color={fontColor}>{leftButtonContent}</Text.Caption>
								</View>
							</RippleEffect>
						</View>
						<View style={{ marginLeft: 16 }}>
							<RippleEffect onPress={rightOnPress} rippleCircleColor={'#ffffff'}>
								<View style={styles.buttonStyle}>
									<Icon name={rightIcon} style={styles.icon} />
									<Text.Caption color={fontColor}>{rightButtonContent}</Text.Caption>
								</View>
							</RippleEffect>
						</View>
					</View>
				</Image>
			</FCard>
		);
	}
}

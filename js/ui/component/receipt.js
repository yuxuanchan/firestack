import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import FinComponent from '../finComponent';
import Text from './text';
import RippleEffect from './rippleEffect';

const { width } = Dimensions.get('window');

export default class FReceipt extends FinComponent {

	static Receipt(props) {
		return (<CardReceipt {...props} />);
	}

	static Expense(props) {
		return (<CardExpense {...props} />);
	}

	static propTypes = {
		backgroundColor: React.PropTypes.string,
	}

	static defaultProps = {
		backgroundColor: '#ffffff',
	};

	render() {
		this.triangleDiameter = (width - 16) / 40;

		const wrapperStyle = {
			margin: 8,
		};

		const defaultStyle = {
			marginTop: 8,
			backgroundColor: this.props.backgroundColor,
		};

		const upLeftTriangle = {
			marginBottom: 8,
			borderTopWidth: this.triangleDiameter,
			borderRightWidth: this.triangleDiameter,
			borderBottomWidth: 0,
			borderLeftWidth: 0,
			borderTopColor: '#ffffff',
			borderRightColor: 'transparent',
			borderBottomColor: 'transparent',
			borderLeftColor: 'transparent',
		};

		const upRightTriangle = {
			marginBottom: 8,
			borderTopWidth: 0,
			borderRightWidth: this.triangleDiameter,
			borderBottomWidth: this.triangleDiameter,
			borderLeftWidth: 0,
			borderTopColor: 'transparent',
			borderRightColor: '#ffffff',
			borderBottomColor: 'transparent',
			borderLeftColor: 'transparent',
		};

		const images = [];
		for (const i = 0; i < Math.ceil(((width - 16) / this.triangleDiameter) / 2); i++) {
			images.push((
				<View style={{ flexDirection: 'row' }} key={i}>
					<View style={upLeftTriangle} />
					<View style={upRightTriangle} />
				</View>
			));
		}

		return (
			<View style={wrapperStyle}>
				<View {...this.props} style={[defaultStyle, this.props.style]} />
				<View style={{ flexDirection: 'row' }}>{images}</View>
			</View>
		);
	}

}

class CardExpense extends FinComponent {
	render() {
		const { children } = this.props;

		const containerStyle = {
			paddingBottom: 4,
		};

		return (
			<FReceipt>
				<View style={{ paddingBottom: 32 }}>
					<View style={[containerStyle, this.props.style]}>
						{children}
					</View>
				</View>
			</FReceipt>
		);
	}
}


class CardReceipt extends FinComponent {
	constructor(props) {
		super(props);
		this.renderOriginalPrice = this.renderOriginalPrice.bind(this);
	}

	renderOriginalPrice() {
		if (this.props.originalPrice !== this.props.totalPrice) {
			return (
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={{ width: width / 2 }}><Text.Body style={{ textAlign: 'right' }}>ORIGINAL PRICE (inc. GST)</Text.Body></View>
					<View style={{ width: width / 4 }}><Text.Body style={{ textDecorationLine: 'line-through', textAlign: 'right' }}>{this.props.originalPrice}</Text.Body></View>
				</View>
			);
		}
		return null;
	}

	render() {
		const { status, bank, date, transactionID, children, totalPrice, statusColor, onPress } = this.props;

		const containerStyle = {
			paddingBottom: 4,
		};

		const sectionStyle = {
			paddingTop: 16,
			paddingBottom: 16,
			paddingLeft: 32,
			paddingRight: 32,
		};

		const contentStyle = {
			flexDirection: 'row',
			justifyContent: 'space-between',
		};

		const hr = {
			marginLeft: 32,
			marginRight: 32,
			backgroundColor: '#DFE0E5',
			height: StyleSheet.hairlineWidth,
		};

		return (
			<FReceipt>

				<View style={{ paddingBottom: 32 }}>
					<View style={containerStyle}>
						<View style={sectionStyle}>
							<View style={contentStyle}>
								<Text.Subheading>Status</Text.Subheading>
								<Text.Body bold style={{ color: statusColor }}>{status}</Text.Body>
							</View>
							<View style={contentStyle}>
								<Text.Subheading>Bank</Text.Subheading><Text.Body>{bank}</Text.Body>
							</View>
							<View style={contentStyle}>
								<Text.Subheading>Date</Text.Subheading><Text.Body>{date}</Text.Body>
							</View>
							<View style={contentStyle}>
								<Text.Subheading>Transaction ID</Text.Subheading><Text.Body>{transactionID}</Text.Body>
							</View>
						</View>
						<View style={hr} />
						<RippleEffect onPress={onPress} rippleCircleColor={'#ffffff'}>
							<View style={sectionStyle}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text.Subheading bold>Items</Text.Subheading>
									<Text.Caption color={'#6BB1E2'}>View Details</Text.Caption>
								</View>
								{children}
							</View>
						</RippleEffect>
						<View style={hr} />

						<View style={sectionStyle}>
							{this.renderOriginalPrice()}
							<View style={contentStyle}>
								<View style={{ width: width / 2 }}><Text.Body style={{ textAlign: 'right' }}>TOTAL PRICE (inc. GST)</Text.Body></View>
								<View style={{ width: width / 4 }}><Text.Body bold style={{ textAlign: 'right' }}>{totalPrice}</Text.Body></View>
							</View>
						</View>
						<View style={hr} />
						<View style={[hr, { marginTop: 4 }]} />

					</View>
				</View>

			</FReceipt>
		);
	}
}

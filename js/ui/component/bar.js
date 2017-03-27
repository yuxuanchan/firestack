import React from 'react';
import { View, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import Text from './text';
import FinComponent from '../finComponent';

const barMaxHeight = 150;
const barWidth = 40;

export default class FBar extends FinComponent {

	constructor(props) {
		super(props);
		this.state = {
			barHeight: 0,
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				barHeight: this.props.ratio * barMaxHeight,
			});
		}, 500);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			barHeight: nextProps.ratio * barMaxHeight,
		});
	}

	componentWillUpdate() {
		LayoutAnimation.easeInEaseOut();
	}

	render() {
		// const { spending, budget, ratio, onPress, spendingBarColor, barBorderColor } = this.props;
		// const barHeight = ratio * barMaxHeight;
		// let budgetHeight = 0;
		// let spendingHeight = 0;
		// if (spending > budget) {
		// 	spendingHeight = barHeight;
		// 	budgetHeight = (budget / spending) * spendingHeight;
		// } else {
		// 	budgetHeight = barHeight;
		// 	spendingHeight = (spending / budget) * budgetHeight;
		// }

		// const barBorder = {
		// 	width: barWidth,
		// 	marginLeft: 15,
		// 	height: barHeight,
		// };

		// const budgetBar = {
		// 	backgroundColor: 'transparent',
		// 	borderColor: barBorderColor,
		// 	borderWidth: 1.5,
		// 	width: barWidth,
		// 	height: budgetHeight,
		// 	borderStyle: 'dashed',
		// 	marginTop: spending > budget ? spendingHeight - budgetHeight : 0,
		// };

		// const spendingBar = {
		// 	height: spendingHeight,
		// 	marginTop: -(spendingHeight),
		// 	backgroundColor: spendingBarColor,
		// 	width: barWidth,
		// 	position: 'absolute',
		// 	zIndex: -1,
		// 	left: 15,
		// };

		// return (
		// 	<View style={{ justifyContent: 'flex-end' }}>
		// 		<TouchableWithoutFeedback onPress={onPress}>
		// 			<View>
		// 				<View style={[barBorder, this.props.barBorder]}>
		// 					<View style={[budgetBar, this.props.budgetBar]} />
		// 				</View>
		// 				<View style={[spendingBar, this.props.spendingBar]} />
		// 			</View>
		// 		</TouchableWithoutFeedback>
		// 	</View>
		// );

		const { onPress, spendingBarColor, percentage } = this.props;
		const barBorder = {
			width: barWidth,
			marginLeft: 8,
			marginRight: 8,
			height: this.state.barHeight,
		};

		const budgetBar = {
			backgroundColor: 'transparent',
			borderColor: 'transparent',
			borderWidth: 1.5,
			width: barWidth,
			height: 0,
			borderStyle: 'dashed',
			marginTop: this.state.barHeight,
		};

		const spendingBar = {
			height: this.state.barHeight,
			marginTop: -(this.state.barHeight),
			backgroundColor: spendingBarColor,
			width: barWidth,
			position: 'absolute',
			zIndex: -1,
			left: 8,
		};

		return (
			<View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
				<Text.Body>{percentage}%</Text.Body>
				<TouchableWithoutFeedback onPress={onPress}>
					<View>
						<View style={[barBorder, this.props.barBorder]}>
							<View style={[budgetBar, this.props.budgetBar]} />
						</View>
						<View style={[spendingBar, this.props.spendingBar]} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		);
	}
}


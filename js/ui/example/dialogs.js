import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Dialogs, Text, Button } from '../../ui';

export default class extends React.Component {
	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	constructor(props) {
		super(props);
		this.state = {
			dialogVisible: false,
		};
		this.setVisibility = this.setVisibility.bind(this);
	}

	componentWillUnmount() {
		this.setState({
			dialogVisible: false,
		});
	}

	setVisibility(visible) {
		this.setState({
			dialogVisible: visible,
		});
	}

	render() {
		return (
			<Container backgroundColor={'#EEEEEE'}>
				<TouchableOpacity onPress={() => { this.setVisibility(true); }}>
					<Text.Title bold>Alerts with title bars </Text.Title>
					<Dialogs.Alert
						dialogVisible={this.state.dialogVisible}
						title={'This is title'}
						description={'Add some description.'}
					>
						<View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
							<Button.Flat text={'CANCEL'} onPress={() => { this.setVisibility(false); }} />
							<Button.Flat text={'OKAY'} onPress={() => { this.setVisibility(false); }} />
						</View>
					</Dialogs.Alert>
				</TouchableOpacity>
			</Container>
		);
	}
}

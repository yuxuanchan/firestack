import React from 'react';
import { Modal, Container, Button, Text, Thumbnail, TextInput } from '../../ui';
import { View, Dimensions, ScrollView, Platform, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
/*
	<Modal visible={this.state.modalVisible}>
		Header View (only one View)
			<View>
			</View>
		The rest of the modal Componenets ( body - footer ) ~NO LIMIT
			<Container/>
			<View/>
	</Modal>
*/
export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.originalHeight = height / 1.7;
	}
	setModalVisible() {
		if (!this.state.modalVisible) {
			this.setState({ modalVisible: true });
		} else {
			this.setState({ modalVisible: false });
		}
	}
	render() {
		const header = {
			flexDirection: 'row',
		};
		const body = {
			flex: 4,
		};
		const footer = {
		};
		const iconContainer = {
			marginLeft: 16,
			marginTop: -16,
			marginRight: 16,

		};

		return (
			<Container>
				<Button.Float style={{ top: 0, left: 150 }} buttonColor={'#5EB2E0'} iconName={'add'} iconColor={'#ffffff'} onPress={() => this.setModalVisible(!this.state.modalVisible)} />
				<Modal visible={this.state.modalVisible}>
					<View style={header}>
						<View style={iconContainer}>
							<Thumbnail size={80} square source={{ uri: 'https://t3.ftcdn.net/jpg/00/72/99/58/240_F_72995894_dNS8i0lRTwH6bPzqgbVvFiicjisizMNS.jpg' }} />
						</View>
						<View >
							<Text.Title bold>RM {260}</Text.Title>
							<Text.Caption>Stock {17}</Text.Caption>
						</View>
					</View>
					<View style={body}>
						<Container >
							<TextInput placeholder={'Username'} style={{ paddingHorizontal: 16 }} validate={'username'} />
							<TextInput placeholder={'Username'} style={{ paddingHorizontal: 16 }} validate={'username'} />
						</Container>
					</View>
					<View style={footer}>
						<Button.Raised text={'Buy Now'} onPress={() => { console.log('clicked'); }} />
					</View>
				</Modal>
			</Container>
		);
	}
}

import React from 'react';
import { View, Dimensions, Animated, ScrollView, Modal, Easing, Keyboard, Platform } from 'react-native';
import FinComponent from '../../ui/finComponent';

const { width, height } = Dimensions.get('window');


export default class extends FinComponent {

	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			formOpacity: '',
		};
		this.setModalVisible = this.setModalVisible.bind(this);
		this.onResponderMove = this.onResponderMove.bind(this);
		this.onResponderRelease = this.onResponderRelease.bind(this);
		this.onResponderGrant = this.onResponderGrant.bind(this);
		this.updateNativeStyles = this.updateNativeStyles.bind(this);
		this.keyboardDidShown = this.keyboardDidShown.bind(this);
		this.formOpacity = new Animated.Value(0);
		this.originalHeight = height / 1.7;
		this.locationY = 0;
		this.formStyles = { style: { height } };
		this.formHeight = new Animated.Value(this.originalHeight);
		this.state.formOpacity = this.formOpacity.interpolate({
			inputRange: [0, 1],
			outputRange: ['transparent', 'rgba(0,0,0,0.6)'],
		});
	}
	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShown);
	}
	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
	}
	keyboardDidShown() {
		if (Platform.OS === 'ios') {
			Animated.timing(this.formHeight, {
				toValue: height - 75,
				duration: 200,
			}).start();
		}
	}
	componentDidMount() {
		this.updateNativeStyles();
	}
	componentWillReceiveProps(newProps) {
		if (newProps.visible !== this.props.visible) {
			this.setModalVisible();
		}
	}
	setModalVisible() {
		if (!this.state.modalVisible) {
			this.setState({ modalVisible: true });
			this.swiper && this.swiper.stopAutoplay();
			Animated.timing(this.formOpacity, {
				toValue: 1,
				duration: 200,
				delay: 500,
			}).start();
		} else {
			this.setState({ modalVisible: false });
			this.formOpacity.setValue(0);
			this.formHeight.setValue(this.originalHeight);
			this.swiper && this.swiper.startAutoplay();
		}
	}

	onResponderMove(e) {
		const { pageY, locationY } = e.nativeEvent;
		// (iOS) save user first touch to add to the modal height and update modal height style
		if (Platform.OS === 'ios') {
			if (this.locationY === 0) {
				this.locationY = locationY;
			}
			this.formStyles.style.height = (height - pageY) + this.locationY;
		}
		// (Android) save user first touch to add to the modal height and update modal height style
		if (Platform.OS === 'android') {
			console.log(pageY, locationY);
			this.formStyles.style.height = (height - pageY) + locationY;
		}

		if (this.formStyles.style.height < height) {
			this.updateNativeStyles();
		}
		this.target = false;

		// check if drag over the closing modal limit and reduce opacity up to 0
		const limit = this.originalHeight + locationY;
		if (pageY > limit) {
			Animated.timing(this.formOpacity, {
				toValue: 0,
				duration: 500,
			}).start();
			this.target = true;
		}
		// check if drag down, (yes)=>increase || decrease opacity
		const newOriginalHeight = (height - this.originalHeight) + this.locationY;
		if (pageY > newOriginalHeight) {
			if (pageY < limit) {
				Animated.timing(this.formOpacity, {
					toValue: 0.5,
					duration: 500,
				}).start();
			}
		} else {
			Animated.timing(this.formOpacity, {
				toValue: 1,
				duration: 500,
			}).start();
		}
	}
	onResponderRelease(e) {
		// check if drag down, (yes)=>return modal height to original height and increase opacity
		const { pageY } = e.nativeEvent;
		const newOriginalHeight = this.formStyles.style.height - pageY;
		if (pageY > newOriginalHeight) {
			this.formHeight.setValue(this.formStyles.style.height);
			Animated.parallel([
				Animated.timing(this.formHeight, {
					toValue: this.originalHeight,
					duration: 300,
					easing: Easing.elastic(1.2),
				}),
				Animated.timing(this.formOpacity, {
					toValue: 1,
					duration: 300,
				}),
			]).start();
			this.formStyles.style.height = height / 1.7;
		} else {
			// drag up set height to full screen
			this.formHeight.setValue(this.formStyles.style.height);
			Animated.timing(this.formHeight, {
				toValue: height - 75,
				duration: 150,
			}).start();
			this.formStyles.style.height = height - 75;
		}

		// check if reach closing modal limit
		if (this.target) {
			this.formOpacity.setValue(0);
			setTimeout(() => { // fix backgroundColor late response to animation ( android )
				this.setModalVisible();
			}, 10);
			this.target = false;
		}
		// reset first touch
		this.locationY = 0;
	}
	updateNativeStyles() {
		this.form && this.form.setNativeProps(this.formStyles);
	}
	onResponderGrant() {
		this.setModalVisible();
	}
	render() {
		const styles = {
			container: {
				flex: 1,
				backgroundColor: this.state.formOpacity,
			},
			formContainer: {
				position: 'absolute',
				bottom: 0,
				backgroundColor: '#ffffff',
				width,
				height: this.formHeight,
				flex: 1,
			},
			header: {
				position: 'absolute',
				left: 0,
				top: 0,
				right: 0,
				backgroundColor: 'transparent',
				height: 80,
				zIndex: 99,
			},
		};

		return (
			<Modal animationType={'slide'} transparent visible={this.state.modalVisible} onRequestClose={() => { this.setModalVisible(); }}>
				<Animated.View style={styles.container} >
					<View style={{ flex: 1 }} onStartShouldSetResponder={() => true} onResponderGrant={this.onResponderGrant} />
					<Animated.View ref={(i) => { this.form = i; }} style={styles.formContainer} >
						<View style={{ flex: 1 }}>
							<View
								style={styles.header}
								onStartShouldSetResponder={() => true}
								onResponderMove={this.onResponderMove}
								onResponderRelease={this.onResponderRelease}
							/>
							{/*
								 { Platform.select({
								android: <Animated.View
									style={{ height: 15, backgroundColor: this.state.formOpacity }}
								/>,
							}) }
							*/}
							{this.props.children}
						</View>
					</Animated.View>
				</Animated.View>
			</Modal>
		);
	}
}

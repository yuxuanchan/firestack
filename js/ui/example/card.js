import React from 'react';
import { View } from 'react-native';
import { Container, Card, Button } from '../../ui';

export default class extends React.Component {
	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	render() {
		return (
			<Container style={{ backgroundColor: '#EEEEEE' }}>
				<Card.ThumbnailPreview thumbnail={'https://material.angularjs.org/latest/img/100-2.jpeg'} title={'Alidawud***'} size={60} backgroundColor={'red'} fontColor={'#fff'} subtitle={'CIMB '} onPress={() => console.log(1)} />
				<Card.Plain title={'Title goes here'} subtitle={'There is no one who loves pain itself'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium augue eget eros fermentum, quis euismod diam suscipit. Nunc commodo orci sit amet bibendum vestibulum. Donec vulputate lorem mi, sit amet bibendum odio vehicula in. In ullamcorper porttitor lorem, et lacinia est feugiat vitae. Praesent at posuere velit. Praesent diam odio, iaculis a malesuada vitae, fermentum sed nibh. Fusce sed metus ut justo malesuada maximus. Vestibulum ac facilisis risus. Aenean at tristique massa, dignissim feugiat risus.'} >
					<Button.Flat text={'ACTION 1'} buttonTextColor={'#4D4D4D'} style={{ }} onPress={() => console.log('clicked')} />
					<Button.Flat text={'ACTION 2'} buttonTextColor={'#4D4D4D'} style={{ }} onPress={() => console.log('clicked')} />
				</Card.Plain>

				<Card.Image image={'https://material.angularjs.org/latest/img/washedout.png'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium augue eget eros fermentum, quis euismod diam suscipit. Nunc commodo orci sit amet bibendum vestibulum. Donec vulputate lorem'} />

				<Card.Fullview thumbnail={'https://material.angularjs.org/latest/img/100-2.jpeg'} image={'https://material.angularjs.org/latest/img/washedout.png'} title={'Title'} subtitle={'Subhead'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium augue eget eros fermentum, quis euismod diam suscipit. Nunc commodo orci sit amet bibendum vestibulum. Donec vulputate lorem'}>
					<Button.Flat text={'ACTION 1'} buttonTextColor={'#4D4D4D'} style={{ }} onPress={() => console.log('clicked')} />
					<Button.Flat text={'ACTION 2'} buttonTextColor={'#4D4D4D'} style={{ }} onPress={() => console.log('clicked')} />
				</Card.Fullview>

				<Card.Preview thumbnail={'https://material.angularjs.org/latest/img/100-2.jpeg'} title={'Title here'} subtitle={'Subtitle here'}>
					<Button.Flat text={'ACTION 1'} buttonTextColor={'#4D4D4D'} style={{ }} onPress={() => console.log('clicked')} />
					<Button.Flat text={'ACTION 2'} buttonTextColor={'#4D4D4D'} style={{ }} onPress={() => console.log('clicked')} />
				</Card.Preview>

				<Card.IconImage image={'https://material.angularjs.org/latest/img/washedout.png'} >
					<Button.Icon iconName={'favorite'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
					<Button.Icon iconName={'bookmark'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
					<Button.Icon iconName={'share'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
				</Card.IconImage>

				<View style={{ flexDirection: 'row' }}>
					<Card.SimpleIconImage image={'https://www.brightedge.com/blog/wp-content/uploads/2016/02/HTTPs.jpg'} title={'Title'} style={{ color: '#FFFFFF' }}>
						<Button.Icon iconName={'favorite'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
						<Button.Icon iconName={'bookmark'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
						<Button.Icon iconName={'share'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
					</Card.SimpleIconImage>
					<Card.SimpleIconImage image={'https://www.brightedge.com/blog/wp-content/uploads/2016/02/HTTPs.jpg'} title={'Title'} style={{ color: '#FFFFFF' }}>
						<Button.Icon iconName={'favorite'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
						<Button.Icon iconName={'bookmark'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
						<Button.Icon iconName={'share'} iconColor={'#737373'} onPress={() => console.log('clicked')} />
					</Card.SimpleIconImage>
				</View>

			</Container>

		);
	}
}

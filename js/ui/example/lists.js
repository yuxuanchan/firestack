import React from 'react';
import { View } from 'react-native';

import { Container, List, Thumbnail, Icon } from '../../ui';
export default class extends React.Component {
	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	render() {
		return (
			<Container>
				<View>
					<List title={'One-line item'} onPress={() => { console.log('clicked'); }} />


					<List title={'Photos'} onPress={() => { console.log('clicked'); }}>
						<Icon atRight name={'info'} size={24} color={'#B9B9B9'} />
					</List>

					<List title={'Photos'} subtitle={'Jan 9, 2014'} onPress={() => { console.log('clicked'); }}>
						<Thumbnail atLeft circular source={{ uri: 'https://material.angularjs.org/latest/img/list/60.jpeg?20' }} />
					</List>


					<List title={'One-line item'} subtitle={'RM92.70'} status={'Succeed'} date={'02/12/2016'} onPress={() => { console.log('clicked'); }} />


					<List title={'Photos'} subtitle={'Jan 9, 2014'} onPress={() => { console.log('clicked'); }}>
						<Thumbnail atLeft circular source={{ uri: 'https://material.angularjs.org/latest/img/list/60.jpeg?20' }} />
						<Icon atRight name={'info'} size={24} color={'#B9B9B9'} />
					</List>


					<List title={'Photos'} subtitle={'RM92.70'} status={'Succeed'} date={'02/12/2016'} onPress={() => { console.log('clicked'); }}>
						<Thumbnail atLeft circular source={{ uri: 'https://material.angularjs.org/latest/img/list/60.jpeg?20' }} />
						<Icon atRight name={'keyboard-arrow-down'} size={24} color={'#B9B9B9'} />
					</List>

					<List title={'Photos'} subtitle={'RM92.70'} status={'Succeed'} date={'02/12/2016'} onPress={() => { console.log('clicked'); }}>
						<Thumbnail atLeft circular source={{ uri: 'https://material.angularjs.org/latest/img/list/60.jpeg?20' }} />
						<Icon atRight name={'keyboard-arrow-down'} size={24} color={'#B9B9B9'} />
						<Thumbnail circular source={{ uri: 'https://material.angularjs.org/latest/img/list/60.jpeg?20' }} />
					</List>
				</View>
			</Container>
		);
	}
}

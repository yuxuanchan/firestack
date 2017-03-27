import React from 'react';
import { Container, ProgressCircle } from '../../ui';


export default class extends React.Component {
	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	render() {
		return (
			<Container>
				<ProgressCircle spinDuration={2000} color={'#66B0DF'} />
			</Container>
		);
	}
}

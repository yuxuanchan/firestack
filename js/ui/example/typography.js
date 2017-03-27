import React from 'react';
import { Container, Text } from '../../ui';

export default class extends React.Component {
	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	render() {
		return (
			<Container>

				<Text.Display4>Light 112sp</Text.Display4>

				<Text.Display3>Regular 56sp, Leading 48dp</Text.Display3>

				<Text.Display2>Regular 45sp, Leading 40dp</Text.Display2>

				<Text.Display1>Regular 34sp</Text.Display1>

				<Text.Headline>Regular 24sp</Text.Headline>

				<Text.Title>Medium 20sp</Text.Title>

				<Text.Subheading>Regular 16sp</Text.Subheading>

				<Text.Body bold>Medium 14sp</Text.Body>

				<Text.Body>Regular 14sp Regular 14sp  Regular 14sp  Regular 14sp Regular 14sp Regular 14sp Regular 14sp Regular 14sp Regular 14sp Regular 14sp Regular 14sp Regular 14sp Regular 14sp</Text.Body>

				<Text.Caption>Regular 12sp</Text.Caption>

				<Text.Menu>Menu 12sp</Text.Menu>

				<Text.Button>Medium (ALL CAPS) 14sp</Text.Button>


			</Container>

		);
	}
}

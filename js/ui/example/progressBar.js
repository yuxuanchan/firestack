import React from 'react';
import { Container, ProgressBar } from '../../ui';

export default class extends React.Component {

	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	constructor(props) {
		super(props);
		this.state = { progress: 30 };
	}


	render() {
		setTimeout((() => {
			this.setState({ progress: this.state.progress + (50 * Math.random())});
		}), 1000);

		return (
			<Container>
				<ProgressBar.Determinate progress={this.state.progress} style={{ marginTop: 20, marginBottom: 20}} />
                <ProgressBar.Indeterminate />
			</Container>
		);
	}
}

import React from 'react';
import { Button } from '../../ui';
import Toolbar from '../../ui/component/toolBar';

export default class extends React.Component {
	static route = {
		navigationBar: {
			title: 'Home',
		},
	};

	render() {
		return (
			<Toolbar buttonColor={'#FF4081'} iconName={'share'} iconColor={'#F2F2F2'} onPress={() => console.log('clicked')}>
				<Button.Group>
					<Button.ToolbarButton disable iconName={'crop-free'} text={'Scan'} />
					<Button.ToolbarButton iconName={'account-circle'} text={'Account'} onPress={() => console.log('clicked')} />
					<Button.ToolbarButton iconName={'payment'} text={'Wallet'} onPress={() => console.log('clicked')} />
					<Button.ToolbarButton iconName={'receipt'} text={'Receipts'} />
				</Button.Group>

				<Button.Flat text={'Flat'} onPress={() => console.log('clicked')} />
				<Button.Flat disable text={'Flat'} onPress={() => console.log('clicked')} />
				<Button.Raised text={'Raised'} onPress={() => console.log('clicked')} />
				<Button.Raised disable text={'Raised'} onPress={() => console.log('clicked')} />
				<Button.Float iconName={'add'} iconColor={'#fff'} style={{ alignItems: 'center', margin: 16 }} onPress={() => console.log('clicked')} />
				<Button.Float disable iconName={'add'} iconColor={'#fff'} style={{ alignItems: 'center', margin: 16 }} onPress={() => console.log('clicked')} />
				<Button.Icon iconSize={24} iconName={'favorite'} iconColor={'green'} style={{ alignItems: 'center', margin: 16 }} onPress={() => { console.log('hi'); }} />
				<Button.Icon disable iconSize={24} iconName={'favorite'} iconColor={'green'} style={{ alignItems: 'center', margin: 16 }} onPress={() => { console.log('hi'); }} />

			</Toolbar>
		);
	}
}

import React, { Component } from 'react';
import { View } from 'react-native';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import Router from './router';

export default class extends Component {
	render() {
		return (
			<NavigationProvider router={Router}>
				<StackNavigation initialRoute={Router.getRoute('sign')} />
			</NavigationProvider>
		);
	}
}

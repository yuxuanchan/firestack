import React, { Component } from 'react';
import { WebView } from 'react-native';


const defaultJS = `

function FinPay_PostMessage(data) {
	__REACT_WEB_VIEW_BRIDGE.postMessage(JSON.stringify(data));
}

document.addEventListener('message', function(e) {
	if (typeof FinPay_ReceiveMessage !== "undefined") {
		FinPay_ReceiveMessage(JSON.parse(e.data));
	}
});

`;


export default class FWebView extends Component {

	static propTypes = {
		onMessage: React.PropTypes.func,
		injectedJavaScript: React.PropTypes.string,
	}

	static defaultProps = {
		onMessage: () => {},
		injectedJavaScript: '',
	}

	constructor(props) {
		super(props);
		this.postMessage = this.postMessage.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.reload = this.reload.bind(this);
		this.stopLoading = this.stopLoading.bind(this);
		this.goBack = this.goBack.bind(this);
		this.goForward = this.goForward.bind(this);
	}

	onMessage(e) {
		const data = e.nativeEvent.data;
		if (data && data !== '') {
			this.props.onMessage(JSON.parse(data));
		}
	}

	postMessage(data) {
		const jsonData = JSON.stringify(data);
		this.webview.postMessage(jsonData);
	}

	reload() {
		this.webview.reload();
	}

	stopLoading() {
		this.webview.stopLoading();
	}

	goBack() {
		this.webview.goBack();
	}

	goForward() {
		this.webview.goForward();
	}

	render() {
		return (
			<WebView {...this.props} domStorageEnabled injectedJavaScript={defaultJS + this.props.injectedJavaScript} onMessage={this.onMessage} ref={(i) => { this.webview = i; }} />
		);
	}

}

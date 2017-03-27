import React, { Component } from 'react';
import WKWebView from 'react-native-wkwebview-reborn';

const defaultJS = `

function FinPay_PostMessage(data) {
	window.webkit.messageHandlers.reactNative.postMessage(data);
}

// Message Receiver for WKWebView
window.receivedMessageFromReactNative = function(data) {
	if (typeof FinPay_ReceiveMessage !== "undefined") { 
		FinPay_ReceiveMessage(JSON.parse(data));
	}
}

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
		const data = e.body;
		if (data && typeof data === 'object') {
			this.props.onMessage(data);
		}
	}

	postMessage(data) {
		const jsonData = JSON.stringify(data);
		this.webview.evaluateJavaScript(`receivedMessageFromReactNative('${jsonData}')`);
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
			<WKWebView {...this.props} injectedJavaScript={defaultJS + this.props.injectedJavaScript} onMessage={this.onMessage} ref={(i) => { this.webview = i; }} />
		);
	}

}

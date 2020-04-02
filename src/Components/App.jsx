// Libraries
import React from 'react';

// Components
import Clock from './Clock';
import Settings from './Settings';
import Modal from './Modal';

// Images
const bgImg = require('../images/background.png');

// Constants
import C from '../constants';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentClock: C.DEFAULT_CLOCK,
			currentSetting: C.DEFAULT_SETTING,
			sessionMins: C.DEFAULT_SESSION,
			breakMins: C.DEFAULT_BREAK,
			paused: true
		};

		this.handlePause = this.handlePause.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleSettingSwitch = this.handleSettingSwitch.bind(this);
		this.handleSettingUpdate = this.handleSettingUpdate.bind(this);
		this.handleModal = this.handleModal.bind(this);
	}
	handlePause(paused) {
		console.log('App handlePause - paused: ', paused);
		this.setState({
			paused: paused
		});
	}
	handleReset(currentClock) {
		console.log('handleReset called for currentClock: ', currentClock);
	}
	handleSettingSwitch(currentSetting) {
		this.setState({
			currentSetting: currentSetting
		});
	}
	handleSettingUpdate(currentSetting, mins) {
		currentSetting === 'SESSION'
			? this.setState({
					sessionMins: mins
				})
			: this.setState({
					breakMins: mins
				});
	}
	handleModal() {
		console.log('handleModal');
	}
	render() {
		return (
			<div className="app-wrapper centered" style={{ backgroundImage: `url(${bgImg})` }}>
				<h1>Pomodoro Clock</h1>
				<Clock currentClock={this.state.currentClock} onPause={this.handlePause} onReset={this.handleReset} />
				<Settings
					paused={this.state.paused}
					currentSetting={this.state.currentSetting}
					sessionMins={this.state.sessionMins}
					breakMins={this.state.breakMins}
					onSettingSwitch={this.handleSettingSwitch}
					onSettingUpdate={this.handleSettingUpdate}
				/>
				<Modal onModal={this.handleModal} />
			</div>
		);
	}
}

export default App;

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
			currentTimer: C.DEFAULT_TIMER,
			currentSetting: C.DEFAULT_SETTING,
			sessionMins: C.DEFAULT_SESSION,
			breakMins: C.DEFAULT_BREAK,
			paused: true,
			currentMins: 0,
			currentSecs: 0
		};

		this.handlePause = this.handlePause.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleSettingSwitch = this.handleSettingSwitch.bind(this);
		this.handleSettingUpdate = this.handleSettingUpdate.bind(this);
		this.handleModal = this.handleModal.bind(this);

		this.setTimer = this.startTimer.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.updateTimer = this.updateTimer.bind(this);
	}
	handlePause(paused) {
		console.log('App handlePause - paused: ', paused);
		this.setState({
			paused: paused
		});
	}
	handleReset() {
		console.log('handleReset called for currentTimer: ', this.state.currentTimer);
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

	setTimer() {
		this.props.currentClock === 'SESSION' ? (mins = sessionMins) : (mins = breakMins);
	}
	startTimer() {
		let interval = setInterval(this.updateTimer(), 1000); //milliseconds
	}
	updateTimer() {
		let { currentMins, currentSecs } = this.state;

		console.log('updateTimer');

		if (currentMins === 0 && currentSecs === 0) {
			// beep_sfx.play();
			// swtichTimer();
		}
		if (currentSecs === 0 && currentMins > 0) {
			currentMins--;
			currentSecs = 59;
		}
		// displayTimer();
		currentSecs--;

		this.setState({
			currentMins: currentMins,
			currentSecs: currentSecs
		});
	}

	render() {
		return (
			<div className="app-wrapper centered" style={{ backgroundImage: `url(${bgImg})` }}>
				<h1>Pomodoro Clock</h1>
				<Clock {...this.state} onPause={this.handlePause} onReset={this.handleReset} />
				<Settings
					{...this.state}
					onSettingSwitch={this.handleSettingSwitch}
					onSettingUpdate={this.handleSettingUpdate}
				/>
				<Modal onModal={this.handleModal} />
			</div>
		);
	}
}

export default App;

// Libraries
import React from 'react';

// Components
import Clock from './Clock';
import Settings from './Settings';
import Modal from './Modal';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);
import sfx2 from '../soundfx/Beep_tim-Matthieu-8588_hifi.mp3';
const endSfx = new Audio(sfx2);

// Images
const bgImg = require('../images/background.png');
const resetImg = require('../images/reset-button.png');

// Constants
import C from '../constants';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentTimer: C.DEFAULT_TIMER,
			currentSetting: C.DEFAULT_SETTING,
			sessionTime: C.DEFAULT_SESSION,
			breakTime: C.DEFAULT_BREAK,
			paused: true,
			currentMins: C.DEFAULT_SESSION,
			currentSecs: 0,
			interval: null
		};

		this.handlePause = this.handlePause.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleSettingSwitch = this.handleSettingSwitch.bind(this);
		this.handleSettingUpdate = this.handleSettingUpdate.bind(this);
		this.handleModal = this.handleModal.bind(this);

		this.updateTimer = this.updateTimer.bind(this);
		this.tickTimer = this.tickTimer.bind(this);
		this.switchTimer = this.switchTimer.bind(this);
	}
	handlePause(paused) {
		// console.log('App handlePause - paused: ', paused);

		this.updateTimer(paused);

		this.setState({
			paused: paused
		});
	}
	handleReset() {
		if (this.state.paused) {
			buttonSfx.play();
			this.setState({
				currentTimer: C.DEFAULT_TIMER,
				currentSetting: C.DEFAULT_SETTING,
				sessionTime: C.DEFAULT_SESSION,
				breakTime: C.DEFAULT_BREAK,
				paused: true,
				currentMins: C.DEFAULT_SESSION,
				currentSecs: 0,
				interval: null
			});
		}
	}
	handleSettingSwitch(currentSetting) {
		this.setState({
			currentSetting: currentSetting
		});
	}
	handleSettingUpdate(currentSetting, mins) {
		console.log('handleSettingUpdate -----------------------------------');
		console.log('currentSetting: ', currentSetting);
		console.log('mins: ', mins);

		let { currentTimer } = this.state;
		console.log('currentTimer: ', currentTimer);

		currentSetting === 'SESSION'
			? this.setState({
					sessionTime: mins
				})
			: this.setState({
					breakTime: mins
				});

		// Update current paused timer if modified by user
		if (
			(currentSetting === 'SESSION' && currentTimer === 'SESSION') ||
			(currentSetting === 'BREAK' && currentTimer === 'BREAK')
		) {
			this.setState({
				currentMins: mins,
				currentSecs: 0
			});
		}
	}
	handleModal() {
		console.log('handleModal');
	}
	updateTimer(paused) {
		let { currentMins, currentSecs, interval } = this.state;

		if (paused) {
			clearInterval(interval);
		} else {
			interval = setInterval(() => {
				this.tickTimer();
			}, 1000);
		}

		this.setState({
			interval: interval
		});
	}
	tickTimer() {
		let { currentMins, currentSecs } = this.state;

		if (currentMins === 0 && currentSecs === 0) {
			this.switchTimer();
		} else {
			if (currentSecs === 0 && currentMins > 0) {
				currentMins--;
				currentSecs = 60;
			}
			currentSecs--;

			this.setState({
				currentMins: currentMins,
				currentSecs: currentSecs
			});
		}
	}
	switchTimer() {
		let { currentTimer, sessionTime, breakTime, currentMins } = this.state;
		endSfx.play();

		if (currentTimer === 'SESSION') {
			currentTimer = 'BREAK';
			currentMins = breakTime;
		} else {
			currentTimer = 'SESSION';
			currentMins = sessionTime;
		}

		this.setState({
			currentTimer: currentTimer,
			currentMins: currentMins,
			currentSecs: 0
		});
	}

	render() {
		return (
			<div className="app-wrapper centered" style={{ backgroundImage: `url(${bgImg})` }}>
				<h1>Pomodoro Clock</h1>
				<Clock {...this.state} onPause={this.handlePause} />
				<Settings
					{...this.state}
					onSettingSwitch={this.handleSettingSwitch}
					onSettingUpdate={this.handleSettingUpdate}
				/>
				<img className="clock-button" src={resetImg} alt="reset button" onClick={this.handleReset} />
				<Modal onModal={this.handleModal} />
			</div>
		);
	}
}

export default App;

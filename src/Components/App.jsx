// Libraries
import React from 'react';

// Components
import Clock from './Clock';
import Settings from './Settings';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);
import sfx2 from '../soundfx/Beep_tim-Matthieu-8588_hifi.mp3';
const endSfx = new Audio(sfx2);
import sfx3 from '../soundfx/ButtonKi-Intermed-544_hifi.mp3';
const swishSfx = new Audio(sfx3);

// Images
const bgImg = require('../images/background.png');
const infoBtnImg = require('../images/info-button.png');
const infoCardImg = require('../images/info-card.png');

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
			interval: null,
			blinkInterval: null,
			blinkOn: true,
			infoExpanded: false
		};

		this.handlePause = this.handlePause.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
		this.handleSettingSwitch = this.handleSettingSwitch.bind(this);
		this.handleSettingUpdate = this.handleSettingUpdate.bind(this);
		this.toggleInfo = this.toggleInfo.bind(this);
		this.updateTimer = this.updateTimer.bind(this);
		this.tickTimer = this.tickTimer.bind(this);
		this.blinkSeconds = this.blinkSeconds.bind(this);
		this.switchTimer = this.switchTimer.bind(this);
	}
	handlePause(paused) {
		this.updateTimer(paused);

		this.setState({
			paused: paused
		});
	}
	handleRestart() {
		let { currentTimer, currentMins, sessionTime, breakTime } = this.state;

		currentTimer === 'SESSION' ? (currentMins = sessionTime) : (currentMins = breakTime);
		buttonSfx.play();

		document.getElementById('secondsColon').style.visibility = 'visible';

		this.setState({
			currentMins: currentMins,
			currentSecs: 0,
			interval: null,
			blinkInterval: null,
			blinkOn: true
		});
	}
	handleSettingSwitch(currentSetting) {
		this.setState({
			currentSetting: currentSetting
		});
	}
	handleSettingUpdate(currentSetting, mins) {
		let { currentTimer } = this.state;

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
	updateTimer(paused) {
		let { currentMins, currentSecs, interval, blinkInterval } = this.state;

		if (paused) {
			clearInterval(interval);
			clearInterval(blinkInterval);
		} else {
			interval = setInterval(() => {
				this.tickTimer();
			}, 1000);
			blinkInterval = setInterval(() => {
				this.blinkSeconds();
			}, 500);
		}

		this.setState({
			interval: interval,
			blinkInterval: blinkInterval
		});
	}
	blinkSeconds() {
		let { blinkOn } = this.state;
		let colon = document.getElementById('secondsColon');

		blinkOn ? (colon.style.visibility = 'visible') : (colon.style.visibility = 'hidden');

		this.setState({
			blinkOn: !blinkOn
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
	toggleInfo(e) {
		let { infoExpanded } = this.state;
		let btn = this.refs.infoBtn;
		let card = this.refs.infoCard;

		swishSfx.play();

		if (!infoExpanded) {
			card.className = 'info-card showMe';
			btn.className = 'hideMe';
			infoExpanded = true;
		} else {
			btn.className = 'info-btn showMe';
			card.className = 'hideMe';
			infoExpanded = false;
		}

		this.setState({
			infoExpanded: infoExpanded
		});
	}

	render() {
		return (
			<div className="app-wrapper centered" style={{ backgroundImage: `url(${bgImg})` }}>
				<h1 id="appTitle">Pomodoro Clock</h1>
				<Clock {...this.state} onPause={this.handlePause} onRestart={this.handleRestart} />
				<Settings
					{...this.state}
					onSettingSwitch={this.handleSettingSwitch}
					onSettingUpdate={this.handleSettingUpdate}
				/>
				<img
					ref="infoBtn"
					className="info-btn showMe"
					src={infoBtnImg}
					alt="Info button"
					onClick={this.toggleInfo}
				/>
				<img ref="infoCard" className="hideMe" src={infoCardImg} alt="Info Card" onClick={this.toggleInfo} />
			</div>
		);
	}
}

export default App;

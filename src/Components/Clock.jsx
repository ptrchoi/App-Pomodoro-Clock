// Libraries
import React from 'react';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);

// Images (Parcel requires the 'require("filepath")' call)
const timerDisplay = require('../images/timer-display-pressed.png');
const startImg = require('../images/start-button.png');
const pauseImg = require('../images/pause-button.png');
const resetImg = require('../images/reset-button.png');
const timerBg = require('../images/timer-bg.png');

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			clockRunning: false,
			currentSession: 'SESSION',
			reset: false
		};

		this.handleStart = this.handleStart.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	handleStart(e) {
		this.state.clockRunning ? (e.target.src = startImg) : (e.target.src = pauseImg);
		buttonSfx.play();

		this.setState((prevState) => ({
			clockRunning: !prevState.clockRunning
		}));
	}
	handleReset() {
		console.log('reset');
		buttonSfx.play();
	}
	handleSessionSwitch() {}
	render() {
		return (
			<div className="clock-wrapper">
				<div className="clock" style={{ backgroundImage: `url(${timerBg})` }}>
					<p id="clockName">{this.state.currentSession}</p>
					<img id="timerDisplay" src={timerDisplay} alt="timer display" />
					<br />
					<img className="clock-button" src={startImg} alt="start button" onClick={this.handleStart} />
					<img className="clock-button" src={resetImg} alt="reset button" onClick={this.handleReset} />
				</div>
			</div>
		);
	}
}

export default Clock;

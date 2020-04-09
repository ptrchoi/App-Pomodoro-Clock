// Libraries
import React from 'react';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);

// Images (Parcel requires the 'require("filepath")' call)
const playImg = require('../images/start-button.png');
const pauseImg = require('../images/pause-button.png');
const restartImg = require('../images/reset-button.png');
const timeBg = require('../images/timer-display-pressed.png');
const clockBg = require('../images/timer-bg.png');

import C from '../constants';

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.handlePause = this.handlePause.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
	}
	handlePause(e, paused) {
		paused ? (e.target.src = pauseImg) : (e.target.src = playImg);
		buttonSfx.play();

		// Pass updated pause state to App Module
		this.props.onPause(!paused);
	}
	handleRestart(paused) {
		if (!paused) {
			// Pause timer
			this.refs.playButton.click(paused);
		}
		buttonSfx.play();
		// Pass restart notificaion to App Module
		this.props.onRestart();
	}
	render() {
		let { currentTimer, paused, currentMins, currentSecs } = this.props;

		let mins_twoDigits = ('0' + currentMins).slice(-2);
		let secs_twoDigits = ('0' + currentSecs).slice(-2);

		return (
			<div className="clock-wrapper">
				<div className="clock-display bg-img" style={{ backgroundImage: `url(${clockBg})` }}>
					<p id="clockName">{currentTimer}</p>
					<div className="time-display bg-img" style={{ backgroundImage: `url(${timeBg})` }}>
						<p id="timeDigits">
							<span id="minSpan">{mins_twoDigits}</span>
							<span id="secondsColon">:</span>
							<span id="secSpan">{secs_twoDigits}</span>
						</p>
					</div>
					<img
						ref="playButton"
						className="clock-button"
						src={playImg}
						alt="start button"
						onClick={(e) => {
							this.handlePause(e, paused);
						}}
					/>
					<img
						className="clock-button"
						src={restartImg}
						alt="restart button"
						onClick={() => {
							this.handleRestart(paused);
						}}
					/>
				</div>
			</div>
		);
	}
}

export default Clock;

// Libraries
import React from 'react';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);

// Images (Parcel requires the 'require("filepath")' call)
const clockDisplay = require('../images/timer-display-pressed.png');
const playImg = require('../images/start-button.png');
const pauseImg = require('../images/pause-button.png');
const resetImg = require('../images/reset-button.png');
const clockBg = require('../images/timer-bg.png');

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			paused: true,
			currentClock: this.props.currentClock
		};

		this.handleStart = this.handleStart.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	handleStart(e) {
		this.state.paused ? (e.target.src = pauseImg) : (e.target.src = playImg);
		buttonSfx.play();

		console.log('Clock passing this state of paused to App: ', this.state.paused);
		this.props.onPause(!this.state.paused); // Pass updated pause state to App Module
		this.setState((prevState) => ({
			paused: !prevState.paused
		}));
	}
	handleReset() {
		buttonSfx.play();
		this.props.onReset(this.state.currentClock); // Notify App of reset of current clock type
	}
	handleSessionSwitch() {}
	render() {
		return (
			<div className="clock-wrapper">
				<div className="clock" style={{ backgroundImage: `url(${clockBg})` }}>
					<p id="clockName">{this.state.currentClock}</p>
					<img id="clockDisplay" src={clockDisplay} alt="clock display" />
					<br />
					<img className="clock-button" src={playImg} alt="start button" onClick={this.handleStart} />
					<img className="clock-button" src={resetImg} alt="reset button" onClick={this.handleReset} />
				</div>
			</div>
		);
	}
}

export default Clock;

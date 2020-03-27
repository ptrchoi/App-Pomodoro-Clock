// Libraries
import React from 'react';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);

// Images (Parcel requires the 'require("filepath")' call)
const startImg = require('../images/start-button.png');
const pauseImg = require('../images/pause-button.png');

class Clock extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			clockRunning: false
		};

		this.handleStart = this.handleStart.bind(this);
	}
	handleStart(e) {
		this.state.clockRunning ? (e.target.src = startImg) : (e.target.src = pauseImg);
		buttonSfx.play();

		this.setState((prevState) => ({
			clockRunning: !prevState.clockRunning
		}));
	}
	render() {
		return (
			<div>
				<h1>Clock</h1>
				<img id="startBtn" src={startImg} alt="start button" onClick={this.handleStart} />
			</div>
		);
	}
}

export default Clock;

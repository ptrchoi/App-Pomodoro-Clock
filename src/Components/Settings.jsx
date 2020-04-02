import React from 'react';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);

// Images (Parcel requires the 'require("filepath")' call)
const minusImg = require('../images/minus-button.png');
const minusImgPressed = require('../images/minus-button-pressed.png');
const plusImg = require('../images/plus-button.png');
const plusImgPressed = require('../images/plus-button-pressed.png');
const minsTextImg = require('../images/mins-text.png');
const setSession = require('../images/settings-session.png');
const setBreak = require('../images/settings-break.png');
const settingsBg = require('../images/session-box.png');

import C from '../constants';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentClock: C.DEFAULT_CLOCK,
			sessionMins: C.DEFAULT_SESSION,
			breakMins: C.DEFAULT_BREAK
		};

		this.handlePlus = this.handlePlus.bind(this);
		this.handleMinus = this.handleMinus.bind(this);
		this.handleSessionSwitch = this.handleSessionSwitch.bind(this);
	}
	handleSessionSwitch(e) {
		let { currentClock } = this.state;
		console.log('handleSessionSwitch: currentClock: ', currentClock);

		buttonSfx.play();

		if (currentClock === 'SESSION') {
			e.target.src = setBreak;
			currentClock = 'BREAK';
			console.log('SESSION is setting currentClock to : ', currentClock);
		} else {
			e.target.src = setSession;
			currentClock = 'SESSION';
			console.log('BREAK is setting currentClock to : ', currentClock);
		}

		this.setState({
			currentClock: currentClock
		});
	}
	handlePlus(currentClock, mins) {
		buttonSfx.play();

		if (mins < C.MAX_CLOCK) {
			mins++;
			this.props.onSettings(mins);

			currentClock === 'SESSION'
				? this.setState({
						sessionMins: mins
					})
				: this.setState({
						breakMins: mins
					});
		}
	}
	handleMinus(currentClock, mins) {
		buttonSfx.play();

		if (mins > C.MIN_CLOCK) {
			mins--;
			this.props.onSettings(currentClock, mins);

			currentClock === 'SESSION'
				? this.setState({
						sessionMins: mins
					})
				: this.setState({
						breakMins: mins
					});
		}
	}
	render() {
		let paused = this.props.paused,
			mins;
		console.log('paused: ', paused);
		let { currentClock, sessionMins, breakMins } = this.state;
		currentClock === 'SESSION' ? (mins = this.state.sessionMins) : (mins = this.state.breakMins);

		return (
			<div className="settings-wrapper" style={{ backgroundImage: `url(${settingsBg})` }}>
				<img id="sessionSwitch" src={setSession} alt="settings" onClick={this.handleSessionSwitch} />
				<p>
					<img id="minsText" src={minsTextImg} alt="Mins text" />
				</p>
				<img
					className="settings-btn"
					id="minusBtn"
					src={minusImg}
					alt="minus button"
					onClick={() => {
						if (paused) {
							this.handleMinus(currentClock, mins);
						}
					}}
				/>
				<span id="sessionTime">{mins}</span>
				<img
					className="settings-btn"
					id="plusBtn"
					src={plusImg}
					alt="plus button"
					onClick={() => {
						if (paused) {
							this.handlePlus(currentClock, mins);
						}
					}}
				/>
			</div>
		);
	}
}

export default Settings;

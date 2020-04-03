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
const sessionImg = require('../images/settings-session.png');
const breakImg = require('../images/settings-break.png');
const settingsBg = require('../images/session-box.png');

import C from '../constants';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSettingSwitch = this.handleSettingSwitch.bind(this);
	}
	handleSettingSwitch(e, currentSetting) {
		buttonSfx.play();

		if (currentSetting === 'SESSION') {
			e.target.src = breakImg;
			currentSetting = 'BREAK';
		} else {
			e.target.src = sessionImg;
			currentSetting = 'SESSION';
		}
		this.props.onSettingSwitch(currentSetting);
	}
	handleUpdate(currentSetting, mins, type) {
		buttonSfx.play();

		if (type === '+' && mins < C.MAX_CLOCK) {
			mins++;
		} else if (type === '-' && mins > C.MIN_CLOCK) {
			mins--;
		} else {
			return;
		}
		this.props.onSettingUpdate(currentSetting, mins);
	}
	render() {
		let { currentSetting, sessionTime, breakTime, paused } = this.props;
		let mins;
		currentSetting === 'SESSION' ? (mins = sessionTime) : (mins = breakTime);

		// Format single digits with leading zero
		mins < 10 ? (mins = '0' + mins.toString()) : mins;

		return (
			<div className="settings-wrapper" style={{ backgroundImage: `url(${settingsBg})` }}>
				<img
					id="sessionSwitch"
					src={sessionImg}
					alt="settings"
					onClick={(e) => {
						this.handleSettingSwitch(e, currentSetting);
					}}
				/>
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
							this.handleUpdate(currentSetting, mins, '-');
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
							this.handleUpdate(currentSetting, mins, '+');
						}
					}}
				/>
			</div>
		);
	}
}

export default Settings;

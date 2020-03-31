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
const sessionSwitchImg = require('../images/settings-session.png');
const settingsBg = require('../images/session-box.png');

class Settings extends React.Component {
	handlePlus() {
		console.log('plus');
		buttonSfx.play();
	}
	handleMinus() {
		console.log('minus');
		buttonSfx.play();
	}
	render() {
		return (
			<div className="settings-wrapper" style={{ backgroundImage: `url(${settingsBg})` }}>
				<img id="sessionSwitchImg" src={sessionSwitchImg} alt="settings" />
				<p>
					<img id="minsTextImg" src={minsTextImg} alt="Mins text" />
				</p>
				<img
					className="settings-btn"
					id="minusBtn"
					src={minusImg}
					alt="minus button"
					onClick={this.handleMinus}
				/>
				<span id="sessionTime" />
				<img className="settings-btn" id="plusBtn" src={plusImg} alt="plus button" onClick={this.handlePlus} />
			</div>
		);
	}
}

export default Settings;

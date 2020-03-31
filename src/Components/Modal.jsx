import React from 'react';

// Audio files (Parcel requires the file path import)
import sfx1 from '../soundfx/Button_C-J_Fairba-8444_hifi.mp3';
const buttonSfx = new Audio(sfx1);

// Images (Parcel requires the 'require("filepath")' call)
const infoBtnImg = require('../images/info-button.png');

class Modal extends React.Component {
	render() {
		return (
			<div>
				<img id="infoBtn" src={infoBtnImg} alt="Info button" />
			</div>
		);
	}
}

export default Modal;

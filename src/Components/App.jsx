// Libraries
import React from 'react';

// Components
import Clock from './Clock';
import Settings from './Settings';
import Modal from './Modal';

// Images
const bgImg = require('../images/background.png');

class App extends React.Component {
	render() {
		return (
			<div className="app-wrapper centered" style={{ backgroundImage: `url(${bgImg})` }}>
				<h1>Pomodoro Clock</h1>
				<Clock />
				<Settings />
				<Modal />
			</div>
		);
	}
}

export default App;

// Libraries
import React from 'react';

// Components
import Clock from './Clock';
import Settings from './Settings';
import Modal from './Modal';

// Images
const bgImg = require('../images/background.png');

// Constants
import C from '../constants';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentClock: C.DEFAULT_CLOCK,
			sessionMins: C.DEFAULT_SESSION,
			breakMins: C.DEFAULT_BREAK,
			paused: true
		};

		this.handlePause = this.handlePause.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleSettings = this.handleSettings.bind(this);
		this.handleModal = this.handleModal.bind(this);
	}
	handlePause(paused) {
		console.log('App handlePause - paused: ', paused);
		this.setState({
			paused: paused
		});
	}
	handleReset(currentClock) {
		console.log('handleReset called for currentClock: ', currentClock);
	}
	handleSettings(currentClock, mins) {
		console.log('handleSettings, currentClock: ', currentClock, ' mins: ', mins);
		this.setState({
			currentClock: currentClock
		});
	}
	handleModal() {
		console.log('handleModal');
	}
	render() {
		return (
			<div className="app-wrapper centered" style={{ backgroundImage: `url(${bgImg})` }}>
				<h1>Pomodoro Clock</h1>
				<Clock currentClock={this.state.currentClock} onPause={this.handlePause} onReset={this.handleReset} />
				<Settings
					paused={this.state.paused}
					currentClock={this.state.currentClock}
					onSettings={this.handleSettings}
				/>
				<Modal onModal={this.handleModal} />
			</div>
		);
	}
}

export default App;

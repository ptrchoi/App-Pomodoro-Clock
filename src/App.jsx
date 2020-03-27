// Libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Clock from './Components/Clock';
import Settings from './Components/Settings';

// Style Sheets
import './styles/index';

class App extends React.Component {
	render() {
		return (
			<div className="app-wrapper">
				<Clock />
				<Settings />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

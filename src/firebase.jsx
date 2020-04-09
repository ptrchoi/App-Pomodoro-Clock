import firebase from 'firebase';

// App's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCXRPOX6oTDg6XvX3yUw5i2jpIb7KAzRLs',
	authDomain: 'pomodoro-clock-ad6c9.firebaseapp.com',
	databaseURL: 'https://pomodoro-clock-ad6c9.firebaseio.com',
	projectId: 'pomodoro-clock-ad6c9',
	storageBucket: 'pomodoro-clock-ad6c9.appspot.com',
	messagingSenderId: '526738038698',
	appId: '1:526738038698:web:6f0c951bcd50e300cc15d3'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

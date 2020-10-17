import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

function App() {
	const [values, setValues] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/api/values').then(res => {
			console.log(res);
			setValues(res.data);
		});
	}, []);

	return (
		<div>
			<Header as='h2'>
				<Icon name='users' />
				<Header.Content>Reactivities</Header.Content>
			</Header>
			<List>
				<List.Item>Apples</List.Item>
			</List>
		</div>
	);
}

export default App;

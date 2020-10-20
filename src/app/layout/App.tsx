import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
		null
	);
	const [editMode, setEditMode] = useState(false);

	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities.filter(a => a.id === id)[0]);
		setEditMode(false);
	};

	const handleOpenCreateForm = () => {
		setSelectedActivity(null);
		setEditMode(true);
	};

	const handleCreateActivity = (activity: IActivity) => {
		setActivities([...activities, activity]);
		setSelectedActivity(activity);
		setEditMode(false);
	};

	const handleEditActivity = (activity: IActivity) => {
		setActivities([
			...activities.filter(a => a.id !== activity.id),
			activity,
		]);
		setSelectedActivity(activity);
		setEditMode(false);
	};

	const handleDeleteActivity = (id: string) => {
		setActivities([...activities.filter(a => a.id !== id)]);
	};

	useEffect(() => {
		axios
			.get<IActivity[]>('http://localhost:5000/api/activities')
			.then(res => {
				let activities = res.data.map(activity => {
					activity.date = activity.date.split('.')[0];
					return activity;
				});
				setActivities(activities);
			});
	}, []);

	return (
		<>
			<NavBar openCreateForm={handleOpenCreateForm} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					selectActivity={handleSelectActivity}
					activities={activities}
					selectedActivity={selectedActivity}
					setSelectedActivity={setSelectedActivity}
					editMode={editMode}
					setEditMode={setEditMode}
					createActivity={handleCreateActivity}
					editActivity={handleEditActivity}
					deleteActivity={handleDeleteActivity}
				/>
			</Container>
		</>
	);
};

export default App;

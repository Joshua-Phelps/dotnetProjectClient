import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
	setEditMode: (editMode: boolean) => void;
	activity: IActivity;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
	setEditMode,
	activity: initialFormState,
	createActivity,
	editActivity,
}) => {
	const initializeForm = () => {
		if (initialFormState) return initialFormState;
		return {
			id: '',
			title: '',
			category: '',
			description: '',
			date: '',
			city: '',
			venue: '',
		};
	};

	const [activity, setActivity] = useState<IActivity>(initializeForm);

	const handleSubmit = () => {
		if (activity.id.length === 0) {
			let newActivity = { ...activity, id: uuid() };
			createActivity(newActivity);
		} else editActivity(activity);
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setActivity({ ...activity, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					placeholder='Title'
					name='title'
					value={activity.title}
				/>
				<Form.TextArea
					onChange={handleInputChange}
					rows={2}
					placeholder='Description'
					value={activity.description}
					name='description'
				/>
				<Form.Input
					onChange={handleInputChange}
					placeholder='Category'
					value={activity.category}
					name='category'
				/>
				<Form.Input
					onChange={handleInputChange}
					type='datetime-local'
					placeholder='Date'
					value={activity.date}
					name='date'
				/>
				<Form.Input
					onChange={handleInputChange}
					placeholder='City'
					value={activity.city}
					name='city'
				/>
				<Form.Input
					onChange={handleInputChange}
					placeholder='Venue'
					value={activity.venue}
					name='venue'
				/>
				<Button
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={() => setEditMode(false)}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};

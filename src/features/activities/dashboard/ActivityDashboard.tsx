import React from 'react';
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';

interface IProps {
	activities: IActivity[];
	selectActivity: (id: string) => void;
	selectedActivity: IActivity | null;
	setSelectedActivity: (activity: IActivity | null) => void;
	editMode: boolean;
	setEditMode: (editMode: boolean) => void;
	createActivity: (activity: IActivity) => void;
	editActivity: (activity: IActivity) => void;
	deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({
	activities,
	selectActivity,
	selectedActivity,
	setSelectedActivity,
	editMode,
	setEditMode,
	createActivity,
	editActivity,
	deleteActivity,
}) => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<ActivityList
					selectActivity={selectActivity}
					activities={activities}
					deleteActivity={deleteActivity}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedActivity && !editMode && (
					<ActivityDetails
						setEditMode={setEditMode}
						activity={selectedActivity}
						setSelectedActivity={setSelectedActivity}
					/>
				)}
				{editMode && (
					<ActivityForm
						key={(selectedActivity && selectedActivity.id) || 0}
						activity={selectedActivity!}
						setEditMode={setEditMode}
						createActivity={createActivity}
						editActivity={editActivity}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
};

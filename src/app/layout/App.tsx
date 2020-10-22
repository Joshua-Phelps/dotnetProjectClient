import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import Homepage from '../../features/home/Homepage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {
	return (
		<>
			<Route exact path='/' component={Homepage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<>
						<NavBar />
						<Container style={{ marginTop: '7em' }}>
							<Route
								exact
								path='/activities'
								component={ActivityDashboard}
							/>
							<Route
								path='/activities/:id'
								component={ActivityDetails}
							/>
							<Route
								key={location.key}
								path={['/createActivity', '/manage/:id']}
								component={ActivityForm}
							/>
						</Container>
					</>
				)}
			/>
		</>
	);
};

export default withRouter(observer(App));

import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta-dfuhriman/okta-auth-js';
import {
	LoginCallback,
	Security,
	SecureRoute,
} from '@okta-dfuhriman/okta-react';

import { Home, LoginForm, User } from './components';

const { VITE_OKTA_CLIENT_ID: clientId, VITE_OKTA_ISSUER: issuer } = import.meta
	.env;

const oktaAuth = new OktaAuth({
	clientId,
	issuer,
	scopes: ['openid', 'email', 'profile', 'offline_access', 'device_sso'],
	redirectUri: window.location.origin + '/login/callback',
	services: {
		autoRenew: true,
		autoRemove: true,
		syncStorage: false,
	},
});

oktaAuth.start();

export const App = () => {
	const history = useHistory();

	const restoreOriginalUri = async (_oktaAuth, originalUri) => {
		history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
	};

	const onAuthRequired = () => history.push('/login');

	return (
		<Security {...{ oktaAuth, onAuthRequired, restoreOriginalUri }}>
			<Switch>
				<Route path='/login' exact component={LoginForm} />
				<Route path='/login/callback'>
					<LoginCallback />
				</Route>
				<SecureRoute path='/user' exact component={User} />
				<Route path='*' component={Home} />
			</Switch>
		</Security>
	);
};

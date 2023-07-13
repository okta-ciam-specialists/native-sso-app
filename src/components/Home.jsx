import { useState } from 'react';
import { Box, Link, Stack, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useOktaAuth } from '@okta-dfuhriman/okta-react';

import { Toolbar, User } from './index';

export const Home = () => {
	const { authState } = useOktaAuth();
	const [value, setValue] = useState('1');

	const handleTabChange = (e, newValue) => {
		console.log(newValue);
		setValue(newValue);
	};

	const isAuthenticated = authState?.isAuthenticated ?? false;

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				p: 8,
				width: '100vw',
				height: '100vh',
			}}
		>
			<Stack sx={{ width: '100%' }}>
				<Toolbar />
				<TabContext value={value}>
					<TabList onChange={handleTabChange}>
						<Tab label='Read Me' value='1' />
						{isAuthenticated && <Tab label='User Details' value='2' />}
					</TabList>
					<TabPanel value='1' sx={{ p: 0 }}>
						<Box sx={{ textAlign: 'center' }}>
							<p>
								This application demonstrates how to SSO from a 'native'
								application to a web application utilizing the{' '}
								<Link href='https://developer.okta.com/docs/guides/configure-native-sso/-/main/'>
									OAuth Native SSO protocol in Okta's Customer Identity Solution
									(CIS)
								</Link>
							</p>
							<p>
								Clicking on <code>SSO TO APP</code> will renew/refresh the{' '}
								<code>id_token</code> and <code>device_secret</code> and open a
								new window to another application that "simulates" a completely
								separate application.
							</p>
							<p>
								Normally, two web applications would share an auth state and/or
								Okta session and an actual 'SSO' between them is unnecessary.
								However, this is not the case for a Native App to Web App SSO.
							</p>
							<p>
								This demonstration showcases how a native app (this app) can
								"pass" an authenticated state to a web application in order to
								prevent the user from needing to login again.
							</p>
							<p>
								The secondary application does <em>not</em> share the same token
								manager as this application and is designed to maintain a
								separate authentication "state".
							</p>
							<p>
								Logging out of this application will terminate the Okta session
								completely. <em>However,</em> logging out of the secondary
								application will <b>not</b> impact the authentication state of
								this application.
							</p>
						</Box>
					</TabPanel>
					{isAuthenticated && (
						<TabPanel value='2' sx={{ p: 0 }}>
							<User />
						</TabPanel>
					)}
				</TabContext>
			</Stack>
		</Box>
	);
};

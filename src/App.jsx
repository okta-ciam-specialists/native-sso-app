import { useEffect } from 'react';
import { Box, Link, Stack } from '@mui/material';
import { Route, useHistory } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta-dfuhriman/okta-auth-js';
import {
  LoginCallback,
  Security
} from '@okta-dfuhriman/okta-react';

import { Toolbar, User } from './components';

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

  return (
      <Security {...{ oktaAuth, restoreOriginalUri }}>
        <Route path="/login/callback">
          <LoginCallback />
        </Route>
        <Route path="*" exact>
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
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <p>
                This application demonstrates how to SSO from a 'native' application to a web application utilizing the <Link href='https://developer.okta.com/docs/guides/configure-native-sso/-/main/'>OAuth Native SSO protocol in Okta's Customer Identity Solution (CIS)</Link>
              </p>
              <p>
                Clicking on <code>SSO TO APP</code> will renew/refresh the <code>id_token</code> and <code>device_secret</code> and open a new window to another application that "simulates" a completely separate application.
              </p>
              <p>
                Normally, two web applications would share an auth state and/or Okta session and an actual 'SSO' between them is unnecessary. However, this is not the case for a Native App to Web App SSO.
              </p>
              <p>
                This demonstration showcases how a native app (this app) can "pass" an authenticated state to a web application in order to prevent the user from needing to login again.
              </p>
              <p>
                The secondary application does <em>not</em> share the same token manager as this application and is designed to maintain a separate authentication "state".
              </p>
              <p>
                Logging out of this application will terminate the Okta session completely. <em>However,</em> logging out of the secondary application will <b>not</b> impact the authentication state of this application.
              </p>
            </Box>
              <User />
            </Stack>
          </Box>
        </Route>
      </Security>
  );
};

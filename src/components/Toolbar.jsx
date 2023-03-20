import { useEffect, useState } from 'react';
import { AppBar, Button, CircularProgress, Toolbar as MuiToolbar, Stack, Typography, useTheme } from '@mui/material';
import { useOktaAuth } from '@okta-dfuhriman/okta-react';

const { VITE_APP2_URL: APP_URL } = import.meta.env;

export const Toolbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const theme = useTheme();

  const handleSSO = () => {
    const url = APP_URL;

    const { deviceSecret, idToken } = authState?.idToken || {};

    if (!deviceSecret) {
      oktaAuth.tokenManager.renew('idToken').then(({ deviceSecret, idToken }) => {
        return window.open(
          `${url}#id_token=${idToken}&device_secret=${deviceSecret}`,
          '_blank'
        );
      });
    } else {
      window.open(
        `${url}#id_token=${idToken}&device_secret=${deviceSecret}`,
        '_blank'
      );
    }

  };

  return <AppBar>
    <MuiToolbar>
      <Typography variant='h5' sx={{ flexGrow: 1 }}>SSO Initializer / "Native" App</Typography>
      {!authState?.isAuthenticated && <Button color='inherit' onClick={() => oktaAuth.signInWithRedirect()}>Login</Button>}
      {authState?.isAuthenticated && <Stack direction='row' spacing={2} >
        <Button onClick={handleSSO} variant='contained' sx={{
          color: 'white', backgroundColor: theme.palette.secondary.light,
          ':hover': {
            backgroundColor: theme.palette.secondary.dark,

          }
        }}>SSO To App</Button>
        <Button color='inherit' onClick={() => oktaAuth.signOut()} variant='outlined' sx={{
          ':hover': {
            backgroundColor: 'white',
            color: theme.palette.primary.main
          }
        }}>Logout</Button>
      </Stack>}
    </MuiToolbar>
  </AppBar>
};

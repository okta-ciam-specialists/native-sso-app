import { useState } from 'react';
import {
	AppBar,
	Backdrop,
	Button,
	CircularProgress,
	Toolbar as MuiToolbar,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta-dfuhriman/okta-react';
import axios from 'axios';

const { VITE_APP2_URL: APP_URL } = import.meta.env;

export const Toolbar = () => {
	const { authState, oktaAuth } = useOktaAuth();
	const [isLoading, setIsLoading] = useState(false);
	const theme = useTheme();
	const history = useHistory();

	const handleSSO = () => {
		const url = APP_URL;

		if (!isLoading) {
			setIsLoading(true);
		}

		const initSSO = async () => {
			const { codeChallenge, codeVerifier: code_verifier } =
				await oktaAuth.token.prepareTokenParams();

			const { deviceSecret, idToken } = await oktaAuth.tokenManager.get(
				'idToken'
			);

			const options = {
				method: 'POST',
				url: `${APP_URL}/sso`,
				data: {
					code_verifier,
					id_token: idToken,
					device_secret: deviceSecret,
				},
			};

			await axios(options);

			return { codeChallenge, idToken };
		};

		initSSO()
			.then(({ codeChallenge, idToken }) => {
				window.open(
					`${url}#id_token=${idToken}&code_challenge=${codeChallenge}`,
					'_blank'
				);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
			});
	};

	return (
		<>
			<Backdrop open={isLoading} sx={{ color: 'white', zIndex: 999 }}>
				<CircularProgress color='inherit' size={136} />
			</Backdrop>
			<AppBar>
				<MuiToolbar>
					<Typography variant='h5' sx={{ flexGrow: 1 }}>
						SSO Initializer / "Native" App
					</Typography>
					{!authState?.isAuthenticated && (
						<Button color='inherit' onClick={() => history.push('/login')}>
							Login
						</Button>
					)}
					{authState?.isAuthenticated && (
						<Stack direction='row' spacing={2}>
							<Button
								onClick={handleSSO}
								variant='contained'
								sx={{
									color: 'white',
									backgroundColor: theme.palette.secondary.light,
									':hover': {
										backgroundColor: theme.palette.secondary.dark,
									},
								}}
							>
								SSO To App
							</Button>
							<Button
								color='inherit'
								onClick={() => {
									setIsLoading(true);
									oktaAuth.signOut();
								}}
								variant='outlined'
								sx={{
									':hover': {
										backgroundColor: 'white',
										color: theme.palette.primary.main,
									},
								}}
							>
								Logout
							</Button>
						</Stack>
					)}
				</MuiToolbar>
			</AppBar>
		</>
	);
};

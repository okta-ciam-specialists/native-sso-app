import { useState } from 'react';
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useOktaAuth } from '@okta-dfuhriman/okta-react';

export const LoginForm = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const { oktaAuth } = useOktaAuth();

	const handleChange = ({ target }) => {
		if (target?.value) {
			if (target?.id === 'username') {
				setUsername(target?.value);
			}
			if (target?.id === 'password') {
				setPassword(target?.value);
			}
		}
	};

	const handleClick = () => {
		if (username && password && !isLoading) {
			setIsLoading(true);

			if (!!error) {
				setError(undefined);
			}

			oktaAuth
				.signInWithCredentials({ username, password, sendFingerprint: true })
				.then(({ sessionToken, status }) => {
					if (status === 'SUCCESS' && sessionToken) {
						oktaAuth.signInWithRedirect({ sessionToken });
					}
				})
				.catch((error) => {
					setIsLoading(false);
					setUsername(undefined);
					setPassword(undefined);

					console.log(error?.message);

					setError(error?.message ?? 'Unable to Authenticated');
				});
		}
	};

	const onKeyPress = ({ key }) => key === 'Enter' && handleClick();

	return (
		<Container sx={{ placeItems: 'center' }}>
			<Backdrop open={isLoading} sx={{ color: 'white', zIndex: 999 }}>
				<CircularProgress color='inherit' size={136} />
			</Backdrop>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Stack width='100%' maxWidth='600px' gap={3}>
					<Typography variant='h3'>Welcome</Typography>
					<Divider sx={{ mt: -3, borderWidth: 3, borderColor: 'red' }} />
					{!!error ? (
						<Typography variant='caption' color='error'>
							{error}
						</Typography>
					) : (
						<Typography variant='caption'>Please login to continue</Typography>
					)}
					<TextField
						id='username'
						type='username'
						fullWidth
						required
						label='Username'
						value={username}
						onChange={handleChange}
						onKeyDown={onKeyPress}
					/>
					<TextField
						id='password'
						type='password'
						fullWidth
						required
						value={password}
						label='Password'
						onChange={handleChange}
						onKeyDown={onKeyPress}
					/>
					<Button
						variant='contained'
						onClick={handleClick}
						disabled={!isLoading && (!username || !password)}
					>
						Continue
					</Button>
				</Stack>
			</Box>
		</Container>
	);
};

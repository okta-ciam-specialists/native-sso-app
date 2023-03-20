import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { useOktaAuth } from '@okta-dfuhriman/okta-react';

import { Codeblock } from './Codeblock';

export const User = () => {
  const { authState } = useOktaAuth();

  const { idToken: _, ...idToken } = authState?.idToken || {};

  return (
    <Container maxWidth={false}>
      <Card sx={{ backgroundColor: '#272822', my: 3, p: 2}}>
        <Typography variant="h6" sx={{ color: 'white' }}>
          ID Token
        </Typography>
        <CardContent>
          <Box sx={{ alignItems: 'center' }}>
            <Codeblock data={JSON.stringify(idToken)} />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

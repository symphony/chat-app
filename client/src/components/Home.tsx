import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';

interface HomeProps {
  user?: string;
}

const Home: FC<HomeProps> = (props): ReactElement => {
  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'whitesmoke',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant='h3'>Global Chat</Typography>
    </Box>
  );
};

export default Home;
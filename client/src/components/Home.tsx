import React, { ReactElement, FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Chatbox from 'components/Chatbox';

interface HomeProps {
  username: string;
  messages: [];
  onSend: (message: string) => void;
};


const Home: FC<HomeProps> = (props): ReactElement => {
  return (
    <Box width='100vw' sx={{
      flexGrow: 1,
      backgroundColor: 'primary.dark',
      display: 'flex',
      justifyContent: 'start',
    }}>
      <header>
        {/* <Typography color='textLight' variant='h4'>Global Chat</Typography> */}
      </header>

      <Chatbox {...props} />
    </Box>
  );
};

export default Home;
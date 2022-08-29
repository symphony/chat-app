import React, { ReactElement, FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ChatForm from 'components/ChatForm';
import Chatbox from 'components/Chatbox';

interface HomeProps {
  username: string;
  messages: [];
  onSend: (message: string) => void;
};


const Home: FC<HomeProps> = ({ username, messages, onSend }): ReactElement => {
  return (
    <Box width='100vw' sx={{
      flexGrow: 1,
      backgroundColor: 'primary.dark',
      display: 'flex',
      justifyContent: 'start',
    }}>
      <header>
        <Typography color='textLight' variant='h4'>Global Chat</Typography>
      </header>

      <div>
        {username && <ChatForm username={username} onSend={onSend} />}
        <Chatbox messages={messages} />
      </div>
    </Box>
  );
};

export default Home;
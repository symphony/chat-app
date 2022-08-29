import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';
import ChatForm from 'components/ChatForm';
import Chatbox from 'components/Chatbox';

interface HomeProps {
  username?: string;
  messages?: [];
  onSend: (message: string) => void;
};


const Home: FC<HomeProps> = ({ username, messages, onSend }): ReactElement => {
  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'primary.dark',
      display: 'flex',
      justifyContent: 'start',
    }}>
      <Typography color='textLight' variant='h4'>Global Chat</Typography>
      {username && <ChatForm username={username} onSend={onSend} />}
      <Chatbox messages={messages} />
    </Box>
  );
};

export default Home;
import React, { ReactElement, FC } from "react";
import { Box, Typography } from '@mui/material';

interface ChatProps {
  user?: string;
}

const Chat: FC<ChatProps> = (props) => {
  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'whitesmoke',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h3">Global Chat</Typography>
    </Box>
  );
};

export default Chat;
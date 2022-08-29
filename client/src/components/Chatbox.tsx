import React, { FC, ReactElement } from 'react';
import UserIcon from './UserIcon';
import ChatForm from 'components/ChatForm';


import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

// = types =
interface ChatboxProps {
  username: string;
  messages: [];
  onSend: (message: string) => void;
};


const Chatbox: FC<ChatboxProps> = ({ username, messages, onSend }): ReactElement => {
  const [dense, setDense] = React.useState(false);

  return (
    <Box sx={{ m: 4, flexGrow: 1, maxWidth: '60vw', backgroundColor: 'primary.light', }}>

      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
            Global Chat
          </Typography>
          {username && <ChatForm username={username} onSend={onSend} />}


          <List dense={dense}>
            {/* {username && (
              <ListItem>
                <ListItemAvatar>
                  <UserIcon username={'Hiiiiiiiiiiiiiiiiii'} />
                </ListItemAvatar>
                <ListItemText
                  primary={'welcome-bot'}
                  secondary={`Hello, ${username}!`}
                />
              </ListItem>)
            } */}
            {messages.map(({ self, sender, message }, i) => (
              <ListItem key={sender + i}>
                <ListItemAvatar>
                  <UserIcon username={sender} />
                </ListItemAvatar>
                <ListItemText
                  primary={sender}
                  secondary={message}
                />
              </ListItem>)
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );

  return (

    <Box width='60vw' display='flex' flexDirection='column'>
      <List>
        {messages.map(({ self, message }, i) => (
          < ListItem
            key={i}
            className={self ? 'right' : 'left'}
          >
            <ListItemText><Typography>{message}</Typography></ListItemText>
          </ListItem>
        ))
        }
      </List >
    </Box>
  );
};

export default Chatbox;
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
    <Box sx={{ flexGrow: 1, maxWidth: '60vw', backgroundColor: 'primary.light', }}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
            Global Chat
          </Typography>
          {username && <ChatForm username={username} onSend={onSend} />}


          <List dense={dense}>
            <ListItem>
              <ListItemAvatar>
                <UserIcon user={'abc'} />
              </ListItemAvatar>
              <ListItemText
                primary={'message'}
                secondary={true ? 'You' : null}
              />
            </ListItem>
            {messages.map(({ self, user, message }, i) => (
              <ListItem>
                {/* <ListItemAvatar>
                  <UserIcon user={user} />
                </ListItemAvatar> */}
                <ListItemText
                  primary={message}
                  secondary={self ? 'You' : null}
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
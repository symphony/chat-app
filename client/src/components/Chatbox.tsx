import React, { FC, ReactElement } from 'react';
import UserIcon from './UserIcon';

import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from '@mui/material';

// = types =
interface ChatboxProps {
  messages: [];
};

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Chatbox: FC<ChatboxProps> = ({ messages }): ReactElement => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            General Chat
          </Typography>
          <Demo>
            <List dense={dense}>
              {messages.map(({ self, user, message }, i) => (
                <ListItem>
                  <ListItemAvatar>
                    <UserIcon user={user} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>)
              )}
            </List>
          </Demo>
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
import React, { FC, ReactElement, useState, FormEventHandler, } from 'react';
import io, { Socket, ServerOptions } from 'socket.io';
import { AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import {
  Box,
  Button,
  TextField,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

// Constants
const buttonStyle = { color: 'white', backgroundColor: 'secondary.dark', '&:hover': { backgroundColor: 'secondary.light', } }

// Helpers
const createSocket = (url?: string, options?: ServerOptions): Server => io(options);

const Login: FC = (): ReactElement => {
  const [username, setUsername] = useState('');
  const [mainSocket, setMainSocket] = createSocket('/');
  let userSocket: Socket | null = null;

  // Functions
  const handleConnect: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setUsername('');
  };

  const handleDisconnect: FormEventHandler = () => {
    return;
  };

  return (
    <Box display='flex' className='login' sx={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'nowrap',
    }}>
      {true && (
        <Box sx={{ display: 'flex', }} >
          <Typography variant='h5' >Please Login</Typography>

          <form className='connect' onSubmit={handleConnect}>
            <AccountCircle />
            <TextField
              label='Username'
              value={username}
              onChange={((e) => { setUsername(e.target.value) })}
              variant='filled'
              color='secondary'
              sx={{ backgroundColor: 'primary.dark', }} />

            <Button variant='contained' type='submit' sx={buttonStyle} >Connect</Button>
          </form>
        </Box>
      )
      }


      {
        true && (
          <form className='disconnect'>
            <Button variant='contained' onClick={handleDisconnect} sx={buttonStyle} >Disconnect</Button>
          </form>
        )
      }
    </Box >
  );
};

export default Login;
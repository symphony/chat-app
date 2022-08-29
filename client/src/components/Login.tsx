import { FC, ReactElement, useState, FormEventHandler, } from 'react';
import { AccountCircle } from '@mui/icons-material';
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

// = types =
interface LoginProps {
  user: string | null;
  onConnect: (username: string) => void;
  onDisconnect: () => void;
};

// = styles =
const buttonStyle = { color: 'white', backgroundColor: 'secondary.dark', '&:hover': { backgroundColor: 'secondary.light', } }


// = main component =
const Login: FC<LoginProps> = ({ user, onConnect, onDisconnect }): ReactElement => {
  // = hooks =
  const [username, setUsername] = useState('');

  // = functions =
  const handleConnect: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // form validation
    if (!username) return;

    onConnect(username);
    setUsername('');
  };

  const handleDisconnect: FormEventHandler = () => {
    onDisconnect();
  };

  // = render =
  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'nowrap',
    }}>
      {!user && (
        <Box sx={{ display: 'flex', }} >
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
      )}


      {user && (
        <form className='disconnect'>
          <Button variant='contained' onClick={handleDisconnect} sx={buttonStyle} >Disconnect</Button>
        </form>
      )}
    </Box >
  );
};

export default Login;
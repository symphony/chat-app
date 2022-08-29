import { FC, ReactElement } from 'react';
import { deepPurple } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';
import {
  Box,
  Link,
  Container,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from '@mui/material';

// = components =
import Login from 'components/Login';
import UserIcon from 'components/UserIcon';

// = types =
interface NavbarProps {
  user: string | null;
  onConnect: (username: string) => void;
  onDisconnect: () => void;
};


// = main component =
const Navbar: FC<NavbarProps> = (props): ReactElement => {
  const { home, profile } = routes;

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'secondary.main',
      }}
    >
      <Container >
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            sx={{
              mr: 2,
            }}
          >
            <Link
              key={home.key}
              component={NavLink}
              to={home.path}
              color='black'
              underline='none'
              variant='button'
            >
              <Typography textAlign='center'>{home.title}</Typography>

            </Link>
          </Typography>
          <Box >

            <Typography
              variant='h6'
              noWrap
              component='div'
            >
            </Typography>

            {props.user && <UserIcon user={props.user} />}
          </Box>
          <Typography variant='h5' >{props.user ? 'Welcome, ' + props.user : 'Please Login'}</Typography>
          <Login {...props} />
        </Toolbar>
      </Container >
    </Box >
  );
};

export default Navbar;
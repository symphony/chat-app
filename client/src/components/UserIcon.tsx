import { FC } from 'react';
import { stringAvatar } from 'helpers';
import { routes } from 'routes';
import { NavLink } from 'react-router-dom';


// = components =
import { Button, Link, Avatar } from '@mui/material';

interface UserIconProps {
  user: string;
};

const { profile } = routes;

const UserIcon: FC<UserIconProps> = ({ user }) => {

  return (
    <Link
      key={profile.key}
      component={NavLink}
      to={profile.path}
      color="black"
      underline="none"
      variant="button"
      sx={{ fontSize: "large", marginLeft: "2rem" }}
    >
      <Button>
        <Avatar {...stringAvatar(user)} />
      </Button>
    </Link>
  )
};

export default UserIcon;
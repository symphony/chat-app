import { FC } from 'react';
import { stringAvatar } from 'helpers';

// = components =
import { Button, Link, Avatar } from '@mui/material';

interface UserIconProps {
  user: string;
};

const UserIcon: FC<UserIconProps> = ({ user }) => {

  return (

    <Button>
      <Avatar {...stringAvatar(user)} />
    </Button>
  )
};

export default UserIcon;
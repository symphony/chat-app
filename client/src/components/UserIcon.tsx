import { FC } from 'react';
import { stringAvatar } from 'helpers';

// = components =
import { Button,  Avatar } from '@mui/material';

interface UserIconProps {
  username: string;
};

const UserIcon: FC<UserIconProps> = ({ username }) => {

  return (
    <Button>
      <Avatar {...stringAvatar(username)} />
    </Button>
  )
};

export default UserIcon;
import React, { ReactElement, FC } from "react";
import { Box, Typography } from '@mui/material';

interface ProfileProps {
  username: string;
  messages: [];
}

const Profile: FC<ProfileProps> = ({ username = '' }): ReactElement => {
  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'primary.dark',
      display: 'flex',
      justifyContent: 'start',
    }}>
      <Typography variant='h5' color='textLight'>User Profile: {username}</Typography>
    </Box>
  );
};

export default Profile;
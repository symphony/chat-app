import React, { ReactElement, FC } from "react";
import { Box, Typography } from '@mui/material';

interface ProfileProps {
  user?: string;
}

const Profile: FC<ProfileProps> = (): ReactElement => {
  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'primary.dark',
      display: 'flex',
      justifyContent: 'start',
    }}>
      <Typography variant='h5' color='textLight'>User Profile</Typography>
    </Box>
  );
};

export default Profile;
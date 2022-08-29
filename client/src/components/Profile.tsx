import React, { ReactElement, FC } from "react";
import { Box, Typography } from '@mui/material';

interface ProfileProps {
  user?: string;
}

const Profile: FC<ProfileProps> = (props) => {
  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'whitesmoke',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant="h3">User Profile</Typography>
    </Box>
  );
};

export default Profile;
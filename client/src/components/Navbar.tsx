import React, { FC, ReactElement } from "react";

// material ui
import { deepPurple } from "@mui/material/colors";
import {
  Box,
  Link,
  Container,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

// app data
import { NavLink } from "react-router-dom";
import { routes } from "../routes";

// components
import Login from "./Login";

const Navbar: FC = (): ReactElement => {
  const { home, profile } = routes;

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
      }}
    >
      <Container >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
            }}
          >
            <Link
              key={home.key}
              component={NavLink}
              to={home.path}
              color="black"
              underline="none"
              variant="button"
            >
              <Typography textAlign="center">{home.title}</Typography>

            </Link>
          </Typography>
          <Box >

            <Typography
              variant="h6"
              noWrap
              component="div"
            >
            </Typography>

            <Link
              key={profile.key}
              component={NavLink}
              to={profile.path}
              color="black"
              underline="none"
              variant="button"
              sx={{ fontSize: "large", marginLeft: "2rem" }}
            >
              <Button><Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar></Button>
            </Link>
          </Box>
          <Login />
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navbar;
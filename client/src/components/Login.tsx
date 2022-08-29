import React, { FC, ReactElement } from "react";
import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { routes } from "../routes";
const { home, profile } = routes;

const Login: FC = (): ReactElement => {


  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
      }}
    >

    </Box>
  );
};

export default Login;
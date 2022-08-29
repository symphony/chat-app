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
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { routes } from "../routes";
const { home, profile } = routes;

const Navbar: FC = (): ReactElement => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
              {profile.title}
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Navbar;
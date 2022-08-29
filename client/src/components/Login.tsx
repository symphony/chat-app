import React, { FC, ReactElement } from "react";
import {
  Box,
  Button,
  TextField,
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
    <Box className='login'>
      <div className="container">
        <header className="col s6 right-align">
          <h4 className="">Please Login</h4>
        </header>

        <form className="row connect col s6">
          <div className="input-field col s8">
            <i className="material-icons prefix">account_circle</i>
            <TextField type="text" name="username" className="validate blue-grey darken-4 white-text text-accent-3"
              maxlength="30" />
            <label for="username" className="">Username</label>
          </div>

          <a href="#" className="col s4">
            <Button variant="contained" type="submit" className="btn waves-effect">Connect</Button>
          </a>
        </form>
      </div>


      <form className="disconnect center-align">
        <a href="#">
          <Button variant="contained" type="button" className="btn waves-effect">Disconnect</Button>
        </a>
      </form>
      <TextField id="outlined-basic" label="Username" variant="outlined" />
      <Button variant="contained">Login</Button>
      <Button variant="contained">Logout</Button>
    </Box>
  );
};

export default Login;
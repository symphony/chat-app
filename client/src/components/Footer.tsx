import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export const Footer: FC<{ lastPong: string | null }> = ({ lastPong }): ReactElement => {
  return (
    <>
      <p>Last pong: {lastPong || '-'}</p>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "secondary.main",
          paddingTop: "0.4rem",
          paddingBottom: "0.4rem",
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="subtitle1" >
                <Link href='https://github.com/symphony/chat-app' target='_blank' display='flex' underline='none'  >
                  <GitHub />{'\u00a0'}{new Date().getFullYear()}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
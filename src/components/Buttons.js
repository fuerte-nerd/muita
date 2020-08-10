import React from "react";
import { Button, Box, Grid } from "@material-ui/core";

const Buttons = () => {
  return (
    <Box align="center">
      <Box my={2}>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <Button variant="outlined">Default</Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Primary
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary">
              Secondary
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Default</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Primary
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container justify="center" spacing={1}>
        <Grid item>
          <Button size="large" variant="outlined">
            Default
          </Button>
        </Grid>
        <Grid item>
          <Button size="large" variant="outlined" color="primary">
            Primary
          </Button>
        </Grid>
        <Grid item>
          <Button size="large" variant="outlined" color="secondary">
            Secondary
          </Button>
        </Grid>
        <Grid item>
          <Button size="large" variant="contained">
            Default
          </Button>
        </Grid>
        <Grid item>
          <Button size="large" variant="contained" color="primary">
            Primary
          </Button>
        </Grid>
        <Grid item>
          <Button size="large" variant="contained" color="secondary">
            Secondary
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Buttons;

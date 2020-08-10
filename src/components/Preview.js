import React from "react";
import { connect } from "react-redux";
import { Box, Container } from "@material-ui/core";
import Text from "./Text";
import Buttons from "./Buttons";
import Anchor from "./Anchor";

const Preview = ({ current }) => {
  return current ? (
    <>
      <Anchor id="preview" />
      <Box
        py={1}
        minHeight="calc(100vh - 48px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Container>
          <Text />
          <Buttons />
        </Container>
      </Box>
    </>
  ) : null;
};

const mapStateToProps = (state) => ({
  current: state.appState.current,
});

export default connect(mapStateToProps)(Preview);

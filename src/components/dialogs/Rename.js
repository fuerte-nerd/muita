import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { setRename, setLoadingScreen } from "../../state/display/actions";
import Theme from "../Theme";
import { setSiteTitleLock } from "../../state/components/actions";

const Rename = ({ dispatch, isOpen, title, current }) => {
  const [siteTitle, setSiteTitle] = useState(title);

  const handleChange = (e) => {
    setSiteTitle(e.currentTarget.value);
  };

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    switch (id) {
      case "cancel":
        handleClose();
        break;
      case "update":
        dispatch(setLoadingScreen(true));
        const theme = new Theme({ ...current, name: siteTitle });
        theme.getImage().then(() =>
          theme.commit().then(() => {
            handleClose();
            dispatch(setSiteTitleLock(true));
            dispatch(setLoadingScreen(false));
          })
        );
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    dispatch(setRename(false));
  };

  useEffect(() => {
    if (isOpen) {
      setSiteTitle(title);
    }
    //eslint-disable-next-line
  }, [isOpen]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={handleClose}
      disableScrollLock={true}
    >
      <DialogTitle disableTypography>
        <Typography variant="h6" style={{ fontFamily: "Roboto" }}>
          Edit site title
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Site Title"
          fullWidth
          defaultValue={siteTitle}
          onChange={handleChange}
          autoFocus
          style={{ fontFamily: "Roboto" }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClick}
          id="cancel"
          style={{ fontFamily: "Roboto" }}
        >
          Cancel
        </Button>{" "}
        <Button
          onClick={handleClick}
          id="update"
          style={{ fontFamily: "Roboto" }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.display.rename,
  title: state.appState.current.name,
  current: state.appState.current,
});

export default connect(mapStateToProps)(Rename);

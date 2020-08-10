import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Select,
  Snackbar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  setFontSelectorOpen,
  setFontSelectorCategories,
  setLoadingScreen,
  setFontSelectorError,
} from "../../state/display/actions";
import { setPastAppStates } from "../../state/appState/actions";
import Theme from "../Theme";

const FontPicker = (props) => {
  const { dispatch } = props;
  const {
    isOpen,
    section,
    error,
    filters,
    fonts,
    body,
    header,
    current,
    past,
    twoFonts,
  } = props;

  const [initialState, setInitialState] = useState();

  useEffect(() => {
    setInitialState(current);
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { id, checked } = e.currentTarget;
    if (checked) {
      dispatch(setFontSelectorCategories([...filters, id]));
    } else {
      dispatch(
        setFontSelectorCategories(
          filters.filter((i) => {
            return i === id ? null : i;
          })
        )
      );
    }
  };

  const handleSelect = (e) => {
    const v = e.currentTarget.value;
    dispatch(setLoadingScreen(true));
    const theme = new Theme({
      ...current,
      [section]: fonts[v],
      fontSelectionMode: "manual",
    });
    theme
      .validateFonts()
      .then(() => theme.commit().then(() => dispatch(setLoadingScreen(false))))
      .catch((err) => {
        console.log("also reached");
        dispatch(setLoadingScreen(false));
        dispatch(setFontSelectorError(true));
      });
  };

  const handleClose = () => {
    if (current !== initialState) {
      dispatch(setPastAppStates([...past, initialState]));
    }
    dispatch(setFontSelectorOpen(false));
  };

  const handleCancel = () => {
    if (current !== initialState) {
      dispatch(setLoadingScreen(true));
      const theme = new Theme(initialState);
      theme.commit().then(() => dispatch(setLoadingScreen(false)));
    }
    dispatch(setFontSelectorOpen(false));
  };

  return (
    <Dialog open={isOpen} maxWidth="lg" onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h5" style={{ fontFamily: "Roboto" }}>
          Select new {twoFonts ? section + " font" : "font"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={() => dispatch(setFontSelectorError(null))}
        >
          <Alert style={{ fontFamily: "Roboto" }} severity="error">
            Sorry, but we were unable to load that font. Please select a
            different font.
          </Alert>
        </Snackbar>
        <Box mb={2}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  id="serif"
                  size="small"
                  onChange={handleChange}
                  checked={isOpen && filters.includes("serif")}
                />
              }
              label="Serif"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="sans-serif"
                  size="small"
                  onChange={handleChange}
                  checked={filters.includes("sans-serif")}
                />
              }
              label="Sans Serif"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="display"
                  size="small"
                  onChange={handleChange}
                  checked={filters.includes("display")}
                />
              }
              label="Display"
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  id="handwriting"
                  size="small"
                  onChange={handleChange}
                  checked={filters.includes("handwriting")}
                />
              }
              label="Handwriting"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="monospace"
                  size="small"
                  onChange={handleChange}
                  checked={filters.includes("monospace")}
                />
              }
              label="Monospace"
            />
          </FormGroup>
        </Box>
        {current && (
          <Select
            fullWidth
            native
            value={section === "body" ? body.id : header.id}
            onChange={handleSelect}
          >
            {fonts.map((font, ind) => {
              return filters.includes(font.category) ? (
                <option key={ind} value={font.id}>
                  {font.family}
                </option>
              ) : null;
            })}
          </Select>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          style={{ fontFamily: "Roboto", textTransform: "uppercase" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          style={{ fontFamily: "Roboto", textTransform: "uppercase" }}
          onClick={handleClose}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.display.fontSelector.isOpen,
  section: state.display.fontSelector.section,
  filters: state.display.fontSelector.categoryFilters,
  error: state.display.fontSelector.error,
  fonts: state.library.fonts,
  twoFonts: state.appState.current.twoFonts,
  body: state.appState.current.body,
  header: state.appState.current.header,
  current: state.appState.current,
  past: state.appState.past,
});

export default connect(mapStateToProps)(FontPicker);

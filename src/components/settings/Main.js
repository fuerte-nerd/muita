import React from "react";
import { connect } from "react-redux";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import {
  Undo,
  Redo,
  Code,
  Save,
  OpenInBrowser,
  Title,
} from "@material-ui/icons";
import Setting from "../Setting";
import {
  setThemeCode,
  setLoadingScreen,
  setSaveOpen,
  setLoad,
  setRename,
} from "../../state/display/actions";
import {
  setPastAppStates,
  setFutureAppStates,
} from "../../state/appState/actions";
import Theme from "../Theme";

const Main = ({ dispatch, past, current, future }) => {
  const handleClick = (e) => {
    let theme;
    const { id } = e.currentTarget;
    switch (id) {
      case "load":
      case "load-btn":
        dispatch(setLoad(true));
        break;
      case "save":
      case "save-btn":
        dispatch(setSaveOpen(true));
        break;
      case "undo":
      case "undo-btn":
        dispatch(setLoadingScreen(true));
        dispatch(setFutureAppStates([current, ...future]));
        theme = new Theme(past[past.length - 1]);
        theme.validateFonts().then(() => {
          theme.commit().then(() => dispatch(setLoadingScreen(false)));
        });

        dispatch(setPastAppStates(past.slice(0, past.length - 1)));

        break;
      case "redo":
      case "redo-btn":
        dispatch(setLoadingScreen(true));
        dispatch(setPastAppStates([...past, current]));
        theme = new Theme(future[0]);
        theme.validateFonts().then(() => {
          theme.commit().then(() => dispatch(setLoadingScreen(false)));
        });
        dispatch(setFutureAppStates(future.slice(1)));
        break;
      case "code":
      case "code-btn":
        dispatch(setThemeCode(true));
        break;
      case "dark":
      case "dark-btn":
        new Theme({
          ...current,
          mode: current.mode === "light" ? "dark" : "light",
        }).commit();
        break;
      case "rename":
      case "rename-btn":
        dispatch(setRename(true));
        break;
      default:
        break;
    }
  };

  return (
    <Setting title="Utility">
      <ListItem id="load" onClick={handleClick} button>
        <ListItemText primary="Load theme" />
        <ListItemSecondaryAction>
          <IconButton edge="end" id="load-btn" onClick={handleClick}>
            <OpenInBrowser />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem id="save" onClick={handleClick} button>
        <ListItemText primary="Save theme" />
        <ListItemSecondaryAction>
          <IconButton edge="end" id="save-btn" onClick={handleClick}>
            <Save />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem
        id="undo"
        onClick={handleClick}
        button
        disabled={past.length === 0}
      >
        <ListItemText primary="Undo" />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            id="undo-btn"
            onClick={handleClick}
            disabled={past.length === 0}
          >
            <Undo />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem
        id="redo"
        onClick={handleClick}
        button
        disabled={future.length === 0}
      >
        <ListItemText primary="Redo" />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            id="redo-btn"
            onClick={handleClick}
            disabled={future.length === 0}
          >
            <Redo />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem id="rename" onClick={handleClick} button>
        <ListItemText primary="Edit site name" secondary={current.name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" id="rename-btn" onClick={handleClick}>
            <Title />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem id="code" onClick={handleClick} button>
        <ListItemText primary="Get the code!" />
        <ListItemSecondaryAction>
          <IconButton edge="end" id="code-btn" onClick={handleClick}>
            <Code />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Setting>
  );
};

const mapStateToProps = (state) => ({
  past: state.appState.past,
  current: state.appState.current,
  future: state.appState.future,
});

export default connect(mapStateToProps)(Main);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Hidden,
} from "@material-ui/core";
import { SettingsBrightness, Settings, Code } from "@material-ui/icons";
import UndoRedo from "./UndoRedo";
import { setSidebar, setThemeCode, setRename } from "../state/display/actions";
import Theme from "./Theme";

const Menu = ({ dispatch, current }) => {
  const [atTop, setAtTop] = useState(true);

  const handleClick = async (e) => {
    const { id } = e.currentTarget;
    switch (id) {
      case "settings":
        dispatch(setSidebar(true));
        break;
      case "mode":
        new Theme({
          ...current,
          mode: current.mode === "light" ? "dark" : "light",
        }).commit();
        break;
      case "code":
        dispatch(setThemeCode(true));
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setAtTop(false) : setAtTop(true);
    });
  }, []);

  return (
    <AppBar color={atTop ? "transparent" : "primary"}>
      <Toolbar
        variant={atTop ? "regular" : "dense"}
        style={{ transition: "all .3s" }}
      >
        <Typography variant="h6" onClick={() => dispatch(setRename(true))}>
          {current.name}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Hidden smDown>
          <UndoRedo />
          <Tooltip title="Toggle dark mode">
            <IconButton id="mode" onClick={handleClick} color="inherit">
              <SettingsBrightness />
            </IconButton>
          </Tooltip>
          <Tooltip title="Get the code!">
            <IconButton id="code" onClick={handleClick} color="inherit">
              <Code />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Tooltip title="Open settings">
          <IconButton
            id="settings"
            onClick={handleClick}
            color="inherit"
            edge="end"
          >
            <Settings />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  current: state.appState.current,
});

export default connect(mapStateToProps)(Menu);

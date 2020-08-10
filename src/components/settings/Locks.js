import React from "react";
import { connect } from "react-redux";
import {
  setBodyFontLock,
  setHeaderFontLock,
  setPaletteLock,
  setHeroImgLock,
  setSiteTitleLock,
} from "../../state/components/actions";
import Setting from "../Setting";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Lock, LockOpen } from "@material-ui/icons";

const Locks = ({ dispatch, locked, twoFonts }) => {
  const handleChange = (e) => {
    const { id } = e.currentTarget;
    switch (id) {
      case "lock-body-font":
      case "lock-body-font-btn":
        return dispatch(setBodyFontLock(!locked.body));
      case "lock-header-font":
      case "lock-header-font-btn":
        return dispatch(setHeaderFontLock(!locked.header));
      case "lock-palette":
      case "lock-palette-btn":
        return dispatch(setPaletteLock(!locked.palette));
      case "lock-hero-img":
      case "lock-hero-img-btn":
        return dispatch(setHeroImgLock(!locked.heroImg));
      case "lock-site-title":
      case "lock-site-title-btn":
        return dispatch(setSiteTitleLock(!locked.siteTitle));
      default:
        return;
    }
  };

  return (
    <Setting title="Lock Elements">
      {twoFonts && (
        <ListItem id="lock-header-font" onClick={handleChange} button>
          <ListItemText primary="Header font" />
          <ListItemSecondaryAction>
            <IconButton
              size="small"
              onClick={handleChange}
              id="lock-header-font-btn"
              edge="end"
            >
              {locked.header ? (
                <Lock style={{ fontSize: "1.5rem" }} />
              ) : (
                <LockOpen style={{ fontSize: "1.5rem" }} />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )}
      <ListItem id="lock-body-font" onClick={handleChange} button>
        <ListItemText primary={twoFonts ? `Body font` : `Font`} />
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            onClick={handleChange}
            id="lock-body-font-btn"
            edge="end"
          >
            {locked.body ? (
              <Lock style={{ fontSize: "1.5rem" }} />
            ) : (
              <LockOpen style={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem id="lock-palette" onClick={handleChange} button>
        <ListItemText primary="Palette" />
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            onClick={handleChange}
            id="lock-palette-btn"
            edge="end"
          >
            {locked.palette ? (
              <Lock style={{ fontSize: "1.5rem" }} />
            ) : (
              <LockOpen style={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem id="lock-site-title" onClick={handleChange} button>
        <ListItemText primary="Site Title" />
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            onClick={handleChange}
            id="lock-site-title-btn"
            edge="end"
          >
            {locked.siteTitle ? (
              <Lock style={{ fontSize: "1.5rem" }} />
            ) : (
              <LockOpen style={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem id="lock-hero-img" onClick={handleChange} button>
        <ListItemText primary="Hero Image" />
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            onClick={handleChange}
            id="lock-hero-img-btn"
            edge="end"
          >
            {locked.heroImg ? (
              <Lock style={{ fontSize: "1.5rem" }} />
            ) : (
              <LockOpen style={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Setting>
  );
};

const mapStateToProps = (state) => ({
  locked: {
    body: state.components.fonts.body.locked,
    header: state.components.fonts.header.locked,
    palette: state.components.palette.locked,
    heroImg: state.components.heroImage.locked,
    siteTitle: state.components.siteTitle.locked,
  },
  twoFonts: state.appState.current.twoFonts,
});

export default connect(mapStateToProps)(Locks);

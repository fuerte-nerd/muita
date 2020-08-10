import { combineReducers } from "redux";

import components from "./components/reducer";
import appState from "./appState/reducer";
import library from "./library/reducer";
import display from "./display/reducer";

export default combineReducers({
  components,
  appState,
  library,
  display,
});

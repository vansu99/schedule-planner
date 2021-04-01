import { createMuiTheme } from "@material-ui/core";
import light from "./light";
import dark from "./dark";
import typography from "./typography";

const typeTheme = [light, dark];

const themes = type =>
  createMuiTheme({
    ...typeTheme[type],
    typography: { ...typography }
  });

export default themes;

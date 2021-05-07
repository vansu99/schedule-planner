import React, { memo } from "react";
import { THEMES } from "configs/constants/app";
import { StorageKeys } from "configs";
import { useGlobalContext } from "contexts/global-context";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

function DarkMode() {
  const { modeTheme, setModeTheme } = useGlobalContext();
  const _handleChangeTheme = () => {
    const type = modeTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setModeTheme(type);
  };

  return (
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      color="inherit"
      title="Change Theme"
      onClick={_handleChangeTheme}
    >
      {JSON.parse(localStorage.getItem(StorageKeys.DARK_MODE)) === THEMES.LIGHT ? (
        <Brightness4Icon fontSize="large" />
      ) : (
        <Brightness7Icon fontSize="large" />
      )}
    </IconButton>
  );
}

export default memo(DarkMode);

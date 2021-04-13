import TopBar from "layout/TopBar";
import Header from "layout/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import DarkMode from "./Header/components/darkMode";
import PropTypes from "prop-types";
import React from "react";

MainLayout.propTypes = {
  children: PropTypes.any
};

MainLayout.defaultProps = {
  children: null
};

function MainLayout({ children }) {
  //const themeSwitcher = useDarkMode();

  return (
    <div className="wrapper">
      <CssBaseline />
      <Header>
        <DarkMode />
      </Header>
      <TopBar />
      <main style={{ paddingTop: "3rem" }}>{children}</main>
    </div>
  );
}

export default MainLayout;

import PropTypes from "prop-types";
import React, { useState } from "react";
import Header from "components/Header";
import FeatureSub from "components/FeatureSup";
import { useDarkMode } from "hooks";

MainLayout.propTypes = {
  children: PropTypes.any
};

MainLayout.defaultProps = {
  children: null
};

function MainLayout({ children }) {
  const themeSwitcher = useDarkMode();

  return (
    <div className="wrapper">
      <Header>{themeSwitcher}</Header>
      <FeatureSub />
      <main style={{ paddingTop: "3rem" }}>{children}</main>
    </div>
  );
}

export default MainLayout;

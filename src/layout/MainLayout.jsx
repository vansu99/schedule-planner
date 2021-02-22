import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

MainLayout.propTypes = {
  children: PropTypes.any,
};

MainLayout.defaultProps = {
  children: null,
};


function MainLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <main>
        {children}
      </main>

    </div>
  )
}


export default MainLayout;


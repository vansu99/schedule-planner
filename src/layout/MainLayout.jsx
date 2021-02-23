import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import FeatureSub from '../components/FeatureSup';

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
      <FeatureSub />
      <main style={{ paddingTop: '3rem' }}>
        {children}
      </main>

    </div>
  )
}


export default MainLayout;


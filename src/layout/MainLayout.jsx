import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <Footer />
    </div>
  )
}


export default MainLayout;


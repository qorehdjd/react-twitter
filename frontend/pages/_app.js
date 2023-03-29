// _app.js 는 페이지의 공통된 부분
import React from 'react';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import Head from 'next/head';

import wrapper from '../store/configureStore';

function App({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);

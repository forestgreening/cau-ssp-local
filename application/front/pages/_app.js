import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withReduxSaga from 'next-redux-saga';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const SSP = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>SSP</title>
    </Head>
    <Component />
  </>
);

SSP.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  // console.log(metric);
}

export default wrapper.withRedux(withReduxSaga(SSP));

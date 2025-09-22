import React from 'react'

import type { AppProps } from "next/app";

import "@styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App;

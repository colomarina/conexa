import type { AppProps } from "next/app";
import "@styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App;

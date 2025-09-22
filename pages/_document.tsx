import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="https://rickandmortyapi.com/favicon-32x32.png" />
        <div>Rick and Morty</div>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

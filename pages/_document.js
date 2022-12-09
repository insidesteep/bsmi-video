import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/img/favicon.png" />

          <link
            href="/vendor/bootstrap/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="/vendor/fontawesome-free/css/all.min.css"
            rel="stylesheet"
            type="text/css"
          />
          {/* <link href="/css/osahan.css" rel="stylesheet" /> */}
          <link rel="stylesheet" href="/vendor/owl-carousel/owl.carousel.css" />
          <link rel="stylesheet" href="/vendor/owl-carousel/owl.theme.css" />
        </Head>
        <body id="main">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

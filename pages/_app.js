import Router from "next/router";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/layouts/layout";
import NProgress from "nprogress";

import config from "../config/config";

const { appUrl, serverPort } = config;

import "../styles/globals.css";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, isAuth = false }) {
  return (
    <Layout isAuth={isAuth}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="Askbootstrap" />
        <meta name="author" content="Askbootstrap" />
      </Head>
      <Script
        type="text/javascript"
        src="/vendor/jquery/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script
        type="text/javascript"
        src="/vendor/bootstrap/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
      <Script
        type="text/javascript"
        src="/vendor/jquery-easing/jquery.easing.min.js"
        strategy="beforeInteractive"
      />
      <Script
        type="text/javascript"
        src="/vendor/owl-carousel/owl.carousel.js"
        strategy="beforeInteractive"
      />
      <Script
        type="text/javascript"
        src="/js/custom.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} isAuth={isAuth} />
    </Layout>
  );
}
export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
  const cookie = ctx.req?.headers.cookie;

  let isAuth = false;

  try {
    const res = await fetch(`${appUrl}:${serverPort}/api/auth`, {
      headers: {
        cookie,
      },
    });

    const result = await res.json();
    console.log(result);

    if (result.success) {
      isAuth = true;
    }
  } catch (error) {
    console.log(error);
  }
  return {
    isAuth,
  };
};

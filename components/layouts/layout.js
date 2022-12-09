import Head from "next/head";
import Footer from "./footer";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Layout = ({ children, title = "", isAuth }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar isAuth={isAuth} />
      <div id="wrapper">
        <Sidebar isAuth={isAuth} />
        <div id="content-wrapper">
          {children}
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default Layout;

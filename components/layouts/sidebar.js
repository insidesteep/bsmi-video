import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = ({ isAuth }) => {
  const { pathname } = useRouter();

  console.log("ISAUTH", isAuth);

  return (
    <ul className="sidebar navbar-nav">
      <li className={`nav-item ${pathname == "/" ? "active" : ""}`}>
        <Link className="nav-link" href="/">
          <i className="fas fa-fw fa-home"></i>
          <span>Главная</span>
        </Link>
      </li>
      {/* <li className={`nav-item ${pathname == "/channels" ? "active" : ""}`}>
        <Link className="nav-link" href="/channels">
          <i className="fas fa-fw fa-users"></i>
          <span>Каналы</span>
        </Link>
      </li> */}
      {/* <li className="nav-item">
        <a className="nav-link" href="single-channel.html">
          <i className="fas fa-fw fa-user-alt"></i>
          <span>Single Channel</span>
        </a>
      </li> */}
      <li
        className={`nav-item ${pathname.includes("/videos") ? "active" : ""}`}
      >
        <Link className="nav-link" href="/videos">
          <i className="fas fa-fw fa-video"></i>
          <span>Все видео</span>
        </Link>
      </li>

      {isAuth && (
        <li className={`nav-item ${pathname == "/authors" ? "active" : ""}`}>
          <Link className="nav-link" href="/authors">
            <i className="fas fa-fw fa-users"></i>
            <span>Авторы</span>
          </Link>
        </li>
      )}

      {isAuth && (
        <li className={`nav-item ${pathname == "/addVideo" ? "active" : ""}`}>
          <Link className="nav-link" href="/addVideo">
            <i className="fas fa-fw fa-cloud-upload-alt"></i>
            <span>Добавить видео</span>
          </Link>
        </li>
      )}
      {/* 
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-fw fa-folder"></i>
          <span>Pages</span>
        </a>
        <div className="dropdown-menu">
          <h6 className="dropdown-header">Login Screens:</h6>
          <a className="dropdown-item" href="login.html">
            Login
          </a>
          <a className="dropdown-item" href="register.html">
            Register
          </a>
          <a className="dropdown-item" href="forgot-password.html">
            Forgot Password
          </a>
          <div className="dropdown-divider"></div>
          <h6 className="dropdown-header">Other Pages:</h6>
          <a className="dropdown-item" href="404.html">
            404 Page
          </a>
          <a className="dropdown-item" href="blank.html">
            Blank Page
          </a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="history-page.html">
          <i className="fas fa-fw fa-history"></i>
          <span>History Page</span>
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="categories.html"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-fw fa-list-alt"></i>
          <span>Categories</span>
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="categories.html">
            Movie
          </a>
          <a className="dropdown-item" href="categories.html">
            Music
          </a>
          <a className="dropdown-item" href="categories.html">
            Television
          </a>
        </div>
      </li>
      <li className="nav-item channel-sidebar-list">
        <h6>SUBSCRIPTIONS</h6>
        <ul>
          <li>
            <a href="subscriptions.html">
              <img className="img-fluid" alt="" src="img/s1.png" /> Your Life
            </a>
          </li>
          <li>
            <a href="subscriptions.html">
              <img className="img-fluid" alt="" src="img/s2.png" /> Unboxing{" "}
              <span className="badge badge-warning">2</span>
            </a>
          </li>
          <li>
            <a href="subscriptions.html">
              <img className="img-fluid" alt="" src="img/s3.png" /> Product /
              Service
            </a>
          </li>
          <li>
            <a href="subscriptions.html">
              <img className="img-fluid" alt="" src="img/s4.png" /> Gaming
            </a>
          </li>
        </ul>
      </li> */}
    </ul>
  );
};

export default Sidebar;

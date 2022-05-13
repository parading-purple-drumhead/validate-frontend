import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const { logout, currentUser } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark main-color">
      <div className="container">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "white", fontSize: "2.5rem" }}
        >
          Validate
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-3">
              <Link
                to="/"
                className={
                  pathname === "/" || pathname.includes("/post")
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="bi bi-house-fill me-2"></i>
                Home
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link
                to="/newPost"
                className={
                  pathname === "/newPost" ? "nav-link active" : "nav-link"
                }
              >
                <i className="bi bi-plus-lg me-2"></i>
                Create Post
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link
                to="/myPosts"
                className={
                  pathname === "/myPosts" ? "nav-link active" : "nav-link"
                }
              >
                <i className="bi bi-person-fill me-2"></i>
                {currentUser.displayName}
              </Link>
            </li>
            <li className="nav-item me-3">
              <a
                className="nav-link"
                href="#"
                id="logoutButton"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

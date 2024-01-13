import "./Navbar.scss";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconAppLogo from "../../../assets/icons/applogo.png";
import IconMenu from "../../../assets/icons/menu.svg";
import IconCloseMenu from "../../../assets/icons/closemenu.svg";

function Navbar() {
  const location = useLocation();
  let navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const reloadPage = () => {
    setClick(false);
    if (location?.pathname === "/customerbrandsinsights") {
      window.location.replace("/customerbrandsinsights");
    } else {
      navigate("/customerbrandsinsights");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", showButton);
    showButton();
  }, []);

  return (
    <div className="navbar-flex-container">
      <div className="navbar-logo-container">
        <Link to="/" onClick={closeMobileMenu}>
          <img className="navbar-logo" src={IconAppLogo} />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <img src={IconCloseMenu} /> : <img src={IconMenu} />}
        </div>
      </div>
      <div className="navbar-menu-container">
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li
            className={`nav-item ${
              location?.pathname == "/customerbrandsinsights"
                ? "menu-active"
                : ""
            }`}
          >
            <Link
              to="/customerbrandsinsights"
              className="nav-links"
              onClick={reloadPage}
            >
              CONSUMER & BRAND INSIGHTS
            </Link>
          </li>
          <li
            className={`nav-item ${
              location?.pathname == "/salesconsumptionanalytics"
                ? "menu-active"
                : ""
            }`}
          >
            <Link
              to="/salesconsumptionanalytics"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              SALES & CONSUMPTION ANALYTICS
            </Link>
          </li>
          <li
            className={`nav-item ${
              location?.pathname == "/trueasuretrove" ? "menu-active" : ""
            }`}
          >
            <Link
              to="/trueasuretrove"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              TREASURE TROVE
            </Link>
          </li>
          <li
            className={`nav-item ${
              location?.pathname == "" ? "menu-active" : ""
            }`}
          >
            <Link to="" className="nav-links" onClick={closeMobileMenu}>
              CONTACT US
            </Link>
          </li>

          <li
            className={`nav-item ${
              location?.pathname == "/createmeeting" ? "menu-active" : ""
            }`}
          >
            <Link
              to="/createmeeting"
              className="nav-links setup-meeting"
              onClick={closeMobileMenu}
            >
              SETUP A MEETING
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
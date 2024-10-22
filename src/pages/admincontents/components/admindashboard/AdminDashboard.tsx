import "../../css/admin.scss";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouter from "../../../../components/common/approuter/AppRouter";

export default function AdminDashboard({ resetSlider }: { resetSlider: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="admin">
        {!location.pathname.includes("/admin/login") && (
          <div className="admin-nav">
            <Link
              className={
                location?.pathname == "/admin/managecontents"
                  ? "admin-menu-active"
                  : ""
              }
              to="/admin/managecontents"
            >
              Manage Contents
            </Link>
            <Link
              className={
                location?.pathname == "/admin/syndicateroom"
                  ? "admin-menu-active"
                  : ""
              }
              to="/admin/syndicateroom"
            >
              Syndicate room
            </Link>
            <Link
              className={
                location?.pathname == "/admin/managemeetings"
                  ? "admin-menu-active"
                  : ""
              }
              to="/admin/managemeetings"
            >
              Manage Meetings
            </Link>
            <Link
              className={
                location?.pathname == "/admin/managemeetinglinks"
                  ? "admin-menu-active"
                  : ""
              }
              to="/admin/managemeetinglinks"
            >
              Manage Meeting Links
            </Link>
            <Link
              className={
                location?.pathname == "/admin/manageadmin"
                  ? "admin-menu-active"
                  : ""
              }
              to="/admin/manageadmin"
            >
              Manage Admin
            </Link>
            <Link
              className={
                location?.pathname == "/admin/managecontactinfo"
                  ? "admin-menu-active"
                  : ""
              }
              to="/admin/managecontactinfo"
            >
              Manage Contact Info
            </Link>
            <span className="logout" onClick={logout}>
              Logout
            </span>
          </div>
        )}
        <div>
          <ToastContainer />
          <AppRouter  resetSlider ={resetSlider}/>
        </div>
      </div>
    </div>
  );
}

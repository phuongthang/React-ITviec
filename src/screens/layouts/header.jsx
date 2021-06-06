import React from "react";
function Header(props) {
    const { userData } = props;
    return (
        <header className="topbar">
            <nav className="navbar top-navbar navbar-expand-md navbar-light">
                <div className="navbar-header">
                    <a className="navbar-brand" href="index.html">
                        <b>
                            <img src="../assets/images/logo-icon.png" alt="homepage" className="dark-logo" />
                            <img src="../assets/images/logo-light-icon.png" alt="homepage" className="light-logo" />
                        </b>
                        <span>
                            <img src="../assets/images/logo-text.png" alt="homepage" className="dark-logo" />
                            <img src="../assets/images/logo-light-text.png" className="light-logo" alt="homepage" />
                        </span>
                    </a>
                </div>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto mt-md-0">
                        <li className="nav-item"> <a className="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark" href="index.html"><i className="mdi mdi-menu" /></a> </li>
                        <li className="nav-item m-l-10"> <a className="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark" href="index.html"><i className="ti-menu" /></a> </li>
                    </ul>
                    <ul className="navbar-nav my-lg-0">
                        <li className="nav-item hidden-sm-down search-box"> <a className="nav-link hidden-sm-down text-muted waves-effect waves-dark" href="index.html"><i className="ti-search" /></a>
                            <form className="app-search">
                                <input type="text" className="form-control" placeholder="Search & enter" /> <a className="srh-btn"><i className="ti-close" /></a> </form>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="flag-icon flag-icon-vn" /></a>
                            <div className="dropdown-menu dropdown-menu-right scale-up">
                                <a className="dropdown-item" href="index.html"><i className="flag-icon flag-icon-us" />English</a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted waves-effect waves-dark" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={"http://localhost:8888/backend-web/public/" + (userData.image ? userData.image : '/local/default.png')} alt="user" className="profile-pic" /></a>
                            <div className="dropdown-menu dropdown-menu-right scale-up">
                                <ul className="dropdown-user">
                                    <li>
                                        <div className="dw-user-box">
                                            <div className="u-img"><img src={"http://localhost:8888/backend-web/public/" + (userData.image ? userData.image : '/local/default.png')} alt="user" /></div>
                                            <div className="u-text">
                                                <h4>{userData.fullname?userData.fullname:userData.username}</h4>
                                                <p className="text-muted">{userData.email}</p></div>
                                        </div>
                                    </li>
                                    <li role="separator" className="divider" />
                                    <li><a href="index.html"><i className="ti-user" /> My Profile</a></li>
                                    <li role="separator" className="divider" />
                                    <li><a href="index.html"><i className="fa fa-power-off" /> Logout</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
export default Header;
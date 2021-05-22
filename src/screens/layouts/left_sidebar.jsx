import { useState } from "react";
import { Link } from "react-router-dom";
import Constants from "../../constants/constants";
import {Collapse} from 'react-collapse';
function LeftSidebar(props) {
    const role = localStorage.getItem('role');
    const id = localStorage.getItem('id');
    return (
        <aside className="left-sidebar">
            <div className="scroll-sidebar">
                <div className="user-profile">
                    <div className="profile-img"> <img src="../assets/images/users/profile.png" alt="user" />
                        <div className="notify setpos"> <span className="heartbit" /> <span className="point" /> </div>
                    </div>
                    <div className="profile-text">
                        <h5>Markarn Doe</h5>
                        <a href="index.html" className="dropdown-toggle u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><i className="mdi mdi-settings" /></a>
                        <a href="pages-login.html" data-toggle="tooltip" title="Logout"><i className="mdi mdi-power" /></a>
                        <div className="dropdown-menu animated flipInY">
                            <div className="dropdown-divider" />
                            <a href="index.html" className="dropdown-item"><i className="ti-settings" />Tài khoản</a>
                            <div className="dropdown-divider" />
                            <Link to={Constants.LINK_URL.LOGIN} className="dropdown-item"><i className="fa fa-power-off" />Đăng xuất</Link>
                        </div>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li className="nav-devider" />
                        {
                            role === Constants.ROLE.ADMIN &&
                            <><li className="nav-small-cap"><h4>Quản trị viên</h4></li>
                                <li> <a className="has-arrow waves-effect waves-dark" to='/dashboard' aria-expanded="false"><i className="mdi mdi-gauge" /><span className="hide-menu">Thông tin cá nhân</span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><Link to={Constants.LINK_URL.PROFILE + `?${id}`}>Thông tin</Link></li>
                                        <li><Link to={Constants.LINK_URL.CHANGE_PASSWORD + `?${id}`}>Đổi mật khẩu</Link></li>
                                        <li><Link to={Constants.LINK_URL.LOGIN}>Đăng xuất</Link></li>
                                    </ul>
                                </li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="#" aria-expanded="false"><i className="mdi mdi-bullseye" /><span className="hide-menu">Quản lý</span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><a href="app-calendar.html">Tài khoản cá nhân</a></li>
                                        <li><a href="app-calendar.html">Tài khoản tổ chức</a></li>
                                        <li><a href="app-calendar.html">Thông tin cá nhân</a></li>
                                        <li><a href="app-calendar.html">Thông tin tuyển dụng</a></li>
                                    </ul>
                                </li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="index.html" aria-expanded="false"><i className="fa fa-sign-out" /><span className="hide-menu">Đăng xuất</span></a>
                                </li>
                            </>
                        }

                        {
                            role === Constants.ROLE.USER &&
                            <>
                                <li className="nav-small-cap"><h4>Cá Nhân</h4></li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="index.html" aria-expanded="false"><i className="mdi mdi-gauge" /><span className="hide-menu">Thông tin cá nhân</span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><Link to={Constants.LINK_URL.PROFILE + `?${id}`}>Thông tin</Link></li>
                                        <li><Link to={Constants.LINK_URL.CHANGE_PASSWORD + `?${id}`}>Đổi mật khẩu</Link></li>
                                        <li><Link to={Constants.LINK_URL.LOGIN}>Đăng xuất</Link></li>
                                    </ul>
                                </li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="index.html" aria-expanded="false"><i className="mdi mdi-bullseye" /><span className="hide-menu">Quản lý</span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><Link to={Constants.LINK_URL.CREATE_CV}>Tạo CV online</Link></li>
                                        <li><a href="app-calendar.html">Nhà tuyển dụng</a></li>
                                    </ul>
                                </li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="index.html" aria-expanded="false"><i className="fa fa-sign-out" /><span className="hide-menu">Đăng xuất</span></a>
                                </li>
                            </>
                        }

                        {
                            role === Constants.ROLE.ORGANIZATION &&
                            <>
                                <li className="nav-small-cap"><h4>Doanh nghiệp</h4></li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="index.html" aria-expanded="false"><i className="mdi mdi-gauge" /><span className="hide-menu">Thông tin cá nhân</span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><Link to={Constants.LINK_URL.PROFILE + `?${id}`}>Thông tin</Link></li>
                                        <li><Link to={Constants.LINK_URL.CHANGE_PASSWORD + `?${id}`}>Đổi mật khẩu</Link></li>
                                        <li><Link to={Constants.LINK_URL.LOGIN}>Đăng xuất</Link></li>
                                    </ul>
                                </li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="#" aria-expanded="false"><i className="mdi mdi-bullseye" /><span className="hide-menu">Quản lý</span></a>
                                    <ul aria-expanded="false" className="collapse">
                                        <li><Link to={Constants.LINK_URL.LIST_JOB + `?organization_id=${id}` }>Danh sách bài viết</Link></li>
                                        <li><Link to={Constants.LINK_URL.CREATE_JOB}>Tạo bài viết</Link></li>
                                        <li><a href="app-calendar.html">Danh sách ứng viên</a></li>
                                    </ul>
                                </li>
                                <li> <a className="has-arrow waves-effect waves-dark" href="index.html" aria-expanded="false"><i className="fa fa-sign-out" /><span className="hide-menu">Đăng xuất</span></a>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
export default LeftSidebar;
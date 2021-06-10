import { useState } from "react";
import { Link } from "react-router-dom";
import Constants from "../../constants/constants";
function LeftSidebar(props) {
    const {userData} = props;
    return (
        <aside className="left-sidebar">
            <div className="scroll-sidebar">
                <div className="user-profile">
                    <div className="profile-img"> <img src={"http://localhost:8888/backend-web/public/" + (userData.image ? userData.image : '/local/default.png')} alt="user" />
                        <div className="notify setpos"> <span className="heartbit" /> <span className="point" /> </div>
                    </div>
                    <div className="profile-text">
                        <h5>{userData.fullname?userData.fullname:userData.username}</h5>
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
                    <ul>
                        <li className="nav-devider" />
                        {
                            userData.role === Constants.ROLE.ADMIN &&
                            <>
                                <li className="nav-small-cap"><h4>Quản trị viên</h4></li>
                                <li> <Link to={Constants.LINK_URL.DASHBOARD} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Trang chủ</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.PROFILE} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Thông tin cá nhân</span></Link></li>
                                <li><Link to={Constants.LINK_URL.USER_MANAGEMENT} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Tài khoản cá nhân</span></Link></li>
                                <li><Link to={Constants.LINK_URL.ORGANIZATION_MANAGEMENT} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Tài khoản doanh nghiệp</span></Link></li>
                                <li><Link to={Constants.LINK_URL.JOB_MANAGEMENT} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Quản lí công việc</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.CHANGE_PASSWORD} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Đổi mật khẩu</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.LOGIN} className="has-arrow waves-effect waves-dark"><i className="fa fa-sign-out" /><span className="hide-menu">Đăng xuất</span></Link></li>
                            </>
                        }

                        {
                            userData.role === Constants.ROLE.USER &&
                            <>
                                <li className="nav-small-cap"><h4>Cá Nhân</h4></li>
                                <li> <Link to={Constants.LINK_URL.DASHBOARD} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Trang chủ</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.PROFILE} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Thông tin cá nhân</span></Link></li>
                                <li><Link to={Constants.LINK_URL.CREATE_CV} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">CV cá nhân</span></Link></li>
                                <li><Link to={Constants.LINK_URL.CONFIRM} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Xác nhận ứng tuyển</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.CHANGE_PASSWORD} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Đổi mật khẩu</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.LOGIN} className="has-arrow waves-effect waves-dark"><i className="fa fa-sign-out" /><span className="hide-menu">Đăng xuất</span></Link></li>
                            </>
                        }

                        {
                            userData.role === Constants.ROLE.ORGANIZATION &&
                            <>
                                <li className="nav-small-cap"><h4>Doanh nghiệp</h4></li>
                                <li> <Link to={Constants.LINK_URL.DASHBOARD} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Trang chủ</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.PROFILE} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Thông tin cá nhân</span></Link></li>
                                <li><Link to={Constants.LINK_URL.ORGANIZATION_INFO + `?organization_id=${userData.id}` } className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Thông tin chi tiết</span></Link></li>
                                <li><Link to={Constants.LINK_URL.LIST_JOB + `?organization_id=${userData.id}` } className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Danh sách bài viết</span></Link></li>
                                <li><Link to={Constants.LINK_URL.CREATE_JOB} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Tạo bài viết</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.CHANGE_PASSWORD} className="has-arrow waves-effect waves-dark"><i className="mdi mdi-gauge" /><span className="hide-menu">Đổi mật khẩu</span></Link></li>
                                <li> <Link to={Constants.LINK_URL.LOGIN} className="has-arrow waves-effect waves-dark"><i className="fa fa-sign-out" /><span className="hide-menu">Đăng xuất</span></Link></li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
export default LeftSidebar;
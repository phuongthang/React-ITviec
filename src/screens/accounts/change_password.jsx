import React, { useEffect } from "react";
import "../../assets/scss/account/change_password.scss";
import { Link } from "react-router-dom";
import Constants from "../../constants/constants";


function ChangePassword(props) {
    useEffect(() => {
        document.title = "Thay đổi mật khẩu";
    }, []);
    return (
        <div className="change-password">
            <div className="main">
                <div className="container b-container" id="b-container" >
                    <form className="form" id="b-form">
                        <h2 className="form_title title">Đổi mật khẩu</h2>
                        <div className="form__icons">
                        </div><span className="form__span">Đổi lại mật khẩu</span>
                        <input className="form__input" type="email"  placeholder="Email" autoComplete="off" required={true} />
                        <input className="form__input" type="password"  placeholder="Mật khẩu cũ" autoComplete="off" required={true} />
                        <input className="form__input" type="password"  placeholder="Mật khẩu mới" autoComplete="off" required={true} />
                        <input className="form__input" type="password"  placeholder="Xác nhận mật khẩu mới" autoComplete="off" required={true} />
                        <Link to={Constants.LINK_URL.DASHBOARD} className="form__link">Trở về trang chủ?</Link>
                        <button type="submit" className="form__button button submit" >Cập nhật</button>
                    </form>
                </div>
                <div className="switch" id="switch-cnt">
                    <div className="switch__circle" />
                    <div className="switch__circle switch__circle--t" />
                    <div className="switch__container" id="switch-c1">
                        <h2 className="switch__title title">Xin chào !</h2>
                        <p className="switch__description description">Nếu bạn cảm thấy mật khẩu hiện tại không an toàn hãy sử dụng chức năng này</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangePassword;
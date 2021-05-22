import React, { useEffect } from "react";
import "../../assets/scss/account/fogot_password.scss";
import { Link } from "react-router-dom";
import Constants from "../../constants/constants";


function ForgotPassword(props) {
    useEffect(() => {
        document.title = "Quên mật khẩu";
    }, []);
    return (
        <div className="forgot-password">
            <div className="main">
                <div className="container b-container" id="b-container" >
                    <form className="form" id="b-form">
                        <h2 className="form_title title">Quên mật khẩu</h2>
                        <div className="form__icons">
                        </div><span className="form__span">Cập nhật lại mật khẩu</span>
                        <input className="form__input" type="email"  placeholder="Email" autoComplete="off" required={true} />
                        <Link to={Constants.LINK_URL.LOGIN} className="form__link">Trở về đăng nhập?</Link>
                        <button type="submit" className="form__button button submit" >Cập nhật</button>
                    </form>
                </div>
                <div className="switch" id="switch-cnt">
                    <div className="switch__circle" />
                    <div className="switch__circle switch__circle--t" />
                    <div className="switch__container" id="switch-c1">
                        <h2 className="switch__title title">Xin chào !</h2>
                        <p className="switch__description description">Nếu bạn quên mật khẩu hãy sử dụng chức năng này</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;
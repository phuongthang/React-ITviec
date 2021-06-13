import React from "react";
import Constants from '../../constants/constants';
import { Link } from 'react-router-dom';
import MainLayout from "../layouts/main_layout";
function Errors(props) {
    return (
        <MainLayout hasHeader={false}>
                <div className="error-box">
                    <div className="error-body text-center">
                        <h1>500</h1>
                        <h3 className="text-uppercase">Internal Server Error !</h3>
                        <p className="text-muted m-t-30 m-b-30">Please try after some time</p>
                        <Link to={Constants.LINK_URL.DASHBOARD} className="btn btn-info btn-rounded waves-effect waves-light m-b-40">Trở về trang chủ</Link>
                    </div>
                </div>
        </MainLayout>
    );
}
export default Errors;
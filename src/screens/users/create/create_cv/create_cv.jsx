import React, { useEffect } from 'react';
import MainLayout from '../../../layouts/main_layout';
import BodyCV from './body_cv';

function CreateCV(props) {
    useEffect(() => {
        document.title = "CV";
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3>CV</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                        <li className="breadcrumb-item">CV</li>
                        <li className="breadcrumb-item active">Tạo</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                            <BodyCV/>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
export default CreateCV;
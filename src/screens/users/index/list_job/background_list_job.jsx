import React, { useEffect } from 'react';
import MainLayout from '../../../layouts/main_layout';
import ListJob from './list_job';

function BackgroundListJob(props) {
    useEffect(() => {
        document.title = "Danh sách công việc";
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3>Danh sách công việc</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                        <li className="breadcrumb-item">Công việc</li>
                        <li className="breadcrumb-item active">Danh sách công việc</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <ListJob/>
            </div>
        </MainLayout>
    );
}
export default BackgroundListJob;
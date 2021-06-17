import React, { useEffect } from 'react';
import MainLayout from '../../layouts/main_layout';
import Create from './create';

function Blog(props) {
    useEffect(() => {
        document.title = "Bài viết";
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Tạo Blog</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item">Blog</li>
                        <li className="breadcrumb-item active">Tạo</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <Create/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
export default Blog;
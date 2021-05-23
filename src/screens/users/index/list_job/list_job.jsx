import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import jobApi from '../../../../api/organization/jobApi';
import Constants from '../../../../constants/constants';
import ModalDeleteJob from './delete_job';
import {convertDate} from "../../../../helpers/helpers"

function ListJob(props) {
    const [listJob, setListJob] = useState(null);
    const [renderListJob, setRenderListJob] = useState();
    const params = {
        organizationId: localStorage.getItem('id'),
    }
    const [idJob, setIdJob] = useState(0);
    const getListJob = (organizationId) => {
        jobApi.indexJob({ organization_id: organizationId }).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setListJob(response.data.jobs);
            }
        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getListJob(params.organizationId);
    }, []);

    const [modalDeleteJob, setModalDeleteJob] = useState(false);
    const toggleModalDeleteJob = (id) => {
        setIdJob(id);
        setModalDeleteJob(!modalDeleteJob);
    };
    useEffect(() => {
        if (listJob) {
            setRenderListJob(listJob.map(item => (
                <div className="col-md-6 col-lg-6 col-xlg-4" key={item.id}>
                    <div className="card card-body">
                        <div className="row">
                            <div className="col-md-4 col-lg-3 text-center" >
                                <a href="#"><img src={"http://localhost:8888/backend-web/public/" + (item.image?item.image:'/local/default.png')} alt="" className="img-circle img-responsive mb-3" /></a>
                                    {
                                        item.status === 3 && <label htmlFor="jobStatus" className="btn btn-sm btn-warning btn-status"><i className="fa fa-clock-o"></i> Hết hạn</label>
                                    }
                                    {
                                        item.status === 2 && <label htmlFor="jobStatus" className="btn btn-sm btn-success btn-status"><i className="fa fa-check-circle"></i> Hoạt động</label>
                                    }
                                    {
                                        item.status === 1 && <label htmlFor="jobStatus" className="btn btn-sm btn-danger btn-status"><i className="fa fa-ban"></i> Chờ</label>
                                    }
                            </div>
                            <div className="col-md-8 col-lg-9">
                                <h3 className="box-title m-b-0">
                                    <label htmlFor="jobTitle">{item.title}</label>
                                </h3>
                                <h5>
                                <label htmlFor="JobPosition" className="m-r-10">{item.position}</label>
                                </h5>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <i className="fa fa-bitcoin text-success m-r-10"></i>
                                        <label htmlFor="jobSalary">{item.salary} USD</label>
                                    </div>
                                    <div className="col-lg-6">
                                        <i className="fa fa-map-marker text-danger m-r-15"></i>
                                        <label htmlFor="jobLocation">{item.location}</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <i className="fa fa-spin fa-clock-o text-warning m-r-10"></i>
                                        <label htmlFor="jobSalary">{convertDate(item.start_date)}</label>
                                    </div>
                                    <div className="col-lg-6">
                                        <i className="fa fa-spin fa-clock-o text-warning m-r-15"></i>
                                        <label htmlFor="jobLocation">{convertDate(item.end_date)}</label>
                                    </div>
                                </div>
                                <div className="box-action text-center d-flex justify-content-center">
                                    <Link to={Constants.LINK_URL.EDIT_JOB + `?id=${item.id}`} className="btn btn-info m-r-15"><i className="fa fa-pencil"></i> Chỉnh sửa</Link>
                                    <Button type="button" className="btn btn-danger text-white" onClick={()=>toggleModalDeleteJob(item.id)}><i className="fa fa-trash-o"></i> Xóa</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )));
        }
    }, [listJob]);
    return (
        <div className="row">
            {
                renderListJob
            }
            <ModalDeleteJob toggle={toggleModalDeleteJob} modal={modalDeleteJob} id={idJob} />
        </div>
    );
}
export default ListJob;
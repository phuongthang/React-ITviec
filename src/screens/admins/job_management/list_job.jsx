import React, { useEffect, useState } from 'react';
import managementApi from '../../../api/admin/managementApi';
import Constants from '../../../constants/constants';
import ReactPaginate from 'react-paginate';
import ModalConfirmDeleteJob from './modal_confirm_delete_job';
import { Button } from 'reactstrap';
import ModalConfirmActiveJob from './modal_confirm_active_job';
import ModalConfirmActiveStatusJob from './modal_confirm_status_job';
import { Link } from "react-router-dom";

function ListJob(props) {
    const [job, setJob] = useState({});
    const [renderTable, setRenderTable] = useState();
    const [jobId, setJobId] = useState();
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [text, setText] = useState();
    const [flagActive, setFlagActive] = useState(null);
    const [flagStatus, setFlagStatus] = useState(null);

    const listJob = () => {
        managementApi.getJob().then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK) {
                    const slice = response.data.jobs.slice(page - 1, page - 1 + limit);
                    setJob(slice);
                    setPageCount(Math.ceil(response.data.jobs.length / limit))
                }
            }
        }, (error) => {

        });
    }

    useEffect(() => {
        listJob();
    }, [page,limit])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    const changeLimit = (e) =>{
        const limit = +e.target.value;
        setLimit(limit);
    }
    const [modalConfirmDeleteJob, setModalConfirmDeleteJob] = useState(false);
    const toggleModalConfirmDeleteJob = (e) => {
        const jobId = e.target.dataset.id;
        setJobId(jobId);
        setModalConfirmDeleteJob(!modalConfirmDeleteJob);
    };
    const [modalConfirmActiveJob, setModalConfirmActiveJob] = useState(false);
    const toggleModalConfirmActiveJob = (e) => {
        const jobId = e.target.dataset.id;
        const active = e.target.dataset.active;
        if(active === '0'){
            setText("Bạn có chắc muốn ghim bài viết này");
            setFlagActive(1);
        }
        else{
            setText("Bạn có chắc muốn hủy ghim bài viết này");
            setFlagActive(0);
        }
        setJobId(+jobId);
        setModalConfirmActiveJob(!modalConfirmActiveJob);
    };
    const [modalConfirmActiveStatusJob, setModalConfirmActiveStatusJob] = useState(false);
    const toggleModalConfirmActiveStatusJob = (e) => {
        const jobId = e.target.dataset.id;
        const status = e.target.dataset.status;
        if(status === '0'){
            setText("Bạn có chắc muốn kích hoạt bài viết này");
            setFlagStatus(1);
        }
        else{
            setText("Bạn có chắc muốn hủy kích hoạt bài viết này");
            setFlagStatus(0);
        }
        setJobId(+jobId);
        setModalConfirmActiveStatusJob(!modalConfirmActiveStatusJob);
    };
    useEffect(() => {
        if (job.length > 0) {
            setRenderTable(job.map(item => (
                <tr key={item.id}>
                    <td>{job.indexOf(item) + 1}</td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.JOB_INFO}?organization_id=${item.organization_id}&job_id=${item.id}`}>{item.title}</Link></td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.organization_id}`}><img src={"http://localhost:8888/backend-web/public" +(item.image ? item.image : '/local/default.png')} alt="organization" className="thumb-md round-img"/> </Link></td>
                    <td>{item.location}</td>
                    <td>
                    {
                        item.status === 1 && <label htmlFor="jobStatus" className="btn btn-sm btn-success btn-status"><i className="fa fa-check-circle"></i> Hoạt động</label>
                    }
                    {
                        item.status === 0 && <label htmlFor="jobStatus" className="btn btn-sm btn-danger btn-status"><i className="fa fa-ban"></i> Chờ</label>
                    }
                    </td>
                    <td>
                    {
                        item.active === 1 && <Button className="btn btn-sm btn-success btn-status" data-id={item.id} data-active={item.active} onClick={toggleModalConfirmActiveJob} ><i className="fa fa-check-circle"></i> Có</Button>
                    }
                    {
                        item.active === 0 && <Button className="btn btn-sm btn-danger btn-status" data-id={item.id} data-active={item.active} onClick={toggleModalConfirmActiveJob} disabled={item.status===0?true:false}><i className="fa fa-ban"></i> Không</Button>
                    }
                    </td>
                    <td><i className="fa fa-thumb-tack m-r-5 text-info cell-click font-20" data-id={item.id} data-status={item.status} onClick={toggleModalConfirmActiveStatusJob}></i></td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.JOB_INFO}?organization_id=${item.organization_id}&job_id=${item.id}`}><i className="fa fa-info m-r-5 text-info cell-click font-20"></i></Link> <i className="fa fa-minus-circle m-l-5 text-danger cell-click font-20" data-id={item.id} onClick={toggleModalConfirmDeleteJob}></i></td>
                </tr>
            )));
        }
    }, [job]);
    useEffect(() => {
        listJob();
    }, []);
    return (
        <>
            <h4 className="card-title">Danh sách tổ chức</h4>
            <div style={{width:'200px'}}>
                <select className="form-control" onChange={changeLimit} value={limit}>
                    <option value={1}>10</option>
                    <option value={2}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <div className="table-responsive m-t-10">
                <table className="table table-bordered table-striped text-center table-management">
                    <thead>
                        <tr className="text-center">
                            <th className="cell-click">STT</th>
                            <th className="cell-click">Công việc</th>
                            <th className="cell-click">Tổ chức</th>
                            <th className="cell-click">Vị trí</th>
                            <th className="cell-click">Trạng thái</th>
                            <th className="cell-click">Ghim</th>
                            <th className="cell-click">Kích hoạt</th>
                            <th className="cell-click">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable}
                    </tbody>
                </table>
                {pageCount > 1 && <div className="d-flex justify-content-center">
                <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
                </div> }
            </div>
            <ModalConfirmDeleteJob
            modal={modalConfirmDeleteJob}
            toggle={toggleModalConfirmDeleteJob}
            id={jobId}/>
            <ModalConfirmActiveJob
            modal={modalConfirmActiveJob}
            toggle={toggleModalConfirmActiveJob}
            id={jobId}
            text={text}
            flag={flagActive}/>
            <ModalConfirmActiveStatusJob
            modal={modalConfirmActiveStatusJob}
            toggle={toggleModalConfirmActiveStatusJob}
            id={jobId}
            text={text}
            flag={flagStatus}/>
        </>
    );
}
export default ListJob;
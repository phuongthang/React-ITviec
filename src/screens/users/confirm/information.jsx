import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import applyApi from '../../../api/user/applyApi';
import Constants from '../../../constants/constants';
import { cutUrlImage, getInfoUserLogin, queryString } from '../../../helpers/helpers';

function Information(props) {
    const userData = getInfoUserLogin();
    const parameters = {
        user_id: userData.id,
    }
    const [confirm, setConfirm] = useState({});
    const [renderTable, setRenderTable] = useState();
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    const listConfirm = (parameters) => {
        applyApi.getConfirm({
            user_id:parameters.user_id
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK) {
                    const slice = response.data.confirms.slice(page - 1, page - 1 + limit);
                    setConfirm(slice);
                    setPageCount(Math.ceil(response.data.confirms.length / limit))
                }
            }
        }, (error) => {

        });
    }

    useEffect(() => {
        listConfirm(parameters);
    }, [page,limit])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    const changeLimit = (e) =>{
        const limit = +e.target.value;
        setLimit(limit);
    }
    useEffect(() => {
        if (confirm.length > 0) {
            setRenderTable(confirm.map(item => (
                <tr key={item.id}>
                    <td>{confirm.indexOf(item) + 1}</td>
                    <td><Link to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.organization_id}`} ><img src={"http://localhost:8888/backend-web/public" +(item.images ? item.images : '/local/default.png')} alt="organization" className="thumb-md round-img"/></Link></td>
                    <td><Link to={`${Constants.LINK_URL.JOB_INFO}?organization_id=${item.organization_id}&job_id=${item.job_id}`} className="text-secondary">{item.title}</Link></td>
                    <td>{item.created_at}</td>
                    <td>
                    {
                        item.status === 1 && <label htmlFor="jobStatus" className="btn btn-sm btn-success btn-status" data-id={item.id}><i className="fa fa-check-circle"></i> Xác nhận</label>
                    }
                    {
                        item.status === 0 && <label htmlFor="jobStatus" className="btn btn-sm btn-danger btn-status" data-id={item.id}><i className="fa fa-ban"></i> Chờ</label>
                    }
                    </td>
                </tr>
            )));
        }
    }, [confirm]);
    useEffect(() => {
        listConfirm(parameters);
    }, []);
    return (
        <>
            <h4 className="card-title">Danh sách công việc ứng tuyển</h4>
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
                            <th className="cell-click">Công ty</th>
                            <th className="cell-click">Công việc</th>
                            <th className="cell-click">Thời gian</th>
                            <th className="cell-click">Trạng thái</th>
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
        </>
    );
}
export default Information;
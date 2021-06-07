import React, { useEffect, useState } from 'react';
import managementApi from '../../../api/admin/managementApi';
import Constants from '../../../constants/constants';
import ReactPaginate from 'react-paginate';
import ModalConfirmDeleteOrganization from './modal_confirm_delete_organization';
import { Link } from "react-router-dom";
import ModalConfirmActiveOrganization from './modal_confirm_active_organization';

function ListOrganization(props) {
    const [organization, setOrganization] = useState({});
    const [renderTable, setRenderTable] = useState();
    const [organizationId, setOrgaizationId] = useState();
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [text, setText] = useState();
    const [flagActive, setFlagActive] = useState(null);
    const listOrganization = () => {
        managementApi.getOrganization().then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK) {
                    const slice = response.data.organizations.slice(page - 1, page - 1 + limit);
                    setOrganization(slice);
                    setPageCount(Math.ceil(response.data.organizations.length / limit))
                }
            }
        }, (error) => {

        });
    }

    useEffect(() => {
        listOrganization();
    }, [page,limit])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    const changeLimit = (e) =>{
        const limit = +e.target.value;
        setLimit(limit);
    }
    const [modalConfirmDeleteOrganization, setModalConfirmDeleteOrganization] = useState(false);
    const toggleModalConfirmDeleteOrganization = (e) => {
        const organizationId = e.target.dataset.id;
        setOrgaizationId(organizationId);
        setModalConfirmDeleteOrganization(!modalConfirmDeleteOrganization);
    };

    const [modalConfirmActiveOrganization, setModalConfirmActiveOrganization] = useState(false);
    const toggleModalConfirmActiveOrganization = (e) => {
        const organizationId = e.target.dataset.id;
        const active = e.target.dataset.active;
        if(active === '0'){
            setText("Bạn có chắc muốn ghim công ty này");
            setFlagActive(1);
        }
        else{
            setText("Bạn có chắc muốn hủy ghim công ty này");
            setFlagActive(0);
        }
        setOrgaizationId(+organizationId);
        setModalConfirmActiveOrganization(!modalConfirmActiveOrganization);
    };
    
    useEffect(() => {
        if (organization.length > 0) {
            setRenderTable(organization.map(item => (
                <tr key={item.id}>
                    <td>{organization.indexOf(item) + 1}</td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.id}`}>{item.fullname}</Link></td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.id}`}><img src={"http://localhost:8888/backend-web/public" +(item.image ? item.image : '/local/default.png')} alt="organization" className="thumb-md round-img"/></Link></td>
                    <td>{item.field}</td>
                    <td>
                    {
                        item.active === 1 && <button className="btn btn-sm btn-success btn-status" data-id={item.id} data-acitve={item.active} onClick={toggleModalConfirmActiveOrganization} ><i className="fa fa-check-circle"></i> Đã kích hoạt</button>
                    }
                    {
                        item.active === 0 && <button className="btn btn-sm btn-danger btn-status" data-id={item.id} data-active={item.active} onClick={toggleModalConfirmActiveOrganization}><i className="fa fa-ban"></i> Kích hoạt</button>
                    }
                    </td>
                    <td><Link to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.id}`}><i className="fa fa-info m-r-5 text-info cell-click font-20"></i></Link> <i className="fa fa-minus-circle m-l-5 text-danger cell-click font-20" data-id={item.id} onClick={toggleModalConfirmDeleteOrganization}></i></td>
                </tr>
            )));
        }
    }, [organization]);
    useEffect(() => {
        listOrganization();
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
                            <th className="cell-click">Tổ chức</th>
                            <th className="cell-click">Ảnh</th>
                            <th className="cell-click">Lĩnh vực</th>
                            <th className="cell-click">Trạng thái</th>
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
            <ModalConfirmDeleteOrganization
            modal={modalConfirmDeleteOrganization}
            toggle={toggleModalConfirmDeleteOrganization}
            id={organizationId}/>
            <ModalConfirmActiveOrganization
            modal={modalConfirmActiveOrganization}
            toggle={toggleModalConfirmActiveOrganization}
            id={organizationId}
            text={text}
            flag={flagActive}/>
        </>
    );
}
export default ListOrganization;
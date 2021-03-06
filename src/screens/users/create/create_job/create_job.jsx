import React, { useEffect, useState } from 'react';
import DistrictApi from '../../../../api/address/getDistrictApi';
import ProvinceApi from '../../../../api/address/getProvinceApi';
import WardApi from '../../../../api/address/getWardApi';
import ExperienceApi from '../../../../api/common/experienceApi';
import LanguageApi from '../../../../api/common/languageApi';
import TypeApi from '../../../../api/common/typeApi';
import jobApi from '../../../../api/organization/jobApi';
import Constants from '../../../../constants/constants';
import { getInfoUserLogin } from '../../../../helpers/helpers';
import MainLayout from '../../../layouts/main_layout';
import LoadingOverlay from '../../../loading/loading_overlay';
import ModalFail from '../../../modal/modal_fail';
import ModalSuccess from '../../../modal/modal_success';

function CreateJob(props) {
    const userData = getInfoUserLogin();
    const [job, setJob] = useState({
        id: userData.id,
        title: '',
        start_date: '',
        end_date: '',
        position: '',
        salary: '',
        language: '',
        description: '',
        location: '',
        required: '',
        count: 1,
        province: 0,
        district: 0,
        ward: 0,
        experience:'1',
        type:'1',
    })
    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setJob((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
    }
    const [renderProvince, setRenderProvince] = useState();
    const [renderDistrict, setRenderDistrict] = useState();
    const [renderWard, setRenderWard] = useState();
    const [renderLanguage, setRenderLanguage] = useState();
    const [renderExperience, setRenderExperience] = useState();
    const [renderType, setRenderType] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const toggleModalSuccess = () => {
        setModalSuccess(!modalSuccess);
    };
    const [modalFail, setModalFail] = useState(false);
    const toggleModalFail = () => {
        setModalFail(!modalFail);
    };
    const getProvinceApi = () => {
        ProvinceApi.getProvinceApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderProvince(response.data.province.map(item => (
                    <option key={item.id} value={item.id}>{item._name}</option>
                )));
            }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }

    useEffect(() => {
        if (job.province !== 0) {
            DistrictApi.getDistrictApi(job.province).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setRenderDistrict(response.data.district.map(item => (
                        <option key={item.id} value={item.id}>{item._name}</option>
                    )));
                }
            }, (error) => {
                props.history.push(Constants.LINK_URL.ERROR);
            })
        }
    }, [job.province])

    useEffect(() => {
        if (job.district !== 0) {
            WardApi.getWardApi(job.district).then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setRenderWard(response.data.ward.map(item => (
                        <option key={item.id} value={item.id}>{item._name}</option>
                    )));
                }
            }, (error) => {
                props.history.push(Constants.LINK_URL.ERROR);
            })
        }
    }, [job.district]);
    const createJob = (params) => {
        jobApi.createJob(params).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setLoadingOverlay(false);
                toggleModalSuccess();
                setDisableSubmit(true);
            }

        }, (error) => {
            setLoadingOverlay(false);
            toggleModalFail();
            setDisableSubmit(false);
        });
    }
    useEffect(() => {
        if (isSubmit && !disableSubmit) {
            const params = {
                title: job.title,
                id: userData.id,
                start_date: job.start_date,
                end_date: job.end_date,
                position: job.position,
                salary: job.salary,
                language: job.language,
                description: job.description,
                location: job.location,
                required: job.required,
                count: job.count,
                province: job.province,
                district: job.district,
                ward: job.ward,
                type:job.type,
                experience:job.experience

            }
            setLoadingOverlay(true);
            createJob(params);
        }
    }, [isSubmit]);
    const getLanguageApi = () => {
        LanguageApi.getLanguageApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderLanguage(response.data.languages.map(item => (
                    <option key={item.id} value={item.id}>{item.language}</option>
                )));
            }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }

    const getExperienceApi = () => {
        ExperienceApi.getExperienceApi().then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setRenderExperience(response.data.experiences.map(item => (
                        <option key={item.id} value={item.id}>{item.experience}</option>
                    )));
                }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }

    const getTypeApi = () => {
        TypeApi.getTypeApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderType(response.data.types.map(item => (
                    <option key={item.id} value={item.id}>{item.type}</option>
                )));
            }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }
    useEffect(() => {
        document.title = "C??ng vi???c";
        getExperienceApi();
        getLanguageApi();
        getTypeApi();
        getProvinceApi();
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3>C??ng vi???c</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Trang ch???</a></li>
                        <li className="breadcrumb-item">C??ng vi???c</li>
                        <li className="breadcrumb-item active">T???o</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card card-outline-info">
                            <div className="card-header">
                                <h4 className="m-b-0">T???o c??ng vi???c</h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-body">
                                        <div className="row p-t-20">
                                            <div className="col-md-12">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">C??ng vi???c :</label>
                                                    <input type="text" className="form-control" required name="title" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Ng??y b???t ?????u :</label>
                                                    <input type="date" className="form-control" required name="start_date" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Ng??y k???t th??c :</label>
                                                    <input type="date" className="form-control" required name="end_date" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">V??? tr?? :</label>
                                                    <input className="form-control" required name="position" onChange={handleChange} />
                                                    <small className="form-control-feedback"> ex : Backend Developer </small></div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Tr??nh ????? :</label>
                                                    <select name="experience" id="experience" className="form-control" onChange={handleChange}>
                                                        {
                                                            renderExperience
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Th??nh ph??? :</label>
                                                    <select name="province" id="province" className="form-control" onChange={handleChange}>
                                                        <option defaultValue>Ch???n Th??nh ph???</option>
                                                        {
                                                            renderProvince
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Qu???n/Huy???n :</label>
                                                    <select name="district" id="district" className="form-control" onChange={handleChange}>
                                                        <option defaultValue>Ch???n Qu???n/Huy???n</option>
                                                        {
                                                            renderDistrict
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">X??/Th??? tr???n :</label>
                                                    <select name="ward" id="ward" className="form-control" onChange={handleChange}>
                                                        <option defaultValue>Ch???n X??/Th??? tr???n</option>
                                                        {
                                                            renderWard
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">?????a ch??? :</label>
                                                    <input type="text" name="location" className="form-control" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Lo???i c??ng vi???c :</label>
                                                    <select name="type" id="type" className="form-control" onChange={handleChange}>
                                                        {
                                                            renderType
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">L????ng :</label>
                                                    <input className="form-control" required name="salary" onChange={handleChange} />
                                                    <small className="form-control-feedback"> ex : 1000 USD </small>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Ng??n ng??? :</label>
                                                    <select name="language" id="language" className="form-control" onChange={handleChange}>
                                                        {
                                                            renderLanguage
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label" >S??? l?????ng :</label>
                                                    <input name="count" type="number" className="form-control" required min={1} defaultValue={1} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label" >M?? t??? :</label>
                                                    <textarea className="form-control" rows={10} required name="description" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group has-secondary">
                                                    <label className="control-label">Y??u c???u :</label>
                                                    <textarea className="form-control" rows={10} required name="required" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center box-action">
                                            <button type="button" className="btn btn-info m-r-10" onClick={() => setIsSubmit(true)} disabled={disableSubmit ? true : false} >T???o</button>
                                            <button type="button" className="btn btn-danger"> H???y</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalSuccess toggle={toggleModalSuccess} modal={modalSuccess} text="????ng k?? b??i vi???t th??nh c??ng !" />
            <ModalFail toggle={toggleModalFail} modal={modalFail} />
            {loadingOverlay && <LoadingOverlay/>}
        </MainLayout>
    );
}
export default CreateJob;
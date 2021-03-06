import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Constants from './constants/constants';
import ChangePassword from './screens/accounts/change_password';
import ForgotPassword from './screens/accounts/forgot_password';
import Login from './screens/accounts/login';
import CVManagement from './screens/admins/cv_management/cv_management';
import JobManagement from './screens/admins/job_management/job_management';
import OrganizationManagement from './screens/admins/organization_management/organization_management';
import UserManagement from './screens/admins/user_management/user_management';
import BlogCreate from './screens/blog/create/blog';
import BlogList from './screens/blog/list/blog';
import BlogShow from './screens/blog/show/blog';
import Dashboard from './screens/dashboard/dashboard';
import Errors from './screens/errors/errors';
import ProtectedRoute from './screens/route/protected_route';
import Search from './screens/search/search';
import SearchOffer from './screens/search_offer/search';
import Confirm from './screens/users/confirm/confirm';
import CreateCV from './screens/users/create/create_cv/create_cv';
import CreateJob from './screens/users/create/create_job/create_job';
import EditJob from './screens/users/edit/edit_job/edit_job';
import ListJob from './screens/users/index/list_job/list_job';
import CVInformation from './screens/users/information/cv_information/cv_information';
import JobInformation from './screens/users/information/job_information/job_information';
import OrganizationInformation from './screens/users/information/organization_information/organization_information';
import UserInformation from './screens/users/information/user_information/user_information';
import OfferManagement from './screens/users/management/management_offer/offer_management';
import Profile from './screens/users/profile/profile';

function App(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={Constants.LINK_URL.LOGIN} component={Login} />
                <Route exact path={Constants.LINK_URL.FORGOT_PASSWORD} component={ForgotPassword} />
                <ProtectedRoute exact path={Constants.LINK_URL.DASHBOARD} component={Dashboard} />
                <ProtectedRoute exact path={Constants.LINK_URL.PROFILE} component={Profile} />
                <ProtectedRoute exact path={Constants.LINK_URL.USER_MANAGEMENT} component={UserManagement} />
                <ProtectedRoute exact path={Constants.LINK_URL.ORGANIZATION_MANAGEMENT} component={OrganizationManagement} />
                <ProtectedRoute exact path={Constants.LINK_URL.CREATE_CV} component={CreateCV} />
                <ProtectedRoute exact path={Constants.LINK_URL.CREATE_JOB} component={CreateJob} />
                <ProtectedRoute exact path={Constants.LINK_URL.EDIT_JOB} component={EditJob} />
                <ProtectedRoute exact path={Constants.LINK_URL.CHANGE_PASSWORD} component={ChangePassword} />
                <ProtectedRoute exact path={Constants.LINK_URL.LIST_JOB} component={ListJob} />
                <ProtectedRoute exact path={Constants.LINK_URL.ORGANIZATION_MANAGEMENT} component={OrganizationManagement} />
                <ProtectedRoute exact path={Constants.LINK_URL.USER_MANAGEMENT} component={UserManagement} />
                <ProtectedRoute exact path={Constants.LINK_URL.JOB_MANAGEMENT} component={JobManagement} />
                <ProtectedRoute exact path={Constants.LINK_URL.USER_INFO} component={UserInformation} />
                <ProtectedRoute exact path={Constants.LINK_URL.ORGANIZATION_INFO} component={OrganizationInformation} />
                <ProtectedRoute exact path={Constants.LINK_URL.JOB_INFO} component={JobInformation} />
                <ProtectedRoute exact path={Constants.LINK_URL.CV_INFO} component={CVInformation} />
                <ProtectedRoute exact path={Constants.LINK_URL.SEARCH} component={Search} />
                <ProtectedRoute exact path={Constants.LINK_URL.CONFIRM} component={Confirm} />
                <ProtectedRoute exact path={Constants.LINK_URL.CV_MANAGEMENT} component={CVManagement} />
                <ProtectedRoute exact path={Constants.LINK_URL.OFFER_MANAGEMENT} component={OfferManagement} />
                <ProtectedRoute exact path={Constants.LINK_URL.SEARCH_OFFER} component={SearchOffer} />
                <ProtectedRoute exact path={Constants.LINK_URL.ERROR} component={Errors} />
                <ProtectedRoute exact path={Constants.LINK_URL.BLOG_CREATE} component={BlogCreate} />
                <ProtectedRoute exact path={Constants.LINK_URL.BLOG_LIST} component={BlogList} />
                <ProtectedRoute exact path={Constants.LINK_URL.BLOG_SHOW} component={BlogShow} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Constants from './constants/constants';
import ChangePassword from './screens/accounts/change_password';
import ForgotPassword from './screens/accounts/forgot_password';
import Login from './screens/accounts/login';
import JobManagement from './screens/admins/job_management/job_management';
import OrganizationManagement from './screens/admins/organization_management/organization_management';
import UserManagement from './screens/admins/user_management/user_management';
import Dashboard from './screens/dashboard/dashboard';
import MainLayout from './screens/layouts/main_layout';
import Search from './screens/search/search';
import CreateCV from './screens/users/create/create_cv/create_cv';
import CreateJob from './screens/users/create/create_job/create_job';
import EditJob from './screens/users/edit/edit_job/edit_job';
import ListJob from './screens/users/index/list_job/list_job';
import CVInformation from './screens/users/information/cv_information/cv_information';
import JobInformation from './screens/users/information/job_information/job_information';
import OrganizationInformation from './screens/users/information/organization_information/organization_information';
import UserInformation from './screens/users/information/user_information/user_information';
import Profile from './screens/users/profile/profile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Constants.LINK_URL.DASHBOARD} component={Dashboard}/>
        <Route exact path={Constants.LINK_URL.LOGIN} component={Login}/>
        <Route exact path={Constants.LINK_URL.FORGOT_PASSWORD} component={ForgotPassword}/>
        <Route exact path={Constants.LINK_URL.PROFILE} component={Profile}/>
        <Route exact path={Constants.LINK_URL.USER_MANAGEMENT} component={UserManagement}/>
        <Route exact path={Constants.LINK_URL.ORGANIZATION_MANAGEMENT} component={OrganizationManagement}/>
        <Route exact path={Constants.LINK_URL.CREATE_CV} component={CreateCV}/>
        <Route exact path={Constants.LINK_URL.CREATE_JOB} component={CreateJob}/>
        <Route exact path={Constants.LINK_URL.EDIT_JOB} component={EditJob}/>
        <Route exact path={Constants.LINK_URL.CHANGE_PASSWORD} component={ChangePassword}/>
        <Route exact path={Constants.LINK_URL.LIST_JOB} component={ListJob}/>
        <Route exact path={Constants.LINK_URL.ORGANIZATION_MANAGEMENT} component={OrganizationManagement}/>
        <Route exact path={Constants.LINK_URL.USER_MANAGEMENT} component={UserManagement}/>
        <Route exact path={Constants.LINK_URL.JOB_MANAGEMENT} component={JobManagement}/>
        <Route exact path={Constants.LINK_URL.USER_INFO} component={UserInformation}/>
        <Route exact path={Constants.LINK_URL.ORGANIZATION_INFO} component={OrganizationInformation}/>
        <Route exact path={Constants.LINK_URL.JOB_INFO} component={JobInformation}/>
        <Route exact path={Constants.LINK_URL.CV_INFO} component={CVInformation}/>
        <Route exact path={Constants.LINK_URL.SEARCH} component={Search}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

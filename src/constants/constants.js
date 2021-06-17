const Constants = {
    LINK_URL:{
        LOGIN: "/",
        FORGOT_PASSWORD: "/forgot-password",
        HOME_PAGE:'/home-page',
        PROFILE:'/profile',
        USER_MANAGEMENT:'/user-management',
        ORGANIZATION_MANAGEMENT:'/organization-management',
        JOB_MANAGEMENT:'/job-management',
        CREATE_CV:'/create-cv',
        CREATE_JOB:'/create-job',
        EDIT_CV:'/edit-cv',
        EDIT_JOB:'/edit-job',
        DASHBOARD:'/dashboard',
        CHANGE_PASSWORD:'/change-password',
        LIST_JOB:'/list-job',
        USER_INFO:'/user-info',
        ORGANIZATION_INFO:'/organization-info',
        CV_INFO:'/cv-info',
        JOB_INFO:'/job-info',
        SEARCH:'/search',
        CONFIRM:'/confirm',
        CV_MANAGEMENT:'/cv-management',
        OFFER_MANAGEMENT:'/offer-management',
        SEARCH_OFFER:'/search-offer',
        ERROR:'/errors',
        BLOG_CREATE:'/blog-create',
        BLOG_LIST:'/blog-list',
        BLOG_SHOW:'/blog-show',

    },
    HTTP_STATUS:{
        OK: 200,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
    },
    ROLE:{
        ADMIN:0,
        USER:1,
        ORGANIZATION:2,
    }
}
export default Constants;
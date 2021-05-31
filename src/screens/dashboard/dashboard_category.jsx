import React, { useEffect } from 'react';
function DashboardCategory(props) {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-tittle text-center mt-3 mb-3">
                        <h2>Browse Top Categories </h2>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-contnet-center">
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-tour" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Design &amp; Creative</a></h5>
                            <span>(653)</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-cms" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Design &amp; Development</a></h5>
                            <span>(658)</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-report" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Sales &amp; Marketing</a></h5>
                            <span>(658)</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-app" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Mobile Application</a></h5>
                            <span>(658)</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-helmet" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Construction</a></h5>
                            <span>(658)</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-high-tech" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Information Technology</a></h5>
                            <span>(658)</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-real-estate" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Real Estate</a></h5>
                            <span>(658)</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-content" />
                        </div>
                        <div className="services-cap">
                            <h5><a href="job_listing.html">Content Writer</a></h5>
                            <span>(658)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center mt-5">
                        <a href="job_listing.html" className="btn btn-outline btn-secondary">Xem tất cả</a>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DashboardCategory;
import { useState } from "react";
import Header from "./header";
import LeftSidebar from "./left_sidebar";
function MainLayout(props) {
    const [isLoader, setIsLoader] = useState(true);
    setTimeout(() => {
        setIsLoader(false);
    }, 1000);

    return (
        <div>
            {
            isLoader && 
            <div className="preloader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx={50} cy={50} r={20} fill="none" strokeWidth={2} strokeMiterlimit={10} />
                </svg>
            </div>
            }
            <div id="main-wrapper">
                {props.hasHeader && <Header />}
                {props.hasLeftSidebar && <LeftSidebar />}
                <div className="page-wrapper">
                    {props.children}
                    <footer className="footer">
                        © 2021 Phuong Cong Thang
                    </footer>
                </div>
            </div>
        </div>
    );
}
MainLayout.defaultProps = {
    hasHeader: true,
    hasLeftSidebar: true,
};
export default MainLayout;
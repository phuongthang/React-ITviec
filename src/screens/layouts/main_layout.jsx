import { useState } from "react";
import { getInfoUserLogin } from "../../helpers/helpers";
import LoadingOverlay from "../loading/loading_overlay";
import Header from "./header";
import LeftSidebar from "./left_sidebar";
function MainLayout(props) {
    const [isLoader, setIsLoader] = useState(true);
    setTimeout(() => {
        setIsLoader(false);
    }, 1000);
    const userData = getInfoUserLogin();
    return (
        <div>
            {
            isLoader && <LoadingOverlay/>
            }
            <div id="main-wrapper">
                {props.hasHeader && <Header userData={userData}/>}
                {props.hasLeftSidebar && <LeftSidebar userData={userData} />}
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
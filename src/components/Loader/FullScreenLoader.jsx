import {useSelector} from "react-redux";
import {selectLoader} from "../../redux/features/settings/settingsSlice.js";


const FullScreenLoader = () => {
    const loader = useSelector(selectLoader);

    return (
        <>
            <div className={loader+" LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"/>
                </div>
            </div>
        </>
    );
};

export default FullScreenLoader;
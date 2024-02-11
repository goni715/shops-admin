import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {SetCategoryCreateModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useCreateCategoryMutation} from "../../redux/features/category/categoryApi.js";
import {useEffect, useState} from "react";


const CategoryCreateModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.categoryCreateModalOpen);
    const [categoryName, setCategoryName] = useState("")
    const [createCategory, {isSuccess,isLoading}] = useCreateCategoryMutation();


    const handleOk = () => {
        dispatch(SetCategoryCreateModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetCategoryCreateModalOpen(false));
        setCategoryName("");
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetCategoryCreateModalOpen(false));
            setCategoryName("");
        }
    },[isSuccess, dispatch])



    //update receive account
    const handleCreate = () => {
        createCategory({categoryName});
    }

    return (
        <>
            <Modal title="Create New Category" open={modalOpen} onOk={handleOk}>
                <div>
                    <div className="pt-2">
                        <label className="block pb-2" htmlFor="name">
                            Name
                        </label>
                        <input onChange={(e)=>setCategoryName(e.target.value)} value={categoryName} className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text" id="name"/>
                    </div>
                    <div className="flex mt-6 gap-6">
                        <button onClick={handleCancel} className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button onClick={handleCreate} disabled={isLoading} className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isLoading ? "Processing..." : "Create"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CategoryCreateModal;
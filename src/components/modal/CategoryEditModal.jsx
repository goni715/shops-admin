import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {SetCategoryEditModalOpen} from "../../redux/features/modal/modalSlice.js";
import {SetCategoryName} from "../../redux/features/category/categorySlice.js";
import {useUpdateCategoryMutation} from "../../redux/features/category/categoryApi.js";
import {useEffect} from "react";


const CategoryEditModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.categoryEditModalOpen);
    const {categoryId, categoryName} = useSelector(state=>state.category);
    const [updateCategory, {isSuccess,isLoading}] = useUpdateCategoryMutation();


    const handleOk = () => {
        dispatch(SetCategoryEditModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetCategoryEditModalOpen(false));
    };


    useEffect(()=>{
        if(isSuccess){
            dispatch(SetCategoryEditModalOpen(false));
        }
    },[isSuccess, dispatch])



    //update receive account
    const handleUpdate = () => {
        updateCategory({
            id:categoryId,
            data:{
                categoryName
            }
        })
    }
    
    return (
        <>
       <Modal title="Edit Category Name" open={modalOpen} onOk={handleOk}>
        <div>
            <div className="pt-2">
                <label className="block pb-2" htmlFor="name">
                    Name
                </label>
                <input onChange={(e)=>dispatch(SetCategoryName(e.target.value))} value={categoryName} className="w-full outline-none border border-gray-400 px-4 py-2 rounded-md" type="text" id="name"/>
            </div>
            <div className="flex mt-6 gap-6">
                <button onClick={handleCancel} className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                </button>
                <button onClick={handleUpdate} disabled={isLoading} className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isLoading ? "Processing..." : "Save Change"}
                </button>
            </div>
        </div>
        </Modal>
        </>
    );
};

export default CategoryEditModal;
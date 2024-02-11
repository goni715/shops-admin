import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {SetCategoryDeleteModalOpen, SetCategoryEditModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useDeleteCategoryMutation, useUpdateCategoryMutation} from "../../redux/features/category/categoryApi.js";
import {useEffect} from "react";


const CategoryDeleteModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state)=>state.modal.categoryDeleteModalOpen);
    const {categoryId} = useSelector(state=>state.category);
    const [deleteCategory, {isSuccess,isLoading}] = useDeleteCategoryMutation();


    const handleOk = () => {
        dispatch(SetCategoryDeleteModalOpen(false));
    };
    const handleCancel = () => {
        dispatch(SetCategoryDeleteModalOpen(false));
    };

    useEffect(()=>{
        if(isSuccess){
            dispatch(SetCategoryDeleteModalOpen(false));
        }
    },[isSuccess, dispatch])


    const handleDelete = () => {
        deleteCategory(categoryId);
    }

    return (
        <>
            <Modal title="Are you sure? You want to delete." open={modalOpen} onOk={handleOk}>
                <div>
                    <div className="flex mt-6 gap-6 pt-5">
                        <button onClick={handleCancel} className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </button>
                        <button onClick={handleDelete} disabled={isLoading} className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isLoading ? "Processing..." : "Yes"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CategoryDeleteModal;
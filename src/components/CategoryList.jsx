import {Table} from "antd";
import ListLoading from "./Loader/ListLoading.jsx";
import {useGetCategoriesQuery} from "../redux/features/category/categoryApi.js";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {useDispatch} from "react-redux";
import {
    SetCategoryEditModalOpen,
    SetCategoryDeleteModalOpen,
    SetCategoryCreateModalOpen
} from "../redux/features/modal/modalSlice.js";
import CategoryEditModal from "./modal/CategoryEditModal.jsx";
import {SetCategoryId, SetCategoryName} from "../redux/features/category/categorySlice.js";
import CategoryDeleteModal from "./modal/CategoryDeleteModal.jsx";
import CategoryCreateModal from "./modal/CategoryCreateModal.jsx";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Edit",
        dataIndex: "edit",
    },
    {
        title: "Delete",
        dataIndex: "delete",
    },
];

const CategoryList = () => {
    const dispatch = useDispatch();
    const {data, isLoading, isError, error} = useGetCategoriesQuery();
    const categories = data?.data || [];


    //decision how to render
    let content = null;


    if (!isLoading && isError) {
        content = (
            <h1>some error occured</h1>
        );

    }

    const tableData = [];


    if (!isLoading && !isError && categories?.length > 0) {
        for (let i = 0; i < categories.length; i++) {
            tableData.push({
                key: Number(i + 1),
                name: categories[i]?.categoryName,
                edit: (
                    <>
                        <button
                            onClick={()=>{
                                dispatch(SetCategoryId(categories[i]?._id))
                                dispatch(SetCategoryName(categories[i]?.categoryName))
                                dispatch(SetCategoryEditModalOpen(true));
                            }}
                            className="bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold text-md rounded-md">
                            <FaEdit size={25}/>
                        </button>
                    </>
                ),
                delete: (
                    <>
                        <button
                            onClick={()=>{
                                dispatch(SetCategoryId(categories[i]?._id))
                                dispatch(SetCategoryDeleteModalOpen(true));
                            }}
                            className="bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold text-md rounded-md">
                            <AiFillDelete size={25}/>
                        </button>
                    </>
                ),
            });
        }

    }


    return (
        <>
            <div>
                <h1 className="text-center text-3xl font-bold mb-3">Category List</h1>

                {
                    isLoading ? (
                        <>
                            <ListLoading/>
                        </>
                    ) : (
                        <>
                            <div className="w-auto overflow-x-auto flex justify-end py-4">
                                <button
                                    onClick={() => {
                                        // alert("hekk")
                                        dispatch(SetCategoryCreateModalOpen(true));
                                    }}
                                    className="ml-3 bg-indigo-500 hover:bg-indigo-700 px-2 py-2 text-white font-bold text-md rounded-md">
                                    Create New Category
                                </button>
                            </div>

                            <div className="w-auto overflow-x-auto">
                                <Table columns={columns} dataSource={tableData}/>
                            </div>
                        </>
                    )
                }
            </div>

            <CategoryEditModal/>
            <CategoryDeleteModal/>
            <CategoryCreateModal/>
        </>
    )
        ;
};

export default CategoryList;
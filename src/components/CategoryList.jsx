import {Table} from "antd";
import ListLoading from "./Loader/ListLoading.jsx";
import {useGetCategoriesQuery} from "../redux/features/category/categoryApi.js";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";

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
                            className="bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold text-md rounded-md">
                            <FaEdit size={25}/>
                        </button>
                    </>
                ),
                delete: (
                    <>
                        <button
                            className="ml-3 bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold text-md rounded-md">
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
                    isLoading? (
                        <>
                            <ListLoading/>
                        </>
                    ) : (
                        <div className="w-auto overflow-x-auto">
                            <Table columns={columns} dataSource={tableData}/>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default CategoryList;
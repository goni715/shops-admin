import {Table} from "antd";
import ListLoading from "../Loader/ListLoading.jsx";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {useGetProductsQuery} from "../../redux/features/product/productApi.js";
import {Link} from "react-router-dom";
import {SetProductDeleteModalOpen} from "../../redux/features/modal/modalSlice.js";
import {useDispatch} from "react-redux";
import {SetProductId} from "../../redux/features/product/productSlice.js";
import ProductDeleteModal from "../modal/ProductDeleteModal.jsx";

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
        title: "Image",
        dataIndex: "image",
    },
    {
        title: "Category",
        dataIndex: "category",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Action",
        dataIndex: "action",
    }
]

const ProductList = () => {
    const dispatch = useDispatch();
    const {data, isLoading, isError, error} = useGetProductsQuery();
    const products = data?.data || [];


    //decision how to render
    let content = null;


    if (!isLoading && isError) {
        content = (
            <h1>some error occured</h1>
        );

    }

    const tableData = [];


    if (!isLoading && !isError && products?.length > 0) {
        for (let i = 0; i < products.length; i++) {
            tableData.push({
                key: Number(i + 1),
                name: products[i]?.productName,
                image: (
                    <>
                        <img className="w-[60px] h-[60px]" src={products[i]?.image1} alt=""/>
                    </>
                ),
                category: products[i]?.categoryName,
                price: products[i]?.price,
                action: (
                    <>
                        <div className="flex gap-4">
                            <Link
                                to={`/update-product/${products[i]?._id}`}
                                className="bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold text-md rounded-md">
                                <FaEdit size={25}/>
                            </Link>

                            <button
                                onClick={()=>{
                                    dispatch(SetProductId(products[i]?._id))
                                    dispatch(SetProductDeleteModalOpen(true));
                                }}
                                className="bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold text-md rounded-md">
                                <AiFillDelete size={25}/>
                            </button>
                        </div>
                    </>
                ),
            });
        }

    }


    return (
        <>
            <div>
                <h1 className="text-center text-3xl font-bold mb-3">Product List</h1>
                {
                    isLoading ? (
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

            <ProductDeleteModal/>
        </>
    );
};

export default ProductList;
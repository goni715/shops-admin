import {useEffect, useState} from "react";
import {useGetCategoriesQuery} from "../../redux/features/category/categoryApi.js";
import convertToBase64 from "../../helper/convertToBase64.js";
import {IoMdClose} from "react-icons/io";
import {
    useDeleteProductImageMutation, useUpdateProductMutation,
    useUpdateProductWithImageMutation
} from "../../redux/features/product/productApi.js";
import {useNavigate} from "react-router-dom";


const EditForm = ({product}) => {
    const {
        _id,
        productName:initialProductName,
        categoryId: initialCategoryId,
        description: initialDescription,
        price: initialPrice,
        quantity: initialQuantity,
        image:product_img
    } = product || {};


    const {public_id, image_url} = product_img || {};

    const [productName, setProductName] = useState(initialProductName);
    const [categoryId, setCategoryId] = useState(initialCategoryId?._id);
    const [description, setDescription] = useState(initialDescription);
    const [price, setPrice] = useState(initialPrice);
    const [quantity, setQuantity] = useState(initialQuantity);
    const {data} = useGetCategoriesQuery();
    const categories = data?.data || [];
    const [image, setImage] = useState("");
    const [file, setFile] = useState("");
    const [deleteProductImage] = useDeleteProductImageMutation();
    const [updateProductWithImage, {isLoading:Loading, isSuccess:success}] = useUpdateProductWithImageMutation();
    const [updateProduct, {isLoading, isSuccess}] = useUpdateProductMutation();

    const navigate = useNavigate();

    useEffect(()=>{
        if(isSuccess || success){
            navigate('/product-list');
        }
    },[navigate,success, isSuccess]);



    const handleDeleteImage = () => {
       deleteProductImage({
           id:_id,
           data:{
               public_id: public_id
           }
       })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if(image===""){
            updateProduct({
                id:_id,
                data: {
                    productName,
                    categoryId,
                    price,
                    quantity,
                    description
                }
            });
        }
        else{
            let formData = new FormData();
            formData.append("image", image);
            formData.append("productName", productName);
            formData.append("categoryId", categoryId);
            formData.append("price", price);
            formData.append("quantity", quantity);
            formData.append("description", description);
            updateProductWithImage({
                id:_id,
                data: formData
            });
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="px-4 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Product Name</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="name" placeholder="your first name"/>
                    </div>
                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Select Category</label>
                        <select
                            value={categoryId}
                            onChange={(e)=>setCategoryId(e.target.value)}
                            className="w-full bg-white px-4 py-2 rounded-md focus:outline-none border border-gray-400">
                            <option value="">Select Category</option>
                            {
                                categories?.length > 0 && (
                                    categories.map((item, i) => {
                                        return (
                                            <>
                                                <option value={item?._id}>{item?.categoryName}</option>
                                            </>
                                        )
                                    })
                                )
                            }
                        </select>
                    </div>

                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Price</label>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="name" placeholder="your first name"/>
                    </div>

                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Quantity</label>
                        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="name" placeholder="your first name"/>
                    </div>


                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="des">Description</label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="des" placeholder="description"/>
                    </div>


                    {
                        image_url ? (
                            <>
                                <div className="md:col-span-2 grid grid-cols-1 mt-5">
                                    <div className="w-[200px] h-[200px] relative">
                                        <img className="w-[200px] h-[200px]" src={image_url} alt="product_img"/>
                                        <p
                                            onClick={handleDeleteImage}
                                            className="close-btn bg-black p-2 rounded-md absolute top-0 -right-11"
                                        >
                                            <IoMdClose className="mobile-nav-icon text-white cursor-pointer" size={30}/>
                                        </p>
                                    </div>
                                </div>
                            </>

                        ) : (
                            <>
                                {file ==="" ? (
                                        <>
                                            <div className="md:col-span-2 grid grid-cols-1 mt-5">
                                                <label
                                                    htmlFor="photo"
                                                    className="bg-gray-800 md:w-1/2 cursor-pointer text-center inline-block hover:bg-white text-white hover:text-gray-800 font-semibold py-2 px-4 border border-gray-400 duration-300 rounded shadow">
                                                    Upload Photo
                                                </label>
                                                <input
                                                    onChange={async (e) => {
                                                        // console.log(e.target.files[0])
                                                        const base64 = await convertToBase64(e.target.files[0]);
                                                        setFile(base64);
                                                        setImage(e.target.files[0]);
                                                    }}
                                                    type="file"
                                                    id="photo"
                                                    hidden
                                                />
                                            </div>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <div className="md:col-span-2 md:w-1/2 grid place-items-center mt-5">
                                                <div className="w-[200px] h-[200px] relative">
                                                    <img className="w-[200px] h-[200px]" src={file} alt="product_img"/>
                                                    <button
                                                        onClick={() => {
                                                            setFile("");
                                                            setImage("");
                                                        }}
                                                        className="close-btn bg-black p-2 rounded-md absolute top-0 -right-11"
                                                    >
                                                        <IoMdClose className="mobile-nav-icon text-white cursor-pointer" size={30}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        )
                    }


                </div>
                <div className="flex mt-6">
                    <button
                        disabled={Loading || isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white font-bold disabled:cursor-not-allowed text-md rounded-md">
                        {
                            Loading===true || isLoading===true ? (
                                "Processing..."
                            ): (
                                "Update"
                            )
                        }
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditForm;
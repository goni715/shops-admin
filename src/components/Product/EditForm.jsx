import {useState} from "react";
import {useGetCategoriesQuery} from "../../redux/features/category/categoryApi.js";


const EditForm = () => {
    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const {data, isLoading, isError, error} = useGetCategoriesQuery();
    const categories = data?.data || [];


    return (
        <>
            <form action="" className="px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Product Name</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="name" placeholder="your first name"/>
                    </div>
                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Select Category</label>
                        <select
                            className="w-full bg-white px-4 py-2 rounded-md focus:outline-none border border-gray-400">
                            <option value="">Select Category</option>
                            {
                                categories?.length > 0 && (
                                    categories.map((item, i) => {
                                        return (
                                            <>
                                                <option value="">{item?.categoryName}</option>
                                            </>
                                        )
                                    })
                                )
                            }
                        </select>
                    </div>

                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Price</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="name" placeholder="your first name"/>
                    </div>

                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="name">Quantity</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="name" placeholder="your first name"/>
                    </div>

                    <div>
                        <label className="inline-block pb-2 text-md" htmlFor="des">Description</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} required
                               className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                               type="text" id="des" placeholder="description"/>
                    </div>

                </div>
                <div className="flex justify-end mt-3">
                    <button
                        className="ml-3 bg-primary px-3 py-2 text-white font-bold text-md rounded-md">
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditForm;
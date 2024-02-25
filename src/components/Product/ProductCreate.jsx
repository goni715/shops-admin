import {useEffect, useState} from "react";
import {useGetCategoriesQuery} from "../../redux/features/category/categoryApi.js";
import convertToBase64 from "../../helper/convertToBase64.js";
import {ErrorToast} from "../../helper/ValidationHelper.js";
import {useCreateProductMutation} from "../../redux/features/product/productApi.js";
import {IoMdClose} from "react-icons/io";
import {useNavigate} from "react-router-dom";


const ProductCreate = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const {data} = useGetCategoriesQuery();
    const categories = data?.data || [];
    const [image, setImage] = useState("");
    const [file, setFile] = useState("");
    const [createProduct, {isLoading, isSuccess}] = useCreateProductMutation();

    useEffect(()=>{
        if(isSuccess){
            navigate('/product-list');
        }
    },[navigate,isSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(image===""){
            ErrorToast("Select a photo");
        }
        else{
            let formData = new FormData();
            formData.append("image", image);
            formData.append("productName", productName);
            formData.append("categoryId", categoryId);
            formData.append("price", price);
            formData.append("quantity", quantity);
            formData.append("description", description);
            createProduct(formData);
        }

    }


    return (
        <>
          <form onSubmit={handleSubmit}>
              <h1 className="text-center text-2xl font-bold py-6">Create New Product</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
                  <div>
                      <label className="inline-block pb-2 text-md" htmlFor="name">Product Name</label>
                      <input value={productName} onChange={(e) => setProductName(e.target.value)} required
                             className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                             type="text" id="name" placeholder="product name"/>
                  </div>

                  <div>
                      <label className="inline-block pb-2 text-md" htmlFor="name">Price</label>
                      <input value={price} onChange={(e) => setPrice(e.target.value)} required
                             className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                             type="text" id="name" placeholder="enter price"/>
                  </div>
                  <div>
                      <label className="inline-block pb-2 text-md" htmlFor="name">Select Category</label>
                      <select
                          value={categoryId}
                          onChange={(e)=>setCategoryId(e.target.value)}
                          className="w-full bg-white px-4 py-2 rounded-md focus:outline-none border border-gray-400" required>
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
                      <label className="inline-block pb-2 text-md" htmlFor="name">Quantity</label>
                      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} required
                             className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                             type="text" id="name" placeholder="enter quantity"/>
                  </div>
                  <div>
                      <label className="inline-block pb-2 text-md" htmlFor="des">Description</label>
                      <input value={description} onChange={(e) => setDescription(e.target.value)} required
                             className="w-full px-4 py-2 rounded-md focus:outline-none border border-gray-400"
                             type="text" id="des" placeholder="write here"/>
                  </div>

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

              </div>
              <div className="grid grid-cols-1 pb-8">
                  <button disabled={isLoading}
                          className="w-full bg-blue-500 hover:bg-blue-700 py-2 font-bold px-4 text-white disabled:cursor-not-allowed rounded-md duration-300">
                      {isLoading ? "Processing..." : "Create Product"}
                  </button>
              </div>
          </form>
        </>
    );
};

export default ProductCreate;
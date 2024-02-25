import ProductLoading from "../Loader/ProductLoading.jsx";
import {useGetProductQuery} from "../../redux/features/product/productApi.js";
import EditForm from "./EditForm.jsx";
import {useParams} from "react-router-dom";


const ProductEdit = () => {
    const {id} = useParams();
    const {data, isLoading, isError, error} = useGetProductQuery(id);
    const product = data?.data || {};

    if (isLoading) {
        return (
            <>
                <div>
                    <h1 className="text-center text-2xl font-bold py-6">Update Product</h1>
                    <ProductLoading/>
                </div>
            </>
        )
    }

    if (!isLoading && !isError && product?._id) {
        return (
            <>
                <div>
                    <h1 className="text-center text-2xl font-bold py-6">Update Product</h1>
                    <EditForm product={product}/>
                </div>
            </>
        )
    }
};

export default ProductEdit;

import Layout from "../components/Layout/Layout.jsx";
import ProductEdit from "../components/Product/ProductEdit.jsx";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";


const ProductEditPage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);


    return (
        <>
            <Layout>
                <ProductEdit/>
            </Layout>
        </>
    );
};

export default ProductEditPage;
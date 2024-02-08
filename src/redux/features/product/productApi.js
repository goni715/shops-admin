import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast} from "../../../helper/ValidationHelper.js";


export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/product/get-all-product`,
            keepUnusedDataFor: 600,
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    ErrorToast("Something Went Wrong!");
                    //do nothing
                    console.log(err);
                }
            },
        }),
    }),
})


export const {useGetProductsQuery} = productApi;
import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast} from "../../../helper/ValidationHelper.js";


export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `/category/get-all-category`,
            keepUnusedDataFor: 600,
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
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


export const {useGetCategoriesQuery} = categoryApi;
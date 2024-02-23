import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";


export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `/category/get-all-category`,
            providesTags: ["CategoryList"],
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
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/category/create-category",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["CategoryList"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Category Create Success");
                    }
                }catch(err) {
                    console.log(err)
                    if(err?.error?.data?.data?.keyPattern){
                        if(err?.error?.data?.data?.keyPattern['slug'] === 1){
                            ErrorToast("Failled! This Category Already Created")
                        }
                    }
                }
            }
        }),
        updateCategory: builder.mutation({
            query: ({id,data}) => ({
                url: `/category/update-category/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["CategoryList"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast("Update Success");
                    }
                }catch(err) {
                    console.log(err)
                    if(err?.error?.data?.data?.keyPattern){
                        if(err?.error?.data?.data?.keyPattern['slug'] === 1){
                            ErrorToast("Failld! This Category Already Existed")
                        }
                    }
                }
            }
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/delete-category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["CategoryList"],
            async onQueryStarted(arg, {queryFulfilled}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        SuccessToast(" Success");
                    }
                }catch(err) {
                    console.log(err);
                    let status = err?.error?.status;
                    if(status === 403){
                        ErrorToast("Failld ! This category is associated with Product");
                    }

                }
            }
        }),
    }),
})


export const {useGetCategoriesQuery,useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation} = categoryApi;
import {apiSlice} from "../api/apiSlice.js";
import {ErrorToast, SuccessToast} from "../../../helper/ValidationHelper.js";
import {setToken} from "../../../helper/SessionHelper.js";
import {HideLoading} from "./authSlice.js";


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    dispatch(HideLoading());
                    if(res?.data?.message === "success"){
                        SuccessToast("Register Success");
                    }

                }catch(err) {
                    const status = err?.error?.status;
                    if(status === 409){
                        ErrorToast("Email Already Exist");
                    }else{
                        console.log(err)
                        // ErrorToast("Something Went Wrong!")
                    }


                }
            }
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/auth/admin-login",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                    if(res?.data?.message === "success"){
                        let MyToken = res.data['token'];
                        setToken(MyToken);
                        SuccessToast("Login Success");
                    }

                    setTimeout(()=>{
                        //window.location.href="/inbox";
                    },200)
                    
                }catch(err) {
                    const status = err?.error?.status;
                    if(status === 404){
                        ErrorToast("Could not Find this Email!");
                    }
                    else if(status === 400){
                         ErrorToast(err?.error?.data?.data);
                    }else{
                         ErrorToast("Something Went Wrong!");
                    }
                }
            }
        })

    }),
})


export const {useRegisterMutation, useLoginMutation} = authApi;
import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    categoryEditModalOpen: false,
    categoryDeleteModalOpen: false,
    categoryCreateModalOpen: false,
    productDeleteModalOpen: false,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        SetCategoryEditModalOpen:(state,action)=>{
            state.categoryEditModalOpen=action.payload
        },
        SetCategoryDeleteModalOpen:(state,action)=>{
            state.categoryDeleteModalOpen=action.payload
        },
        SetCategoryCreateModalOpen:(state,action)=>{
            state.categoryCreateModalOpen=action.payload
        },
        SetProductDeleteModalOpen:(state,action)=>{
            state.productDeleteModalOpen=action.payload
        },
    }

})


export const {SetCategoryEditModalOpen, SetCategoryDeleteModalOpen, SetCategoryCreateModalOpen, SetProductDeleteModalOpen} = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;
import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    categoryEditModalOpen: false,
    categoryDeleteModalOpen: false,
    categoryCreateModalOpen: false,
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
    }

})


export const {SetCategoryEditModalOpen, SetCategoryDeleteModalOpen, SetCategoryCreateModalOpen} = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;
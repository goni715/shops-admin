import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    categoryName: "",
    categoryId:""
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        SetCategoryName:(state,action)=>{
            state.categoryName=action.payload
        },
        SetCategoryId:(state,action)=>{
            state.categoryId=action.payload
        },
    }

})


export const {SetCategoryName, SetCategoryId} = categorySlice.actions;

const categorySliceReducer = categorySlice.reducer;
export default categorySliceReducer;
import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    productId:""
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        SetProductId:(state,action)=>{
            state.productId=action.payload
        },
    }

})


export const {SetProductId} = productSlice.actions;

const productSliceReducer = productSlice.reducer;
export default productSliceReducer;
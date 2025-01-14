import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAdmin } from "../interfaces/userInterface";



const initialState: IAdmin = {
    _id: "",
    username: "",
    name: "",
    email: "",
    token: null,
};

export const adminSlice = createSlice({
    name:'adminData',
    initialState,
    reducers:{
        setAdminData:(state, action: PayloadAction<IAdmin>) => {
            state._id = action.payload._id
            state.email = action.payload.email
            state.name = action.payload.name
            state.username = action.payload.username
            state.token = action.payload.token
        }
    }
});

export const { setAdminData } = adminSlice.actions;

export default adminSlice.reducer;



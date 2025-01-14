import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser} from '../interfaces/userInterface';

interface UsersState {
    users: IUser[];
}

const initialState: UsersState = {
    users: []
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        setUsers(state, action: PayloadAction<IUser[]>){
            state.users = action.payload; 
        },
        addUser(state, action: PayloadAction<IUser>) {
            state.users.push(action.payload);
        },
        updateUser(state, action: PayloadAction<IUser>) {
            state.users = state.users.map((user) =>
              user._id === action.payload._id ? action.payload : user
            );
        },
        removeUser(state, action: PayloadAction<string>) {
            state.users = state.users.filter((user) => user._id !== action.payload);
        },
        resetUsers(state) {
            state.users = []; 
        }

    }
});

export const { setUsers, addUser, updateUser, removeUser, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;

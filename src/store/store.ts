import { configureStore } from '@reduxjs/toolkit';
import adminReduser from './adminSlice'
import usersReduser from './usersSlice'

const store = configureStore({
    reducer: {
        adminData: adminReduser,
        users: usersReduser 
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store

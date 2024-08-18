import { configureStore} from "@reduxjs/toolkit";
import FetchProducts from "./slices/FetchProducts";
import ThemeSlice from "./slices/ThemeSlice";
import CartSlice from "./slices/CartSlice";
import UserInfo from "./slices/UserInfo";


const Store = configureStore({
    reducer: {
        productsData:FetchProducts,
        theme:ThemeSlice,
        cart:CartSlice,
        userInfo:UserInfo
    }
})

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;

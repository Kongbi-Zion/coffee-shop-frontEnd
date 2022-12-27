// import { createStore, applyMiddleware} from 'redux'
// import reducers from './reducers'
// import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(reducers, composeWithDevTools())
// export default store 

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
}) 


export default store
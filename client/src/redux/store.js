import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import userReducer from "./slices/userSlice";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import modeReducer from "./slices/modeSlice";
import watcherSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        cart: cartReducer,
        mode: modeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(watcherSaga);
export default store;

import { takeLatest, call, put } from "redux-saga/effects";
import {
    loadUserRequest,
    getProducts,
    getProductsByCategory,
    login,
    checkCart,
    createCart,
    getType,
} from "./actions";
import { loadUser } from "./slices/userSlice";
import { productsAPI, authApi, cartAPI } from "../api";

function* fetchProductsSaga(action) {
    try {
        const products = yield call(productsAPI.getAll);
        yield put(getProducts.success(products));
    } catch (err) {
        console.error(err);
        yield put(getProducts.failure(err));
    }
}

function* fetchProductsByCatSaga(action) {
    try {
        const products = yield call(
            productsAPI.getByCategories,
            action.payload
        );
        yield put(getProductsByCategory.getProductsByCategorySuccess(products));
    } catch (err) {
        console.error(err);
        yield put(getProductsByCategory.getProductsByCategoryFailure(err));
    }
}

function* loginSaga(action) {
    try {
        const user = yield call(authApi.login, action.payload);
        yield put(login.loginSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(login.loginFailure(err));
    }
}

function* addToCartSaga(action) {
    yield console.log("action", action);
    // try {
    //     const user = yield call(authApi.login, action.payload);
    //     yield put(addToCart.addCartSuccess(user));
    // } catch (err) {
    //     console.error(err);
    //     yield put(addToCart.addCartFailure(err));
    // }
}

function* createCartSaga(action) {
    console.log("action", action);
    try {
        const cart = yield call(cartAPI.create, action.payload);
        yield put(createCart.createCartSuccess(cart));
    } catch (err) {
        console.error(err);
        yield put(createCart.createCartError(err));
    }
}

function* chechCartSaga(action) {
    console.log("action", action);
    try {
        const cart = yield call(cartAPI.checkUserCart, ...action.payload);
        yield put(checkCart.checkCartSuccess(cart));
    } catch (err) {
        console.error(err);
        yield put(checkCart.checkCartFailure(err));
    }
}

function* loadUserSaga(action) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        try {
            const newToken = yield call(
                authApi.refreshToken(user.refreshToken)
            );
            user.accessToken = newToken;
        } catch (err) {
            console.log("err", err);
        }
    }
    console.log("user", user);
    yield put(loadUser(user));
}

function* watcherSaga() {
    yield takeLatest(getType(loadUserRequest), loadUserSaga);
    yield takeLatest(getType(login.loginRequest), loginSaga);
    yield takeLatest(getType(getProducts.request), fetchProductsSaga);
    yield takeLatest(
        getType(getProductsByCategory.getProductsByCategoryRequest),
        fetchProductsByCatSaga
    );
    yield takeLatest(getType(checkCart.checkCartRequest), chechCartSaga);
    yield takeLatest(getType(createCart.createCartRequest), createCartSaga);
}

export default watcherSaga;

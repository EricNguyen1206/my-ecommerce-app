import { takeLatest, call, put } from "redux-saga/effects";
import {
    loadUserRequest,
    getProducts,
    getProductsByCategory,
    login,
    checkCart,
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
    console.log("action");
    try {
        const user = yield call(authApi.login, action.payload);
        yield put(login.loginSuccess(user));
    } catch (err) {
        console.error(err);
        yield put(login.loginFailure(err));
    }
}

function* chechCartSaga(action) {
    try {
        const cart = yield call(cartAPI.checkUserCart, ...action.payload);
        yield put(checkCart.checkCartSuccess(cart));
    } catch (err) {
        console.error(err);
        yield put(checkCart.checkCartFailure(err));
    }
}

function* loadUserSaga(action) {
    let user = JSON.parse(localStorage.getItem("user"));
    let cart = null;
    if (user) {
        try {
            const newToken = yield call(authApi.refreshToken);
            user.accessToken = newToken;
        } catch (err) {
            console.log("can't create new token'");
        }
        try {
            cart = yield call(cartAPI.checkUserCart(user));
            yield put(checkCart.checkCartSuccess(cart));
        } catch (err) {
            yield put(checkCart.checkCartFailure());
        }
    }
    localStorage.setItem("user", JSON.stringify(user));
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
    yield takeLatest(getType(checkCart.checkCartRequest), chechCartSaga);
    // yield takeLatest(getType(addToCart.addToCartRequest), addToCartSaga);
}

export default watcherSaga;

import { takeLatest, call, put } from "redux-saga/effects";
import {
    loadUser,
    getProducts,
    getProductsByCategory,
    login,
    checkCart,
    getType,
} from "./actions";
import { productsApi, authApi, cartApi } from "../api";

function* fetchProductsSaga() {
    try {
        const products = yield call(productsApi.getAll);
        yield put(getProducts.success(products));
    } catch (err) {
        yield put(getProducts.failure(err));
    }
}

function* fetchProductsByCatSaga(action) {
    try {
        const products = yield call(
            productsApi.getByCategories,
            action.payload
        );
        yield put(getProductsByCategory.getProductsByCategorySuccess(products));
    } catch (err) {
        yield put(getProductsByCategory.getProductsByCategoryFailure(err));
    }
}

function* loginSaga(action) {
    try {
        const user = yield call(authApi.login, action.payload);
        yield put(login.loginSuccess(user));
    } catch (err) {
        yield put(login.loginFailure(err));
    }
}

function* chechCartSaga(action) {
    try {
        let cart = yield call(cartApi.checkUserCart, action.payload);
        cart
            ? yield put(checkCart.checkCartSuccess(cart))
            : yield put(checkCart.checkCartFailure());
    } catch (err) {
        yield put(checkCart.checkCartFailure(err));
    }
}

function* loadUserSaga(action) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        try {
            const newToken = yield call(authApi.refreshToken);
            user.accessToken = newToken.accessToken;
        } catch (err) {
            yield put(loadUser.loadUserFailure());
        }
        localStorage.setItem("user", JSON.stringify(user));
        yield put(loadUser.loadUserSuccess(user));
    } else {
        yield put(loadUser.loadUserFailure());
    }
}

function* watcherSaga() {
    yield takeLatest(getType(loadUser.loadUserRequest), loadUserSaga);
    yield takeLatest(getType(login.loginRequest), loginSaga);
    yield takeLatest(getType(getProducts.request), fetchProductsSaga);
    yield takeLatest(
        getType(getProductsByCategory.getProductsByCategoryRequest),
        fetchProductsByCatSaga
    );
    yield takeLatest(getType(checkCart.checkCartRequest), chechCartSaga);
}

export default watcherSaga;

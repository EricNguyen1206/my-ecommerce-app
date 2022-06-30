import { takeLatest, call, put } from "redux-saga/effects";
import {
    loadUser,
    getProducts,
    getProductsByCategory,
    login,
    checkCart,
    getType,
} from "./actions";
import { productsAPI, authApi, cartAPI } from "../api";

function* fetchProductsSaga() {
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

/**
 *
 * @param {user} action
 * load user cart if user have buy somethings
 * in otherhand cart is empty
 */
function* chechCartSaga(action) {
    try {
        const cart = yield call(cartAPI.checkUserCart, action.payload);
        yield put(checkCart.checkCartSuccess(cart));
    } catch (err) {
        yield put(checkCart.checkCartFailure(err));
    }
}

function* loadUserSaga(action) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        try {
            const newToken = yield call(authApi.refreshToken);
            user.accessToken = newToken;
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
    // yield takeLatest(getType(addToCart.addToCartRequest), addToCartSaga);
}

export default watcherSaga;

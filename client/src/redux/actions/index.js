import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
    return reduxAction().type;
};

export const getProducts = createActions({
    request: undefined,
    success: (payload) => payload,
    failure: (err) => err,
});

export const getProductsByCategory = createActions({
    getProductsByCategoryRequest: (payload) => payload,
    getProductsByCategorySuccess: (payload) => payload,
    getProductsByCategoryFailure: (err) => err,
});

export const login = createActions({
    loginRequest: (payload) => payload,
    loginSuccess: (payload) => payload,
    loginFailure: (err) => err,
});

export const register = createActions({
    registerRequest: (payload) => payload,
    registerSuccess: (payload) => payload,
    registerFailure: (err) => err,
});

export const addToCart = createActions({
    addCartRequest: (payload) => payload,
    addCartSuccess: (payload) => payload,
    addCartFailure: (err) => err,
});

export const checkCart = createActions({
    checkCartRequest: (payload) => payload,
    checkCartSuccess: (payload) => payload,
    checkCartFailure: (err) => err,
});

export const loadUserRequest = createAction("user/loadUserRequest");

import fetch from 'isomorphic-fetch';
import { getFetch, postFetch, putFetch, deleteFetch } from '../services/request';

// List categories
export const GET_ALL_CATEGORIES_REQUEST = 'GET_ALL_CATEGORIES_REQUEST';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_ALL_CATEGORIES_FAILURE = 'GET_ALL_CATEGORIES_FAILURE';
export const RESET_GET_ALL_CATEGORIES = 'RESET_GET_ALL_CATEGORIES';

// Get category by id
export const GET_CATEGORY_BY_ID_REQUEST = 'GET_CATEGORY_BY_ID_REQUEST';
export const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
export const GET_CATEGORY_BY_ID_FAILURE = 'GET_CATEGORY_BY_ID_FAILURE';
export const RESET_CURRENT_CATEGORY = 'RESET_CURRENT_CATEGORY';

// Create category
export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';
export const RESET_CREATE_CATEGORY = 'RESET_CREATE_CATEGORY';

// Update category
export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';
export const RESET_UPDATE_CATEGORY = 'RESET_UPDATE_CATEGORY';

// Delete category
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';
export const RESET_DELETE_CATEGORY = 'RESET_DELETE_CATEGORY';

// get all categories
export function getAllCategories(filter, pageSize, pageCount) {
    return async (dispatch) => {
        dispatch(getAllCategoriesRequest());
        try {
            let params = [];
            filter && Object.keys(filter).map((key) => {
                params.push(`${key}=${filter[key]}`);
            });
            params = params.concat([`pageSize=${pageSize}`, `pageCount=${pageCount}`]);
            const response = await getFetch(`/api/categories?${params.join('&')}`);
            dispatch(getAllCategoriesSuccess(response));
        } catch (error) {
            dispatch(getAllCategoriesFailure(error));
        }
    }
}

function getAllCategoriesRequest() {
    return {
        type: GET_ALL_CATEGORIES_REQUEST,
        payload: null
    }
}

function getAllCategoriesSuccess(response) {
    return {
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: response
    }
}

function getAllCategoriesFailure(error) {
    return {
        type: GET_ALL_CATEGORIES_FAILURE,
        payload: error.message
    }
}

export function resetgetAllCategories() {
    return {
        type: RESET_GET_ALL_CATEGORIES
    }
}

// get category by id
export function getCategoryById(id) {
    return async (dispatch) => {
        try {
            dispatch(getCategoryByIdRequest());
            const response = await getFetch(`/api/categories/${id}`);
            dispatch(getCategoryByIdSuccess(response));
        } catch (error) {
            dispatch(getCategoryByIdFailure(error));
        }
    }
}

function getCategoryByIdRequest() {
    return {
        type: GET_CATEGORY_BY_ID_REQUEST,
        payload: null
    }
}

function getCategoryByIdSuccess(response) {
    return {
        type: GET_CATEGORY_BY_ID_SUCCESS,
        payload: response
    }
}

function getCategoryByIdFailure(response) {
    return {
        type: GET_CATEGORY_BY_ID_FAILURE,
        payload: response
    }
}

export function resetCurrentCategory() {
    return {
        type: RESET_CURRENT_CATEGORY
    }
}

// create category
export function createCategory(params) {
    return async (dispatch) => {
        dispatch(createCategoryRequest());
        try {
            const response = await postFetch(`/api/categories`, params);
            dispatch(createCategorySuccess(response));
        } catch (error) {
            dispatch(createCategoryFailure(error))
        }
    }
}

function createCategoryRequest() {
    return {
        type: CREATE_CATEGORY_REQUEST,
        payload: null
    }
}

function createCategorySuccess(response) {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        payload: response
    }
}

function createCategoryFailure(response) {
    return {
        type: CREATE_CATEGORY_FAILURE,
        payload: response
    }
}

export function resetCreateCategory() {
    return {
        type: RESET_CREATE_CATEGORY
    }
}

// update category
export function updateCategory(id, params) {
    return async (dispatch) => {
        dispatch(updateCategoryRequest());
        try {
            const response = await putFetch(`/api/categories/${id}`, params);
            dispatch(updateCategorySuccess(response));
        } catch (error) {
            dispatch(updateCategoryFailure(error))
        }

    }
}

function updateCategoryRequest() {
    return {
        type: UPDATE_CATEGORY_REQUEST,
        payload: null
    }
}

function updateCategorySuccess(response) {
    return {
        type: UPDATE_CATEGORY_SUCCESS,
        payload: response
    }
}

function updateCategoryFailure(response) {
    return {
        type: UPDATE_CATEGORY_FAILURE,
        payload: response
    }
}

export function resetUpdateCategory() {
    return {
        type: RESET_UPDATE_CATEGORY
    }
}

// delete category
export function deleteCategory(id) {
    return async (dispatch) => {
        dispatch(deleteCategoryRequest(id));
        try {
            const response = await deleteFetch(`/api/categories/${id}`)
            dispatch(deleteCategorySuccess(id));
        } catch (error) {
            dispatch(deleteCategoryFailure(error))
        }

    }
}

function deleteCategoryRequest(id) {
    return {
        type: DELETE_CATEGORY_REQUEST,
        payload: id
    }
}

function deleteCategorySuccess(id) {
    return {
        type: DELETE_CATEGORY_SUCCESS,
        payload: id
    }
}

function deleteCategoryFailure(response) {
    return {
        type: DELETE_CATEGORY_FAILURE,
        payload: response
    }
}

export function resetDeleteCategory() {
    return {
        type: RESET_DELETE_CATEGORY
    }
}
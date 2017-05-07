import fetch from 'isomorphic-fetch';
import { getFetch, postFetch, putFetch, deleteFetch } from '../services/request';
import { makeActionCreator } from './ActionCreator';

// List categories
export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

const getCategoriesRequest = makeActionCreator(GET_CATEGORIES_REQUEST);
const getCategoriesSuccess = makeActionCreator(GET_CATEGORIES_SUCCESS);
const getCategoriesFailure = makeActionCreator(GET_CATEGORIES_FAILURE);

// Get category by id
export const GET_CATEGORY_BY_ID_REQUEST = 'GET_CATEGORY_BY_ID_REQUEST';
export const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
export const GET_CATEGORY_BY_ID_FAILURE = 'GET_CATEGORY_BY_ID_FAILURE';
export const RESET_CURRENT_CATEGORY = 'RESET_CURRENT_CATEGORY';

const getCategoryByIdRequest = makeActionCreator(GET_CATEGORY_BY_ID_REQUEST);
const getCategoryByIdSuccess = makeActionCreator(GET_CATEGORY_BY_ID_SUCCESS);
const getCategoryByIdFailure = makeActionCreator(GET_CATEGORY_BY_ID_FAILURE);
export const resetCurrentCategory = makeActionCreator(RESET_CURRENT_CATEGORY);

// Create category
export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';
export const RESET_CREATE_CATEGORY = 'RESET_CREATE_CATEGORY';

const createCategoryRequest = makeActionCreator(CREATE_CATEGORY_REQUEST);
const createCategorySuccess = makeActionCreator(CREATE_CATEGORY_SUCCESS);
const createCategoryFailure = makeActionCreator(CREATE_CATEGORY_FAILURE);
export const resetCreateCategory = makeActionCreator(RESET_CREATE_CATEGORY);

// Update category
export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';
export const RESET_UPDATE_CATEGORY = 'RESET_UPDATE_CATEGORY';

const updateCategoryRequest = makeActionCreator(UPDATE_CATEGORY_REQUEST);
const updateCategorySuccess = makeActionCreator(UPDATE_CATEGORY_SUCCESS);
const updateCategoryFailure = makeActionCreator(UPDATE_CATEGORY_FAILURE);
export const resetUpdateCategory = makeActionCreator(RESET_UPDATE_CATEGORY);

// Delete category
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';
export const RESET_DELETE_CATEGORY = 'RESET_DELETE_CATEGORY';

const deleteCategoryRequest = makeActionCreator(DELETE_CATEGORY_REQUEST);
const deleteCategorySuccess = makeActionCreator(DELETE_CATEGORY_SUCCESS);
const deleteCategoryFailure = makeActionCreator(DELETE_CATEGORY_FAILURE);
export const resetDeleteCategory = makeActionCreator(RESET_DELETE_CATEGORY);

export function getCategories(filter, currentPage, perPage) {
    return async (dispatch) => {
        dispatch(getCategoriesRequest());
        try {
            let params = [];
            filter && Object.keys(filter).map((key) => {
                params.push(`${key}=${filter[key]}`);
            });
            params = [...params, `currentPage=${currentPage}`, `perPage=${perPage}`];
            const response = await getFetch(`/api/categories?${params.join('&')}`);
            response.code ? dispatch(getCategoriesSuccess(response)) : dispatch(getCategoriesFailure(response));
        } catch (error) {
            dispatch(getCategoriesFailure(error.message));
        }
    }
}

export async function getAllCategories() {
    const response = await getFetch(`/api/categories?currentPage=1&perPage=100`);
    if (response.code) {
        return response.result.data;
    } else {
        return [];
    }
    // try {
    // } catch (error) {
    //     console.log(error.message);
    // }
}

export function getCategoryById(id) {
    return async (dispatch) => {
        try {
            dispatch(getCategoryByIdRequest());
            const response = await getFetch(`/api/categories/${id}`);
            response.code ? dispatch(getCategoryByIdSuccess(response)) : dispatch(getCategoryByIdFailure(response));
        } catch (error) {
            dispatch(getCategoryByIdFailure(error.message));
        }
    }
}

export function createCategory(params) {
    return async (dispatch) => {
        dispatch(createCategoryRequest());
        try {
            const response = await postFetch(`/api/categories`, params);
            response.code ? dispatch(createCategorySuccess(response)) : dispatch(createCategoryFailure(response));
        } catch (error) {
            dispatch(createCategoryFailure(error.message))
        }
    }
}

export function updateCategory(id, params) {
    return async (dispatch) => {
        dispatch(updateCategoryRequest());
        try {
            const response = await putFetch(`/api/categories/${id}`, params);
            response.code ? dispatch(updateCategorySuccess(response)) : dispatch(updateCategoryFailure(response));
        } catch (error) {
            dispatch(updateCategoryFailure(error.message))
        }

    }
}

export function deleteCategory(id) {
    return async (dispatch) => {
        dispatch(deleteCategoryRequest(id));
        try {
            const response = await deleteFetch(`/api/categories/${id}`)
            response.code ? dispatch(deleteCategorySuccess(response)) : dispatch(deleteCategoryFailure(response));
        } catch (error) {
            dispatch(deleteCategoryFailure(error.message))
        }
    }
}
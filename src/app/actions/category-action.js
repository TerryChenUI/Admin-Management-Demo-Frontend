import { createActions } from 'redux-actions';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY_BY_ID_REQUEST = 'GET_CATEGORY_BY_ID_REQUEST';
export const GET_CATEGORY_BY_ID = 'GET_CATEGORY_BY_ID';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const { getCategoriesRequest, getCategories, getCategoryByIdRequest, getCategoryById,
    createCategory, updateCategory, deleteCategory } = createActions({
        GET_CATEGORIES_REQUEST: () => { },
        GET_CATEGORIES: result => result,
        GET_CATEGORY_BY_ID_REQUEST: () => { },
        GET_CATEGORY_BY_ID: result => result,
        CREATE_CATEGORY: result => result,
        UPDATE_CATEGORY: result => result,
        DELETE_CATEGORY: result => result
    });
import fetch from 'isomorphic-fetch';

// List categories
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_ALL_CATEGORIES_FAILURE = 'GET_ALL_CATEGORIES_FAILURE';
export const RESET_GET_ALL_CATEGORIES = 'RESET_GET_ALL_CATEGORIES';

// Get category by id
export const GET_CATEGORY_BY_ID = 'GET_CATEGORY_BY_ID';
export const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
export const GET_CATEGORY_BY_ID_FAILURE = 'GET_CATEGORY_BY_ID_FAILURE';
export const RESET_CURRENT_CATEGORY = 'RESET_CURRENT_CATEGORY';

// Create category
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE = 'CREATE_CATEGORY_FAILURE';
export const RESET_CREATE_CATEGORY = 'RESET_CREATE_CATEGORY';

// Update category
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'UPDATE_CATEGORY_FAILURE';
export const RESET_UPDATE_CATEGORY = 'RESET_UPDATE_CATEGORY';

// Delete category
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE';
export const RESET_DELETED_CATEGORY = 'RESET_DELETED_CATEGORY';

// get all categories
export function getAllCategories() {
    const promise = fetch(`/api/categories`);
    return {
        type: GET_ALL_CATEGORIES,
        payload: promise
    };
}

export function getAllCategoriesSuccess(response) {
    return {
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: response
    }
}

export function getAllCategoriesFailure(response) {
    return {
        type: GET_ALL_CATEGORIES_FAILURE,
        payload: response
    }
}

export function resetgetAllCategories() {
    return {
        type: RESET_GET_ALL_CATEGORIES
    }
}

// get category by id
export function getCategoryById(id) {
    const promise = fetch(`/api/categories/${id}`);
    return {
        type: GET_CATEGORY_BY_ID,
        payload: promise
    };
}

export function getCategoryByIdSuccess(response) {
    return {
        type: GET_CATEGORY_BY_ID_SUCCESS,
        payload: response
    }
}

export function getCategoryByIdFailure(response) {
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
    const promise = fetch(`/api/categories`, {
        method: 'POST',
        body: JSON.stringify(params)
    });
    return {
        type: CREATE_CATEGORY,
        payload: promise
    };
}

export function createCategorySuccess(response) {
    return {
        type: CREATE_CATEGORY_SUCCESS,
        payload: response
    }
}

export function createCategoryFailure(response) {
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
    const promise = fetch(`/api/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(params)
    });
    return {
        type: UPDATE_CATEGORY,
        payload: promise
    };
}

export function updateCategorySuccess(response) {
    return {
        type: UPDATE_CATEGORY_SUCCESS,
        payload: response
    }
}

export function updateCategoryFailure(response) {
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
    const promise = fetch(`/api/categories/${id}`, {
        method: 'DELETE'
    });
    return {
        type: DELETE_CATEGORY,
        payload: promise
    };
}

export function deleteCategorySuccess(id) {
    return {
        type: DELETE_CATEGORY_SUCCESS,
        payload: id
    }
}

export function deleteCategoryFailure(response) {
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
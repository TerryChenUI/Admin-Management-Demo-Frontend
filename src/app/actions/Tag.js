import fetch from 'isomorphic-fetch';
import { getFetch, postFetch, putFetch, deleteFetch } from '../services/request';
import { makeActionCreator } from './ActionCreator';

// List tags
export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

const getTagsRequest = makeActionCreator(GET_TAGS_REQUEST);
const getTagsSuccess = makeActionCreator(GET_TAGS_SUCCESS);
const getTagsFailure = makeActionCreator(GET_TAGS_FAILURE);

// Get tag by id
export const GET_TAG_BY_ID_REQUEST = 'GET_TAG_BY_ID_REQUEST';
export const GET_TAG_BY_ID_SUCCESS = 'GET_TAG_BY_ID_SUCCESS';
export const GET_TAG_BY_ID_FAILURE = 'GET_TAG_BY_ID_FAILURE';
export const RESET_CURRENT_TAG = 'RESET_CURRENT_TAG';

const getTagByIdRequest = makeActionCreator(GET_TAG_BY_ID_REQUEST);
const getTagByIdSuccess = makeActionCreator(GET_TAG_BY_ID_SUCCESS);
const getTagByIdFailure = makeActionCreator(GET_TAG_BY_ID_FAILURE);
export const resetCurrentTag = makeActionCreator(RESET_CURRENT_TAG);

// Create tag
export const CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST';
export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
export const CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE';
export const RESET_CREATE_TAG = 'RESET_CREATE_TAG';

const createTagRequest = makeActionCreator(CREATE_TAG_REQUEST);
const createTagSuccess = makeActionCreator(CREATE_TAG_SUCCESS);
const createTagFailure = makeActionCreator(CREATE_TAG_FAILURE);
export const resetCreateTag = makeActionCreator(RESET_CREATE_TAG);

// Update tag
export const UPDATE_TAG_REQUEST = 'UPDATE_TAG_REQUEST';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';
export const UPDATE_TAG_FAILURE = 'UPDATE_TAG_FAILURE';
export const RESET_UPDATE_TAG = 'RESET_UPDATE_TAG';

const updateTagRequest = makeActionCreator(UPDATE_TAG_REQUEST);
const updateTagSuccess = makeActionCreator(UPDATE_TAG_SUCCESS);
const updateTagFailure = makeActionCreator(UPDATE_TAG_FAILURE);
export const resetUpdateTag = makeActionCreator(RESET_UPDATE_TAG);

// Delete tag
export const DELETE_TAG_REQUEST = 'DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE';
export const RESET_DELETE_TAG = 'RESET_DELETE_TAG';

const deleteTagRequest = makeActionCreator(DELETE_TAG_REQUEST);
const deleteTagSuccess = makeActionCreator(DELETE_TAG_SUCCESS);
const deleteTagFailure = makeActionCreator(DELETE_TAG_FAILURE);
export const resetDeleteTag = makeActionCreator(RESET_DELETE_TAG);

export function getTags(filter, currentPage, perPage) {
    return async (dispatch) => {
        dispatch(getTagsRequest());
        try {
            let params = [];
            filter && Object.keys(filter).map((key) => {
                params.push(`${key}=${filter[key]}`);
            });
            params = [...params, `currentPage=${currentPage}`, `perPage=${perPage}`];
            const response = await getFetch(`/api/tags?${params.join('&')}`);
            response.code ? dispatch(getTagsSuccess(response)) : dispatch(getTagsFailure(response));
        } catch (error) {
            dispatch(getTagsFailure(error.message));
        }
    }
}

export function getTagById(id) {
    return async (dispatch) => {
        try {
            dispatch(getTagByIdRequest());
            const response = await getFetch(`/api/tags/${id}`);
            response.code ? dispatch(getTagByIdSuccess(response)) : dispatch(getTagByIdFailure(response));
        } catch (error) {
            dispatch(getTagByIdFailure(error.message));
        }
    }
}

export function createTag(params) {
    return async (dispatch) => {
        dispatch(createTagRequest());
        try {
            const response = await postFetch(`/api/tags`, params);
            response.code ? dispatch(createTagSuccess(response)) : dispatch(createTagFailure(response));
        } catch (error) {
            dispatch(createTagFailure(error.message))
        }
    }
}

export function updateTag(id, params) {
    return async (dispatch) => {
        dispatch(updateTagRequest());
        try {
            const response = await putFetch(`/api/tags/${id}`, params);
            response.code ? dispatch(updateTagSuccess(response)) : dispatch(updateTagFailure(response));
        } catch (error) {
            dispatch(updateTagFailure(error.message))
        }

    }
}

export function deleteTag(id) {
    return async (dispatch) => {
        dispatch(deleteTagRequest(id));
        try {
            const response = await deleteFetch(`/api/tags/${id}`);
            response.code ? dispatch(deleteTagSuccess(response)) : dispatch(deleteTagFailure(response));
        } catch (error) {
            dispatch(deleteTagFailure(error.message))
        }
    }
}
import fetch from 'isomorphic-fetch';
import { getFetch, postFetch, putFetch, deleteFetch } from '../services/request';
import { makeActionCreator } from './ActionCreator';

// List tags
export const GET_ALL_TAGS_REQUEST = 'GET_ALL_TAGS_REQUEST';
export const GET_ALL_TAGS_SUCCESS = 'GET_ALL_TAGS_SUCCESS';
export const GET_ALL_TAGS_FAILURE = 'GET_ALL_TAGS_FAILURE';

const getAllTagsRequest = makeActionCreator(GET_ALL_TAGS_REQUEST);
const getAllTagsSuccess = makeActionCreator(GET_ALL_TAGS_SUCCESS);
const getAllTagsFailure = makeActionCreator(GET_ALL_TAGS_FAILURE);

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

// export function getAllTags(filter, pageSize, pageCount) {
//     let params = [];
//     filter && Object.keys(filter).map((key) => {
//         params.push(`${key}=${filter[key]}`);
//     });
//     params = params.concat([`pageSize=${pageSize}`, `pageCount=${pageCount}`]);
//     return {
//         types: [GET_ALL_TAGS_REQUEST, GET_ALL_TAGS_SUCCESS, GET_TAG_BY_ID_FAILURE],
//         callAPI: () => getFetch(`/api/tags?${params.join('&')}`),
//         // payload: { data, message, status }
//     };
// }

export function getAllTags(filter, pageSize, pageCount) {
    return async (dispatch) => {
        dispatch(getAllTagsRequest());
        try {
            let params = [];
            filter && Object.keys(filter).map((key) => {
                params.push(`${key}=${filter[key]}`);
            });
            params = params.concat([`pageSize=${pageSize}`, `pageCount=${pageCount}`]);
            const response = await getFetch(`/api/tags?${params.join('&')}`);
            dispatch(getAllTagsSuccess(response));
        } catch (error) {
            dispatch(getAllTagsFailure(error.message));
        }
    }
}

export function getTagById(id) {
    return async (dispatch) => {
        try {
            dispatch(getTagByIdRequest());
            const response = await getFetch(`/api/tags/${id}`);
            dispatch(getTagByIdSuccess(response));
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
            dispatch(createTagSuccess(response));
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
            dispatch(updateTagSuccess(response));
        } catch (error) {
            dispatch(updateTagFailure(error.message))
        }

    }
}

export function deleteTag(id) {
    return async (dispatch) => {
        dispatch(deleteTagRequest(id));
        try {
            const response = await deleteFetch(`/api/tags/${id}`)
            dispatch(deleteTagSuccess(id));
        } catch (error) {
            dispatch(deleteTagFailure(error.message))
        }
    }
}
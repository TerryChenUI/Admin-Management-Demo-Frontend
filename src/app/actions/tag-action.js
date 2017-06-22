import { createActions } from 'redux-actions';

// List tags
export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

export const { getTagsRequest, getTagsSuccess, getTagsFailure } = createActions({
    GET_TAGS_REQUEST: () => { },
    GET_TAGS_SUCCESS: (response) => response,
    GET_TAGS_FAILURE: (response) => response
});

// Get tag by id
export const GET_TAG_BY_ID_REQUEST = 'GET_TAG_BY_ID_REQUEST';
export const GET_TAG_BY_ID_SUCCESS = 'GET_TAG_BY_ID_SUCCESS';
export const GET_TAG_BY_ID_FAILURE = 'GET_TAG_BY_ID_FAILURE';
export const RESET_CURRENT_TAG = 'RESET_CURRENT_TAG';

export const { getTagByIdRequest, getTagByIdSuccess, getTagByIdFailure, resetCurrentTag } = createActions({
    GET_TAG_BY_ID_REQUEST: () => { },
    GET_TAG_BY_ID_SUCCESS: (response) => response,
    GET_TAG_BY_ID_FAILURE: (response) => response,
    RESET_CURRENT_TAG: () => { }
});


// Create tag
export const CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST';
export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
export const CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE';
export const RESET_CREATE_TAG = 'RESET_CREATE_TAG';

export const { createTagRequest, createTagSuccess, createTagFailure, resetCreateTag } = createActions({
    CREATE_TAG_REQUEST: () => { },
    CREATE_TAG_SUCCESS: (response) => response,
    CREATE_TAG_FAILURE: (response) => response,
    RESET_CREATE_TAG: () => { }
});

// Update tag
export const UPDATE_TAG_REQUEST = 'UPDATE_TAG_REQUEST';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';
export const UPDATE_TAG_FAILURE = 'UPDATE_TAG_FAILURE';
export const RESET_UPDATE_TAG = 'RESET_UPDATE_TAG';

export const { updateTagRequest, updateTagSuccess, updateTagFailure, resetUpdateTag } = createActions({
    UPDATE_TAG_REQUEST: () => { },
    UPDATE_TAG_SUCCESS: (response) => response,
    UPDATE_TAG_FAILURE: (response) => response,
    RESET_UPDATE_TAG: () => { }
});

// Delete tag
export const DELETE_TAG_REQUEST = 'DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE';
export const RESET_DELETE_TAG = 'RESET_DELETE_TAG';

export const { deleteTagRequest, deleteTagSuccess, deleteTagFailure, resetDeleteTag } = createActions({
    DELETE_TAG_REQUEST: () => { },
    DELETE_TAG_SUCCESS: (response) => response,
    DELETE_TAG_FAILURE: (response) => response,
    RESET_DELETE_TAG: () => { }
});

// export function getTags(filter, current, pageSize) {
//     return async (dispatch) => {
//         dispatch(getTagsRequest());
//         try {
//             let params = [];
//             filter && Object.keys(filter).map((key) => {
//                 params.push(`${key}=${filter[key]}`);
//             });
//             params = [...params, `currentPage=${current}`, `perPage=${pageSize}`];
//             const response = await request(`/api/tags?${params.join('&')}`);
//             dispatch(getTagsSuccess(response));
//         } catch (error) {
//             dispatch(getTagByIdFailure(error.response));
//         }
//     }
// }

// export function getAllTags() {
//     return async (dispatch) => {
//         try {
//             return await request(`/api/tags?currentPage=1&perPage=100`);
//         }
//         catch (error) {
//             console.log(error);
//         }
//     }
// }

// export function getTagById(id) {
//     return async (dispatch) => {
//         dispatch(getTagByIdRequest());
//         try {
//             const response = await request(`/api/tags/${id}`);
//             dispatch(getTagByIdSuccess(response));
//         } catch (error) {
//             dispatch(getTagByIdFailure(error.response));
//         }
//     }
// }

// export function createTag(params) {
//     return async (dispatch) => {
//         dispatch(createTagRequest());
//         try {
//             const response = await request(`/api/tags`, {
//                 method: 'POST',
//                 body: params,
//             });
//             dispatch(createTagSuccess(response));
//         } catch (error) {
//             dispatch(createTagFailure(error.response))
//         }
//     }
// }

// export function updateTag(id, params) {
//     return async (dispatch) => {
//         dispatch(updateTagRequest());
//         try {
//             const response = await request(`/api/tags/${id}`, {
//                 method: 'PUT',
//                 body: params,
//             });
//             dispatch(updateTagSuccess(response));
//         } catch (error) {
//             dispatch(updateTagFailure(error.response))
//         }
//     }
// }

// export function deleteTag(id) {
//     return async (dispatch) => {
//         dispatch(deleteTagRequest(id));
//         try {
//             const response = await request(`/api/tags/${id}`, {
//                 method: 'DELETE'
//             });
//             dispatch(deleteTagSuccess(response));
//         } catch (error) {
//             dispatch(deleteTagFailure(error.response))
//         }
//     }
// }
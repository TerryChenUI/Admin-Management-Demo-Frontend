import { createActions } from 'redux-actions';

export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const GET_TAGS = 'GET_TAGS';
export const GET_TAG_BY_ID_REQUEST = 'GET_TAG_BY_ID_REQUEST';
export const GET_TAG_BY_ID = 'GET_TAG_BY_ID';
export const CREATE_TAG = 'CREATE_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const DELETE_TAG = 'DELETE_TAG';

export const { getTagsRequest, getTags, getTagByIdRequest, getTagById,
    createTag, updateTag, deleteTag } = createActions({
        GET_TAGS_REQUEST: () => { },
        GET_TAGS: result => result,
        GET_TAG_BY_ID_REQUEST: () => { },
        GET_TAG_BY_ID: result => result,
        CREATE_TAG: result => result,
        UPDATE_TAG: result => result,
        DELETE_TAG: result => result
    });
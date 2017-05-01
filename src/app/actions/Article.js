import fetch from 'isomorphic-fetch';
import { getFetch, postFetch, putFetch, deleteFetch } from '../services/request';
import { makeActionCreator } from './ActionCreator';

// List articles
export const GET_ALL_ARTICLES_REQUEST = 'GET_ALL_ARTICLES_REQUEST';
export const GET_ALL_ARTICLES_SUCCESS = 'GET_ALL_ARTICLES_SUCCESS';
export const GET_ALL_ARTICLES_FAILURE = 'GET_ALL_ARTICLES_FAILURE';

const getAllArticlesRequest = makeActionCreator(GET_ALL_ARTICLES_REQUEST);
const getAllArticlesSuccess = makeActionCreator(GET_ALL_ARTICLES_SUCCESS);
const getAllArticlesFailure = makeActionCreator(GET_ALL_ARTICLES_FAILURE);

// Get article by id
export const GET_ARTICLE_BY_ID_REQUEST = 'GET_ARTICLE_BY_ID_REQUEST';
export const GET_ARTICLE_BY_ID_SUCCESS = 'GET_ARTICLE_BY_ID_SUCCESS';
export const GET_ARTICLE_BY_ID_FAILURE = 'GET_ARTICLE_BY_ID_FAILURE';
export const RESET_CURRENT_ARTICLE = 'RESET_CURRENT_ARTICLE';

const getArticleByIdRequest = makeActionCreator(GET_ARTICLE_BY_ID_REQUEST);
const getArticleByIdSuccess = makeActionCreator(GET_ARTICLE_BY_ID_SUCCESS);
const getArticleByIdFailure = makeActionCreator(GET_ARTICLE_BY_ID_FAILURE);
export const resetCurrentArticle = makeActionCreator(RESET_CURRENT_ARTICLE);

// Create article
export const CREATE_ARTICLE_REQUEST = 'CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';
export const RESET_CREATE_ARTICLE = 'RESET_CREATE_ARTICLE';

const createArticleRequest = makeActionCreator(CREATE_ARTICLE_REQUEST);
const createArticleSuccess = makeActionCreator(CREATE_ARTICLE_SUCCESS);
const createArticleFailure = makeActionCreator(CREATE_ARTICLE_FAILURE);
export const resetCreateArticle = makeActionCreator(RESET_CREATE_ARTICLE);

// Update article
export const UPDATE_ARTICLE_REQUEST = 'UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';
export const RESET_UPDATE_ARTICLE = 'RESET_UPDATE_ARTICLE';

const updateArticleRequest = makeActionCreator(UPDATE_ARTICLE_REQUEST);
const updateArticleSuccess = makeActionCreator(UPDATE_ARTICLE_SUCCESS);
const updateArticleFailure = makeActionCreator(UPDATE_ARTICLE_FAILURE);
export const resetUpdateArticle = makeActionCreator(RESET_UPDATE_ARTICLE);

// Delete article
export const DELETE_ARTICLE_REQUEST = 'DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';
export const RESET_DELETE_ARTICLE = 'RESET_DELETE_ARTICLE';

const deleteArticleRequest = makeActionCreator(DELETE_ARTICLE_REQUEST);
const deleteArticleSuccess = makeActionCreator(DELETE_ARTICLE_SUCCESS);
const deleteArticleFailure = makeActionCreator(DELETE_ARTICLE_FAILURE);
export const resetDeleteArticle = makeActionCreator(RESET_DELETE_ARTICLE);

// export function getAllArticles(filter, pageSize, pageCount) {
//     let params = [];
//     filter && Object.keys(filter).map((key) => {
//         params.push(`${key}=${filter[key]}`);
//     });
//     params = params.concat([`pageSize=${pageSize}`, `pageCount=${pageCount}`]);
//     return {
//         types: [GET_ALL_ARTICLES_REQUEST, GET_ALL_ARTICLES_SUCCESS, GET_ARTICLE_BY_ID_FAILURE],
//         callAPI: () => getFetch(`/api/articles?${params.join('&')}`),
//         // payload: { data, message, status }
//     };
// }

export function getAllArticles(filter, currentPage, perPage) {
    return async (dispatch) => {
        dispatch(getAllArticlesRequest());
        try {
            let params = [];
            filter && Object.keys(filter).map((key) => {
                params.push(`${key}=${filter[key]}`);
            });
            params = params.concat([`currentPage=${currentPage}`, `perPage=${perPage}`]);
            const response = await getFetch(`/api/articles?${params.join('&')}`);
            dispatch(getAllArticlesSuccess(response));
        } catch (error) {
            dispatch(getAllArticlesFailure(error.message));
        }
    }
}

export function getArticleById(id) {
    return async (dispatch) => {
        try {
            dispatch(getArticleByIdRequest());
            const response = await getFetch(`/api/articles/${id}`);
            dispatch(getArticleByIdSuccess(response));
        } catch (error) {
            dispatch(getArticleByIdFailure(error.message));
        }
    }
}

export function createArticle(params) {
    return async (dispatch) => {
        dispatch(createArticleRequest());
        try {
            const response = await postFetch(`/api/articles`, params);
            dispatch(createArticleSuccess(response));
        } catch (error) {
            dispatch(createArticleFailure(error.message))
        }
    }
}

export function updateArticle(id, params) {
    return async (dispatch) => {
        dispatch(updateArticleRequest());
        try {
            const response = await putFetch(`/api/articles/${id}`, params);
            dispatch(updateArticleSuccess(response));
        } catch (error) {
            dispatch(updateArticleFailure(error.message))
        }

    }
}

export function deleteArticle(id) {
    return async (dispatch) => {
        dispatch(deleteArticleRequest(id));
        try {
            const response = await deleteFetch(`/api/articles/${id}`)
            dispatch(deleteArticleSuccess(id));
        } catch (error) {
            dispatch(deleteArticleFailure(error.message))
        }
    }
}
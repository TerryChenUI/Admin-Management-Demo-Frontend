import { createActions } from 'redux-actions';

export const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST';
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_ARTICLE_BY_ID_REQUEST = 'GET_ARTICLE_BY_ID_REQUEST';
export const GET_ARTICLE_BY_ID = 'GET_ARTICLE_BY_ID';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export const { getArticlesRequest, getArticles, getArticleByIdRequest, getArticleById,
  createArticle, updateArticle, deleteArticle } = createActions({
    GET_ARTICLES_REQUEST: () => { },
    GET_ARTICLES: result => result,
    GET_ARTICLE_BY_ID_REQUEST: () => { },
    GET_ARTICLE_BY_ID: result => result,
    CREATE_ARTICLE: result => result,
    UPDATE_ARTICLE: result => result,
    DELETE_ARTICLE: result => result
  });
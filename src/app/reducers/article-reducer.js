import { ArticleAction } from '../actions';
import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
    list: { data: [], pagination: null },
    selected: { data: null },
    loading: false
};

const createArticle = (state, action) => {
    const createdData = action.payload;
    const createdList = [...state.list.data]
    const additionalIndex = createdList.findIndex(t => t._id === createdData._id);
    if (additionalIndex === -1) {
        createdList.push(createdData);
    }
    return { ...state, list: { data: createdList, pagination: state.list.pagination } };
};

const updateArticle = (state, action) => {
    const updatedData = action.payload;
    const updatedList = [...state.list.data]
    const additionalIndex = updatedList.findIndex(t => t._id === updatedData._id);
    if (additionalIndex > -1) {
        updatedList[additionalIndex] = updatedData;
    }
    return { ...state, list: { data: updatedList, pagination: state.list.pagination } };
};

const deleteArticle = (state, action) => {
    const deletedData = state.list.data.filter(t => t._id !== action.payload._id);
    const pagination = [...state.list.pagination];
    pagination.total -= 1;
    return {
        ...state,
        list: { data: deletedData, pagination }
    }
};

const reducer = handleActions({
    [ArticleAction.GET_ARTICLES_REQUEST]: (state, action) => ({
        ...state, loading: true
    }),
    [ArticleAction.GET_ARTICLES]: (state, action) => ({
        ...state, list: { ...action.payload }, loading: false
    }),
    [ArticleAction.GET_ARTICLE_BY_ID_REQUEST]: (state, action) => ({
        ...state, selected: { data: null }, loading: true
    }),
    [ArticleAction.GET_ARTICLE_BY_ID]: (state, action) => ({
        ...state, selected: { ...action.payload }, loading: false
    }),
    [ArticleAction.CREATE_ARTICLE]: (state, action) => createArticle(state, action),
    [ArticleAction.UPDATE_ARTICLE]: (state, action) => updateArticle(state, action),
    [ArticleAction.DELETE_ARTICLE]: (state, action) => deleteArticle(state, action)
}, INITIAL_STATE);

module.exports = reducer;
import { CategoryAction } from '../actions';
import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
    list: { data: [], pagination: null },
    selected: { data: null },
    loading: false
};

const createCategory = (state, action) => {
    const createdData = action.payload;
    const createdList = [...state.list.data]
    const additionalIndex = createdList.findIndex(t => t._id === createdData._id);
    if (additionalIndex === -1) {
        createdList.push(createdData);
    }
    return { ...state, list: { data: createdList, pagination: state.list.pagination } };
};

const updateCategory = (state, action) => {
    const updatedData = action.payload;
    const updatedList = [...state.list.data]
    const additionalIndex = updatedList.findIndex(t => t._id === updatedData._id);
    if (additionalIndex > -1) {
        updatedList[additionalIndex] = updatedData;
    }
    return { ...state, list: { data: updatedList, pagination: state.list.pagination } };
};

const deleteCategory = (state, action) => {
    const deletedData = state.list.data.filter(t => t._id !== action.payload._id);
    const pagination = [...state.list.pagination];
    pagination.total -= 1;
    return {
        ...state,
        list: { data: deletedData, pagination }
    }
};

const reducer = handleActions({
    [CategoryAction.GET_CATEGORIES_REQUEST]: (state, action) => ({
        ...state, loading: true
    }),
    [CategoryAction.GET_CATEGORIES]: (state, action) => ({
        ...state, list: { ...action.payload }, loading: false
    }),
    [CategoryAction.GET_CATEGORY_BY_ID_REQUEST]: (state, action) => ({
        ...state, selected: { data: null }, loading: true
    }),
    [CategoryAction.GET_CATEGORY_BY_ID]: (state, action) => ({
        ...state, selected: { ...action.payload }, loading: false
    }),
    [CategoryAction.CREATE_CATEGORY]: (state, action) => createCategory(state, action),
    [CategoryAction.UPDATE_CATEGORY]: (state, action) => updateCategory(state, action),
    [CategoryAction.DELETE_CATEGORY]: (state, action) => deleteCategory(state, action)
}, INITIAL_STATE);

module.exports = reducer;
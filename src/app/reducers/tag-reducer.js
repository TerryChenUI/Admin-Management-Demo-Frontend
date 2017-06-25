import { TagAction } from '../actions';
import { handleActions } from 'redux-actions';

const INITIAL_STATE = {
    list: { data: [], pagination: null },
    selected: { data: null },
    loading: false
};

const createTag = (state, action) => {
    const createdData = action.payload;
    const createdList = [...state.list.data]
    const additionalIndex = createdList.findIndex(t => t._id === createdData._id);
    if (additionalIndex === -1) {
        createdList.push(createdData);
    }
    return { ...state, list: { data: createdList, pagination: state.list.pagination } };
};

const updateTag = (state, action) => {
    const updatedData = action.payload;
    const updatedList = [...state.list.data]
    const additionalIndex = updatedList.findIndex(t => t._id === updatedData._id);
    if (additionalIndex > -1) {
        updatedList[additionalIndex] = updatedData;
    }
    return { ...state, list: { data: updatedList, pagination: state.list.pagination } };
};

const deleteTag = (state, action) => {
    const deletedData = state.list.data.filter(t => t._id !== action.payload._id);
    return {
        ...state,
        list: { data: deletedData, pagination: state.list.pagination }
    }
};

const reducer = handleActions({
    [TagAction.GET_TAGS_REQUEST]: (state, action) => ({
        ...state, loading: true
    }),
    [TagAction.GET_TAGS]: (state, action) => ({
        ...state, list: { ...action.payload }, loading: false
    }),
    [TagAction.GET_TAG_BY_ID_REQUEST]: (state, action) => ({
        ...state, selected: { data: null }, loading: true
    }),
    [TagAction.GET_TAG_BY_ID]: (state, action) => ({
        ...state, selected: { ...action.payload }, loading: false
    }),
    [TagAction.CREATE_TAG]: (state, action) => createTag(state, action),
    [TagAction.UPDATE_TAG]: (state, action) => updateTag(state, action),
    [TagAction.DELETE_TAG]: (state, action) => deleteTag(state, action)
}, INITIAL_STATE);

module.exports = reducer;
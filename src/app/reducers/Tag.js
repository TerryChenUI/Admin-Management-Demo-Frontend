import * as types from '../actions/Tag';
import { handleActions } from 'redux-actions';

const requestStatus = {
    pagination: null,
    error: null,
    isLoading: false
}

const INITIAL_STATE = {
    list: { data: null, pagination: null, message: null, error: null, isLoading: false },
    current: { data: null, message: null, error: null, isLoading: false },
    created: { data: null, message: null, error: null, isLoading: false },
    updated: { data: null, message: null, error: null, isLoading: false },
    deleted: { data: null, message: null, error: null, isLoading: false }
};

// const reducer = handleActions({
//     [types.GET_TAGS_REQUEST]: (state, action) => ({
//         ...state, list: { data: null, pagination: null, message: null, error: null, isLoading: true }
//     }),
//     DECREMENT: (state, action) => ({
//         counter: state.counter - action.payload
//     })
// }, state = INITIAL_STATE);

export default function Tag(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_TAGS_REQUEST:
            return { ...state, list: { data: null, pagination: null, message: null, error: null, isLoading: true } };
        case types.GET_TAGS_SUCCESS:
            const { data, pagination } = action.payload.result;
            return { ...state, list: { data, pagination, message: action.payload.message, isLoading: false } };
        case types.GET_TAGS_FAILURE:
            return { ...state, list: { data: state.list.data || null, message: action.payload.message, error: action.payload.error, isLoading: false } };
        case types.RESET_GET_TAGS:
            return { ...state, list: { data: null, pagination: null, message: null, error: null, isLoading: false } };

        case types.GET_TAG_BY_ID_REQUEST:
            return { ...state, current: { data: null, message: null, error: null, isLoading: true } };
        case types.GET_TAG_BY_ID_SUCCESS:
            return { ...state, current: { data: action.payload.result, message: action.payload.message, isLoading: false } };
        case types.GET_TAG_BY_ID_FAILURE:
            return { ...state, current: { data: null, message: action.payload.message, error: action.payload.error, isLoading: false } };
        case types.RESET_CURRENT_TAG:
            return { ...state, current: { data: null, message: null, error: null, isLoading: false } };

        case types.CREATE_TAG_REQUEST:
            return { ...state, created: { data: null, message: null, error: null, isLoading: true } };
        case types.CREATE_TAG_SUCCESS:
            return { ...state, created: { data: action.payload.result, message: action.payload.message, isLoading: false } };
        case types.CREATE_TAG_FAILURE:
            return { ...state, created: { data: null, message: action.payload.message, error: action.payload.error, isLoading: false } };
        case types.RESET_CREATE_TAG:
            return { ...state, created: { data: null, message: null, error: null, isLoading: false } };

        case types.UPDATE_TAG_REQUEST:
            return { ...state, updated: { data: null, message: null, error: null, isLoading: true } };
        case types.UPDATE_TAG_SUCCESS:
            return { ...state, updated: { data: action.payload.result, message: action.payload.message, isLoading: false } };
        case types.UPDATE_TAG_FAILURE:
            return { ...state, updated: { data: null, message: action.payload.message, error: action.payload.error, isLoading: false } };
        case types.RESET_UPDATE_TAG:
            return { ...state, updated: { data: null, message: null, error: null, isLoading: false } };

        case types.DELETE_TAG_REQUEST:
            return { ...state, deleted: { data: action.payload, message: null, error: null, isLoading: true } };
        case types.DELETE_TAG_SUCCESS:
            const { result, message } = action.payload;
            const newData = state.list.data.filter(t => t._id !== result._id);
            return {
                ...state,
                list: {
                    data: newData,
                    pagination: state.list.pagination,
                    message: null,
                    isLoading: false
                },
                deleted: { data: result, message: message, isLoading: false }
            }
        case types.DELETE_TAG_FAILURE:
            return { ...state, deleted: { data: null, error: action.payload.error, message: action.payload.message, isLoading: false } };
        case types.RESET_DELETE_TAG:
            return { ...state, deleted: { data: null, message: null, error: null, isLoading: false } };

        default:
            return state
    }
}

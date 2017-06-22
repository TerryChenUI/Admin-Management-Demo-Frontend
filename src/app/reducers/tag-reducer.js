import { TagAction } from '../actions';
import { handleActions } from 'redux-actions';

const requestStatus = {
    pagination: null,
    error: null,
    loading: false
}

const INITIAL_STATE = {
    list: { data: null, pagination: null, message: null, error: null, loading: false },
    current: { data: null, message: null, error: null, loading: false },
    created: { data: null, message: null, error: null, loading: false },
    updated: { data: null, message: null, error: null, loading: false },
    deleted: { data: null, message: null, error: null, loading: false }
};

// const reducer = handleActions({
//     [TagAction.GET_TAGS_REQUEST]: (state, action) => ({
//         ...state, list: { data: null, pagination: null, message: null, error: null, loading: true }
//     }),
//     DECREMENT: (state, action) => ({
//         counter: state.counter - action.payload
//     })
// }, state = INITIAL_STATE);

export default function Tag(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TagAction.GET_TAGS_REQUEST:
            return { ...state, list: { data: null, pagination: null, message: null, error: null, loading: true } };
        case TagAction.GET_TAGS_SUCCESS:
            const { data, pagination } = action.payload.result;
            return { ...state, list: { data, pagination, message: action.payload.message, loading: false } };
        case TagAction.GET_TAGS_FAILURE:
            return { ...state, list: { data: state.list.data || null, message: action.payload.message, error: action.payload.error, loading: false } };
        case TagAction.RESET_GET_TAGS:
            return { ...state, list: { data: null, pagination: null, message: null, error: null, loading: false } };

        case TagAction.GET_TAG_BY_ID_REQUEST:
            return { ...state, current: { data: null, message: null, error: null, loading: true } };
        case TagAction.GET_TAG_BY_ID_SUCCESS:
            return { ...state, current: { data: action.payload.result, message: action.payload.message, loading: false } };
        case TagAction.GET_TAG_BY_ID_FAILURE:
            return { ...state, current: { data: null, message: action.payload.message, error: action.payload.error, loading: false } };
        case TagAction.RESET_CURRENT_TAG:
            return { ...state, current: { data: null, message: null, error: null, loading: false } };

        case TagAction.CREATE_TAG_REQUEST:
            return { ...state, created: { data: null, message: null, error: null, loading: true } };
        case TagAction.CREATE_TAG_SUCCESS:
            return { ...state, created: { data: action.payload.result, message: action.payload.message, loading: false } };
        case TagAction.CREATE_TAG_FAILURE:
            return { ...state, created: { data: null, message: action.payload.message, error: action.payload.error, loading: false } };
        case TagAction.RESET_CREATE_TAG:
            return { ...state, created: { data: null, message: null, error: null, loading: false } };

        case TagAction.UPDATE_TAG_REQUEST:
            return { ...state, updated: { data: null, message: null, error: null, loading: true } };
        case TagAction.UPDATE_TAG_SUCCESS:
            return { ...state, updated: { data: action.payload.result, message: action.payload.message, loading: false } };
        case TagAction.UPDATE_TAG_FAILURE:
            return { ...state, updated: { data: null, message: action.payload.message, error: action.payload.error, loading: false } };
        case TagAction.RESET_UPDATE_TAG:
            return { ...state, updated: { data: null, message: null, error: null, loading: false } };

        case TagAction.DELETE_TAG_REQUEST:
            return { ...state, deleted: { data: action.payload, message: null, error: null, loading: true } };
        case TagAction.DELETE_TAG_SUCCESS:
            const { result, message } = action.payload;
            const newData = state.list.data.filter(t => t._id !== result._id);
            return {
                ...state,
                list: {
                    data: newData,
                    pagination: state.list.pagination,
                    message: null,
                    loading: false
                },
                deleted: { data: result, message: message, loading: false }
            }
        case TagAction.DELETE_TAG_FAILURE:
            return { ...state, deleted: { data: null, error: action.payload.error, message: action.payload.message, loading: false } };
        case TagAction.RESET_DELETE_TAG:
            return { ...state, deleted: { data: null, message: null, error: null, loading: false } };

        default:
            return state
    }
}

import * as types from '../actions/Tag';

const INITIAL_STATE = {
    list: { data: null, pagination: null, message: null, isFetching: false },
    current: { data: null, error: null, isFetching: false },
    created: { data: null, error: null, isFetching: false },
    updated: { data: null, error: null, isFetching: false },
    deleted: { data: null, error: null, isFetching: false }
};

function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

export default function Tag(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_ALL_TAGS_SUCCESS:
            const { data, pagination } = action.payload.result;
            return { ...state, list: { data, pagination, message: action.payload.message, isFetching: false } };
        case types.GET_ALL_TAGS_FAILURE:
            return { ...state, list: { data: state.list.data || null, error: action.payload.error, message: action.payload.message, isFetching: false } };
        case types.RESET_GET_ALL_TAGS:
            return { ...state, list: { data: null, error: null, message: null, isFetching: false } };

        case types.GET_TAG_BY_ID_REQUEST:
            return { ...state, current: { data: null, error: null, isFetching: true } };
        case types.GET_TAG_BY_ID_SUCCESS:
            return { ...state, current: { data: action.payload.result, message: action.payload.message, isFetching: false } };
        case types.GET_TAG_BY_ID_FAILURE:
            return { ...state, current: { data: null, error: action.payload.error, message: action.payload.message, isFetching: false } };
        case types.RESET_CURRENT_TAG:
            return { ...state, current: { data: null, error: null, message: null, isFetching: false } };

        case types.CREATE_TAG_REQUEST:
            return { ...state, created: { data: null, error: null, isFetching: true } };
        case types.CREATE_TAG_SUCCESS:
            return { ...state, created: { data: action.payload.result, message: action.payload.message, isFetching: false } };
        case types.CREATE_TAG_FAILURE:
            return { ...state, created: { data: null, error: action.payload.error, message: action.payload.message, isFetching: false } };
        case types.RESET_CREATE_TAG:
            return { ...state, created: { data: null, error: null, message: null, isFetching: false } };

        case types.UPDATE_TAG_REQUEST:
            return { ...state, updated: { data: null, error: null, isFetching: true } };
        case types.UPDATE_TAG_SUCCESS:
            return { ...state, updated: { data: action.payload.result, message: action.payload.message, isFetching: false } };
        case types.UPDATE_TAG_FAILURE:
            return { ...state, updated: { data: null, error: action.payload.error, message: action.payload.message, isFetching: false } };
        case types.RESET_UPDATE_TAG:
            return { ...state, updated: { data: null, error: null, isFetching: false } };

        case types.DELETE_TAG_REQUEST:
            return { ...state, deleted: { data: action.payload, error: null, isFetching: true } };
        case types.DELETE_TAG_SUCCESS:
            const newData = state.list.data.result.filter(obj => obj.id !== action.payload);
            return {
                ...state,
                list: {
                    data: newData,
                    pagination: state.list.pagination,
                    error: null,
                    isFetching: false
                },
                deleted: { data: action.payload, error: null, isFetching: false }
            }
        case types.DELETE_TAG_FAILURE:
            return { ...state, deleted: { data: action.payload.result, error: action.payload.error, message: action.payload.message, isFetching: false } };
        case types.RESET_DELETE_TAG:
            return { ...state, deleted: { data: null, error: null, message: null, isFetching: false } };

        default:
            return state
    }
}

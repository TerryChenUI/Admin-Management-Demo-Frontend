import * as types from '../actions/Category';

const INITIAL_STATE = {
    list: { data: null, error: null, isFetching: false },
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

export default function Category(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_ALL_CATEGORIES_SUCCESS:
            return { ...state, list: { data: action.payload.data, error: null, isFetching: false } };
        case types.GET_ALL_CATEGORIES_FAILURE:
            return { ...state, list: { data: state.list.data || null, error: action.payload, isFetching: false } };
        case types.RESET_GET_ALL_CATEGORIES:
            return { ...state, list: { data: null, error: null, isFetching: false } };

        case types.GET_CATEGORY_BY_ID_REQUEST:
            return { ...state, current: { data: null, error: null, isFetching: true } };
        case types.GET_CATEGORY_BY_ID_SUCCESS:
            return { ...state, current: { data: action.payload.data, error: null, isFetching: false } };
        case types.GET_CATEGORY_BY_ID_FAILURE:
            return { ...state, current: { data: null || null, error: action.payload, isFetching: false } };
        case types.RESET_CURRENT_CATEGORY:
            return { ...state, current: { data: null, error: null, isFetching: false } };

        case types.CREATE_CATEGORY_REQUEST:
            return { ...state, created: { data: null, error: null, isFetching: true } };
        case types.CREATE_CATEGORY_SUCCESS:
            return { ...state, created: { data: action.payload.data, error: null, isFetching: false } };
        case types.CREATE_CATEGORY_FAILURE:
            return { ...state, created: { data: null, error: action.payload.message, isFetching: false } };
        case types.RESET_CREATE_CATEGORY:
            return { ...state, created: { data: null, error: null, isFetching: false } };

        case types.UPDATE_CATEGORY_REQUEST:
            return { ...state, updated: { data: null, error: null, isFetching: true } };
        case types.UPDATE_CATEGORY_SUCCESS:
            return { ...state, updated: { data: action.payload.data, error: null, isFetching: false } };
        case types.UPDATE_CATEGORY_FAILURE:
            return { ...state, updated: { data: null, error: action.payload.message, isFetching: false } };
        case types.RESET_UPDATE_CATEGORY:
            return { ...state, updated: { data: null, error: null, isFetching: false } };

        case types.DELETE_CATEGORY_REQUEST:
            return { ...state, deleted: { data: action.payload, error: null, isFetching: true } };
        case types.DELETE_CATEGORY_SUCCESS:
            const newData = state.list.data.result.filter(obj => obj.id !== action.payload);
            return {
                ...state,
                list: {
                    data: {
                        result: newData,
                        total: state.list.data.total
                    },
                    error: null,
                    isFetching: false
                },
                deleted: { data: action.payload, error: null, isFetching: false }
            }
        case types.DELETE_CATEGORY_FAILURE:
            return { ...state, deleted: { data: action.payload, error: action.payload.message, isFetching: false } };
        case types.RESET_DELETE_CATEGORY:
            return { ...state, deleted: { data: null, error: null, isFetching: false } };

        default:
            return state
    }
}

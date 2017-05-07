import * as types from '../actions/Category';

const INITIAL_STATE = {
    list: { data: null, pagination: null, message: null, error: null, isFetching: false },
    current: { data: null, message: null, error: null, isFetching: false },
    created: { data: null, message: null, error: null, isFetching: false },
    updated: { data: null, message: null, error: null, isFetching: false },
    deleted: { data: null, message: null, error: null, isFetching: false }
};

export default function Category(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_CATEGORIES_SUCCESS:
            const { data, pagination } = action.payload.result;
            return { ...state, list: { data, pagination, message: action.payload.message, isFetching: false } };
        case types.GET_CATEGORIES_FAILURE:
            return { ...state, list: { data: state.list.data || null, message: action.payload.message, error: action.payload.error, isFetching: false } };
        case types.RESET_GET_CATEGORIES:
            return { ...state, list: { data: null, pagination: null, message: null, error: null, isFetching: false } };

        case types.GET_CATEGORY_BY_ID_REQUEST:
            return { ...state, current: { data: null, message: null, error: null, isFetching: true } };
        case types.GET_CATEGORY_BY_ID_SUCCESS:
            return { ...state, current: { data: action.payload.result, message: action.payload.message, isFetching: false } };
        case types.GET_CATEGORY_BY_ID_FAILURE:
            return { ...state, current: { data: null, message: action.payload.message, error: action.payload.error, isFetching: false } };
        case types.RESET_CURRENT_CATEGORY:
            return { ...state, current: { data: null, message: null, error: null, isFetching: false } };

        case types.CREATE_CATEGORY_REQUEST:
            return { ...state, created: { data: null, message: null, error: null, isFetching: true } };
        case types.CREATE_CATEGORY_SUCCESS:
            return { ...state, created: { data: action.payload.result, message: action.payload.message, isFetching: false } };
        case types.CREATE_CATEGORY_FAILURE:
            return { ...state, created: { data: null, message: action.payload.message, error: action.payload.error, isFetching: false } };
        case types.RESET_CREATE_CATEGORY:
            return { ...state, created: { data: null, message: null, error: null, isFetching: false } };

        case types.UPDATE_CATEGORY_REQUEST:
            return { ...state, updated: { data: null, message: null, error: null, isFetching: true } };
        case types.UPDATE_CATEGORY_SUCCESS:
            return { ...state, updated: { data: action.payload.result, message: action.payload.message, isFetching: false } };
        case types.UPDATE_CATEGORY_FAILURE:
            return { ...state, updated: { data: null, message: action.payload.message, error: action.payload.error, isFetching: false } };
        case types.RESET_UPDATE_CATEGORY:
            return { ...state, updated: { data: null, message: null, error: null, isFetching: false } };

        case types.DELETE_CATEGORY_REQUEST:
            return { ...state, deleted: { data: action.payload, message: null, error: null, isFetching: true } };
        case types.DELETE_CATEGORY_SUCCESS:
            const { result, message } = action.payload;
            const newData = state.list.data.filter(t => t._id !== result._id);
            return {
                ...state,
                list: {
                    data: newData,
                    pagination: state.list.pagination,
                    message: null,
                    isFetching: false
                },
                deleted: { data: result, message: message, isFetching: false }
            }
        case types.DELETE_CATEGORY_FAILURE:
            return { ...state, deleted: { data: null, error: action.payload.error, message: action.payload.message, isFetching: false } };
        case types.RESET_DELETE_CATEGORY:
            return { ...state, deleted: { data: null, message: null, error: null, isFetching: false } };

        default:
            return state
    }
}

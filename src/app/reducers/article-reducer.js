import { ArticleAction } from '../actions';

const INITIAL_STATE = {
    list: { data: null, pagination: null, message: null, error: null, loading: false },
    current: { data: null, message: null, error: null, loading: false },
    created: { data: null, message: null, error: null, loading: false },
    updated: { data: null, message: null, error: null, loading: false },
    deleted: { data: null, message: null, error: null, loading: false }
};

export default function Article(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ArticleAction.GET_ARTICLES_SUCCESS:
            const { data, pagination } = action.payload.result;
            return { ...state, list: { data, pagination, message: action.payload.message, loading: false } };
        case ArticleAction.GET_ARTICLES_FAILURE:
            return { ...state, list: { data: state.list.data || null, message: action.payload.message, error: action.payload.error, loading: false } };
        case ArticleAction.RESET_GET_ARTICLES:
            return { ...state, list: { data: null, pagination: null, message: null, error: null, loading: false } };

        case ArticleAction.GET_ARTICLE_BY_ID_REQUEST:
            return { ...state, current: { data: null, message: null, error: null, loading: true } };
        case ArticleAction.GET_ARTICLE_BY_ID_SUCCESS:
            return { ...state, current: { data: action.payload.result, message: action.payload.message, loading: false } };
        case ArticleAction.GET_ARTICLE_BY_ID_FAILURE:
            return { ...state, current: { data: null, message: action.payload.message, error: action.payload.error, loading: false } };
        case ArticleAction.RESET_CURRENT_ARTICLE:
            return { ...state, current: { data: null, message: null, error: null, loading: false } };

        case ArticleAction.CREATE_ARTICLE_REQUEST:
            return { ...state, created: { data: null, message: null, error: null, loading: true } };
        case ArticleAction.CREATE_ARTICLE_SUCCESS:
            return { ...state, created: { data: action.payload.result, message: action.payload.message, loading: false } };
        case ArticleAction.CREATE_ARTICLE_FAILURE:
            return { ...state, created: { data: null, message: action.payload.message, error: action.payload.error, loading: false } };
        case ArticleAction.RESET_CREATE_ARTICLE:
            return { ...state, created: { data: null, message: null, error: null, loading: false } };

        case ArticleAction.UPDATE_ARTICLE_REQUEST:
            return { ...state, updated: { data: null, message: null, error: null, loading: true } };
        case ArticleAction.UPDATE_ARTICLE_SUCCESS:
            return { ...state, updated: { data: action.payload.result, message: action.payload.message, loading: false } };
        case ArticleAction.UPDATE_ARTICLE_FAILURE:
            return { ...state, updated: { data: null, message: action.payload.message, error: action.payload.error, loading: false } };
        case ArticleAction.RESET_UPDATE_ARTICLE:
            return { ...state, updated: { data: null, message: null, error: null, loading: false } };

        case ArticleAction.DELETE_ARTICLE_REQUEST:
            return { ...state, deleted: { data: action.payload, message: null, error: null, loading: true } };
        case ArticleAction.DELETE_ARTICLE_SUCCESS:
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
        case ArticleAction.DELETE_ARTICLE_FAILURE:
            return { ...state, deleted: { data: null, error: action.payload.error, message: action.payload.message, loading: false } };
        case ArticleAction.RESET_DELETE_ARTICLE:
            return { ...state, deleted: { data: null, message: null, error: null, loading: false } };

        default:
            return state
    }
}

import * as types from '../actions/App';

const INITIAL_STATE = {
    user: { id: '1', username: 'admin' },
    menuPopoverVisible: false,
    isNavbar: document.body.clientWidth < 769,
    siderFold: localStorage.getItem('siderFold') === 'true',
    darkTheme: localStorage.getItem('darkTheme') === 'true',
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys')) || []
};

export default function App(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.SWITCH_SIDER:
            localStorage.setItem('siderFold', !state.siderFold);
            return { ...state, siderFold: !state.siderFold };
        case types.SWITCH_THEME:
            localStorage.setItem('darkTheme', !state.darkTheme);
            return { ...state, darkTheme: !state.darkTheme };
        case types.SWITCH_MENU_POPOVER:
            return { ...state, menuPopoverVisible: !state.menuPopoverVisible };
        case types.HANDLE_NAV_OPENKEYS:
            return { ...state, navOpenKeys: action.payload };
        case types.HANDLE_NAVBAR:
            const isNavbar = document.body.clientWidth < 769
            return { ...state, isNavbar: isNavbar };
        default:
            return state
    }
}

import { AppAction } from '../actions';
import { config } from '../utils';

const storageKey = config.storageKey;

const INITIAL_STATE = {
    user: { id: '1', username: 'admin' },
    menuPopoverVisible: false,
    isNavbar: document.body.clientWidth < 769,
    siderFold: localStorage.getItem(storageKey.siderFold) === 'true',
    lightTheme: localStorage.getItem(storageKey.lightTheme) === 'true',
    navOpenKeys: JSON.parse(localStorage.getItem(storageKey.navOpenKeys)) || []
};

export default function App(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AppAction.SWITCH_SIDER:
            localStorage.setItem(storageKey.siderFold, !state.siderFold);
            return { ...state, siderFold: !state.siderFold };
        case AppAction.SWITCH_THEME:
            localStorage.setItem(storageKey.lightTheme, !state.lightTheme);
            return { ...state, lightTheme: !state.lightTheme };
        case AppAction.SWITCH_MENU_POPOVER:
            return { ...state, menuPopoverVisible: !state.menuPopoverVisible };
        case AppAction.HANDLE_NAV_OPENKEYS:
            return { ...state, navOpenKeys: action.payload };
        case AppAction.HANDLE_NAVBAR:
            const isNavbar = document.body.clientWidth < 769
            return { ...state, isNavbar: isNavbar };
        default:
            return state
    }
}

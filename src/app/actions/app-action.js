import { createActions } from 'redux-actions';

export const SWITCH_SIDER = 'app/switchSider';
export const SWITCH_THEME = 'app/switchTheme';
export const SWITCH_MENU_POPOVER = 'app/switchMenuPopover';
export const HANDLE_NAV_OPENKEYS = 'app/handleNavOpenKeys';
export const HANDLE_NAVBAR = 'app/handleNavbar';

// export const { switchSider, switchTheme, switchMenuPopover, changeOpenKeys, changeNavbar } = createActions({
//     SWITCH_SIDER: () => { },
//     SWITCH_THEME: () => { },
//     SWITCH_MENU_POPOVER: () => { },
//     HANDLE_NAV_OPENKEYS: (openKeys) => { openKeys },
//     HANDLE_NAVBAR: () => { }
// });

export function switchSider() {
    return { type: SWITCH_SIDER };
}

export function switchTheme() {
    return { type: SWITCH_THEME };
}

export function switchMenuPopover() {
    return { type: SWITCH_MENU_POPOVER };
}

export function changeOpenKeys(openKeys) {
    return { type: HANDLE_NAV_OPENKEYS, payload: openKeys };
}

export function changeNavbar() {
    return { type: HANDLE_NAVBAR };
}
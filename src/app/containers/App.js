import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { AppAction } from '../actions';
import { Layout } from '../components';
import { menu } from '../utils';

import 'antd/dist/antd.css';
import '../themes/index.less';
import './App.scss';

const { Header, Bread, Footer, Sider, styles } = Layout;
let tid;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    resize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
            this.props.changeNavbar();
        }, 300)
    }

    componentWillMount() {
        this.resize();
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize);
    }

    componentWillUnmount() {
        clearTimeout(tid);
        window.removeEventListener("resize", this.resize);
    }

    render() {
        const { user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys,
            switchSider, switchTheme, switchMenuPopover, changeOpenKeys, changeNavbar } = this.props;

        const headerProps = {
            menu,
            user,
            siderFold,
            location,
            isNavbar,
            menuPopoverVisible,
            navOpenKeys,
            switchSider,
            switchMenuPopover,
            changeOpenKeys,
            logout() {
                dispatch({ type: 'app/logout' })
            }
        };

        const siderProps = {
            menu,
            darkTheme,
            siderFold,
            location,
            navOpenKeys,
            switchTheme,
            changeOpenKeys(openKeys) {
                localStorage.setItem('navOpenKeys', JSON.stringify(openKeys));
                changeOpenKeys(openKeys);
            },
        };

        const breadProps = { menu };

        // response
        let tid = null;
        window.onresize = () => {
            clearTimeout(tid);
            tid = setTimeout(() => {
                changeNavbar();
            }, 300)
        };

        return (
            <div className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold }, { [styles.withnavbar]: isNavbar })}>
                {!isNavbar ? <aside className={classnames(styles.sider, { [styles.light]: !darkTheme })}>
                    <Sider {...siderProps} />
                </aside> : ''}
                <div className={styles.main}>
                    <Header {...headerProps} />
                    <Bread {...breadProps} location={location} />
                    <div className={styles.container}>
                        <div className={styles.content}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.app };
}

function mapDispatchToProps(dispatch) {
    return {
        switchTheme: () => dispatch(AppAction.switchTheme()),
        switchMenuPopover: () => dispatch(AppAction.switchMenuPopover()),
        switchSider: () => dispatch(AppAction.switchSider()),
        changeOpenKeys: (openKeys) => dispatch(AppAction.changeOpenKeys(openKeys)),
        changeNavbar: () => dispatch(AppAction.changeNavbar())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
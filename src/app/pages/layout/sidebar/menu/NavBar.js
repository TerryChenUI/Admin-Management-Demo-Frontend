import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

const section = [
    {
        name: '常用',
        menus: [
            {
                name: '首页',
                path: '/',
                icon: 'fa-home',
                key: 'home'
            },
            {
                name: '公告管理',
                path: '/notice',
                icon: 'fa-bar-chart-o',
                key: 'notice'
            },
            {
                name: '文章管理',
                icon: 'fa-edit',
                key: 'article',
                subMenus: [
                    {
                        name: '所有文章',
                        path: '/article/list',
                        icon: 'fa-home',
                        key: 'articleList'
                    },
                    {
                        name: '发布文章',
                        path: '/article/add',
                        icon: 'fa-home',
                        key: 'articleAdd'
                    },
                    {
                        name: '分类目录',
                        path: '/category/list',
                        icon: 'fa-home',
                        key: 'category'
                    },
                    {
                        name: '文章标签',
                        path: '/tag/list',
                        icon: 'fa-home',
                        key: 'tag'
                    },
                ]
            },
            {
                name: 'Dashboard',
                icon: 'fa-home',
                key: 'dashboard',
                subMenus: [
                    {
                        name: 'Dashboard1',
                        path: '',
                        icon: 'fa-home',
                        key: 'home1'
                    },
                    {
                        name: 'Dashboard2',
                        path: '',
                        icon: 'fa-home',
                        key: 'home2',
                    }
                ]
            }
        ]
    },
    {
        name: '全局',
        menus: [
            {
                name: '文章管理',
                icon: 'fa-home',
                key: 'article10',
                subMenus: [
                    {
                        name: '所有文章',
                        path: '/article2',
                        icon: 'fa-home',
                        key: 'article2'
                    },
                    {
                        name: '发布文章',
                        path: '/article2/add',
                        icon: 'fa-home',
                        key: 'article3'
                    },
                    {
                        name: '分类目录',
                        path: '/category2/list',
                        icon: 'fa-home',
                        key: 'article4'
                    },
                    {
                        name: '文章标签',
                        path: '/tag2/list',
                        icon: 'fa-home',
                        key: 'article5'
                    },
                ]
            },
        ]
    }
];

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.setMenuState(this.props.location.pathname)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.setMenuState(nextProps.location.pathname));
    }

    setMenuState(path) {
        const keys = {};
        section.map(t => {
            t.menus.map(m => {
                if (m.subMenus) {
                    m.subMenus.map(n => {
                        if (n.path === path) {
                            keys.currentKey = n.key;
                            keys.openKey = m.key;
                            return;
                        }
                    });
                } else {
                    if (m.path === path) {
                        keys.currentKey = m.key;
                        return;
                    }
                }
            });
        });
        return keys;
    }

    onOpenChange(e, openKey) {
        this.setState({
            openKey: this.state.openKey == openKey ? "" : openKey
        });
    }

    handleClick(e, path, currentKey, openKey) {
        this.setState({
            currentKey: currentKey,
            openKey: openKey
        });
        browserHistory.push(path);
    }

    renderSubMenu(data, openKey) {
        return data.map(t => {
            return (
                <li key={t.key} className={this.state.currentKey == t.key ? "active" : ""}><a href="javascript:void(0)" onClick={(e) => this.handleClick(e, t.path, t.key, openKey)}>{t.name}</a></li>
            )
        });
    }

    renderMenu(data) {
        return data.map(t => {
            return (
                t.subMenus ?
                    <li key={t.key} className={this.state.openKey == t.key ? "active" : ""} onClick={(e) => this.onOpenChange(e, t.key)}>
                        <Link to={t.link}><i className={`fa ${t.icon}`}></i>{t.name} <span className={`fa fa-chevron-${this.state.openKey == t.key ? "down" : "up"}`}></span></Link>
                        <ul className="nav child_menu" style={{ display: this.state.openKey == t.key ? "block" : "none" }}>
                            {this.renderSubMenu(t.subMenus, t.key)}
                        </ul>
                    </li>
                    : <li key={t.key} className={this.state.currentKey == t.key ? "active" : ""}><a href="javascript:void(0)" onClick={(e) => this.handleClick(e, t.path, t.key)}><i className={`fa ${t.icon}`}></i>{t.name}</a></li>
            )
        });
    }

    render() {
        return (
            <div className="sidebar-menu hidden-print">
                {
                    section.map((t, index) => {
                        return (
                            <div key={index} className="menu_section">
                                <h3>{t.name}</h3>
                                <ul className="nav side-menu">
                                    {this.renderMenu(t.menus)}
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import Notice from './Notice';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notices: []
        };
    }

    getUuid = () => {
        return `ruiNotification_${Date.now()}`;
    }

    add(notice) {
        const key = notice.key = notice.key || this.getUuid();
        this.setState(previousState => {
            const notices = previousState.notices;
            if (!notices.filter(v => v.key === key).length) {
                return {
                    notices: notices.concat(notice),
                };
            }
        });
    }

    remove(key) {
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key),
            };
        });
    }

    render() {
        const props = this.props;
        const noticeNodes = this.state.notices.map((notice) => {
            return (
                <Notice {...notice} prefixCls={props.prefixCls} onClose={(key) => this.remove(notice.key)}>
                    {notice.content}
                </Notice>
            );
        });
        return (
            <div className="rui-notification">
                <ReactCSSTransitionGroup
                    transitionName="notification"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={200}>
                    {noticeNodes}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

Notification.newInstance = function newNotificationInstance(properties) {
    const props = properties || {};
    const div = document.createElement('div');
    div.setAttribute('class', 'rui-notification-panel');
    document.body.appendChild(div);

    const notification = ReactDOM.render(<Notification {...props} />, div);
    return {
        component: notification,
        notice(noticeProps) {
            notification.add(noticeProps);
        },
        removeNotice(key) {
            notification.remove(key);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    };
}

export default Notification;

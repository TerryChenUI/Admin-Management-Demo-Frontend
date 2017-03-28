import React, { Component, PropTypes } from 'react';
import Notification from './Notification';
import './style.scss';

let notificationInstance = null;
const prefixCls = 'rui-notification-notice';
const defaultDuration = 3;
const types = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
};

function getNotificationInstance() {
  if (notificationInstance) {
    return notificationInstance;
  }
  notificationInstance = Notification.newInstance({
    prefixCls: prefixCls
  });
  return notificationInstance;
}

function notice(args) {
  const duration = args.duration !== undefined ? args.duration : defaultDuration;
  const iconType = args.type ? `${args.type}-icon` : '';

  getNotificationInstance().notice({
    content: (
      <div className={iconType ? `${prefixCls}-${iconType}` : ''}>
        <div className={`${prefixCls}-message`}>{args.message}</div>
        <div className={`${prefixCls}-description`}>{args.description}</div>
      </div>
    ),
    duration,
    key: args.key
  });
}

const api = {
  success: (args) => { },
  info: (args) => { },
  warn: (args) => { },
  error: (args) => { },
  open: (args) => {
    notice(args);
  },
  close: (key) => {
    if (notificationInstance) {
      notificationInstance.removeNotice(key);
    }
  },
  config: (args) => { },
  destroy: () => {
    if (notificationInstance) {
      notificationInstance.destroy();
      notificationInstance = null;
    }
  }
}

Object.keys(types).forEach((type) => {
  api[type] = (args) => api.open({ ...args, type });
});

export default api;
import { notification } from 'antd';

export function success(message, description = null) {
  notification['success']({
    message,
    description
  });
};

export function error(message, description = null) {
  notification['error']({
    message,
    description,
    duration: null
  });
};
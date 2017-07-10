import { notification } from 'antd';

export function success(message, description = null) {
  notification['success']({
    message,
    description
  });
};

export function error(error) {
  const { response } = error;
  notification['error']({
    message: response.message,
    description: response.error,
    duration: null
  });
};
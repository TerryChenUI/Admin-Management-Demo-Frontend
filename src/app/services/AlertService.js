import notification from '../rui/notification';
import { browserHistory } from 'react-router';

const alertService = {
    success(message, description, redirectUrl, duration = 4) {
        notification.success({
            message: message,
            description: description,
            duration: duration
        });
        redirectUrl && browserHistory.push(redirectUrl);
    },
    error(message, description, duration = 0) {
        notification.error({
            message: message,
            description: description,
            duration: error
        });
    }
};

export default alertService;
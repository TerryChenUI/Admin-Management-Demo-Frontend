import notification from '../rui/notification';
import { browserHistory } from 'react-router';

const alertService = {
    success(message, description = null, redirectUrl = null, duration = 4) {
        notification.success({
            message: message,
            description: description,
            duration: duration
        });
        redirectUrl && browserHistory.push(redirectUrl);
    },
    error(message, description = null, duration = 0) {
        notification.error({
            message: message,
            description: description,
            duration: duration
        });
    },
    createNotify(created, {description, redirectUrl, duration}) {
        created.data ? alertService.success(created.message, description, redirectUrl, duration) : alertService.error(created.message, created.error.message);
    },
    updateNotify(updated, {description, redirectUrl, duration}) {
        updated.data ? alertService.success(updated.message, description, redirectUrl, duration) : alertService.error(updated.message, updated.error.message);
    },
    deleteNotify(deleted) {
        if (((deleted.data && !deleted.error) || (!deleted.data && deleted.error)) && !deleted.isFetching) {
            deleted.data ? this.success(deleted.message) : this.error(deleted.message, deleted.error.message);
        }
    }
};

export default alertService;
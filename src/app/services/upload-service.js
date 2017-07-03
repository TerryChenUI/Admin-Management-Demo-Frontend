import { request, config } from '../utils';

export async function remove(filePath) {
    return await request(`${config.site.apiPrefix}upload/delete`, {
        method: 'DELETE',
        body: { filePath }
    });
}
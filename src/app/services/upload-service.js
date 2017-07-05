import { request, config } from '../utils';

export async function uploadContent(formData) {
    console.log(formData);
    return await request(`${config.site.apiPrefix}upload`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    });
};

export async function remove(filePath) {
    return await request(`${config.site.apiPrefix}upload/delete`, {
        method: 'DELETE',
        body: { filePath }
    });
}
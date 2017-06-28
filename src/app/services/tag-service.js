import { request, config, objectToArray } from '../utils';

const api = `${config.site.apiPrefix}tags`;

export async function loadList({ params = null, current, pageSize }) {
    params = [...objectToArray(params), `currentPage=${current}`, `perPage=${pageSize}`];
    return await request(`${api}?${params.join('&')}`);
}

export async function getAll() {
    return await request(`${api}?currentPage=1&perPage=100`);
}

export async function getById(id) {
    return await request(`${api}/${id}`);
}

export async function checkExist(param) {
    return await request(`${api}/checkexist?${param}`);
}

export async function create(params) {
    return await request(api, {
        method: 'POST',
        body: params
    });
}

export async function update(params) {
    const { _id, ...body } = params;
    return await request(`${api}/${_id}`, {
        method: 'PUT',
        body: body
    });
}

export async function remove(id) {
    return await request(`${api}/${id}`, {
        method: 'DELETE'
    });
}
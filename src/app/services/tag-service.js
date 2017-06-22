import { request } from '../utils';

const api = '/api/tags';

export async function loadList({ filter = null, current, pageSize }) {
    let params = [];
    filter && Object.keys(filter).map((key) => {
        params.push(`${key}=${filter[key]}`);
    });
    params = [...params, `currentPage=${current}`, `perPage=${pageSize}`];
    return await request(`${api}?${params.join('&')}`);
}

export async function getAll() {
    return await request(`${api}?currentPage=1&perPage=100`);
}

export async function getById(id) {
    return await request(`${api}/${id}`);
}

export async function create(params) {
    return await request(`/api/tags`, {
        method: 'POST',
        body: params
    });
}

export async function update(params) {
    const { _id, ...body } = params;
    return await request(`/api/tags/${_id}`, {
        method: 'PUT',
        body: body
    });
}

export async function remove(id) {
    return await request(`${api}/${id}`, {
        method: 'DELETE'
    });
}
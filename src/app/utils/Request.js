import fetch from 'isomorphic-fetch';

export default async function request(url, options = {}) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    options.headers = options.headers ? Object.assign(headers, options.headers) : headers;
    if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, options);
    checkStatus(response);

    const data = await response.json();
    return checkCode(response, data);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throwError(response);
}

function checkCode(response, data) {
    if (data.code) {
        return data;
    }
    throwError(response, data);
}

function parseJSON(response) {
    return response.json();
}

function throwError(response, data) {
    const error = new Error(response.statusText || response.status);
    error.response = data || response;
    throw error;
}

// export function getFetch(url) {
//     return fetchWrapper(url);
// }

// export function postFetch(url, params) {
//     const options = {
//         method: 'POST',
//         body: params
//     };
//     return fetchWrapper(url, options);
// }

// export function putFetch(url, params) {
//     const options = {
//         method: 'PUT',
//         body: params
//     };
//     return fetchWrapper(url, options);
// }

// export function deleteFetch(url) {
//     const options = {
//         method: 'DELETE'
//     };
//     return fetchWrapper(url, options);
// }
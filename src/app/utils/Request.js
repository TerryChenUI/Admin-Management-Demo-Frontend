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
    if (response.status === 200 || response.status === 401) {
        return response;
    } else {
        throwError(response);
    }
}

function checkCode(response, data) {
    // data.code = 0;
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
    error.response = data ? { message: data.message, error: data.error.message } : { message: error.message };
    throw error;
}
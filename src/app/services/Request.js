import fetch from 'isomorphic-fetch';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText || response.status);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

function fetchWrapper(url, options = {}) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    options.headers = options.headers ? Object.assign(headers, options.headers) : headers;
    if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}

export function getFetch(url) {
    return fetchWrapper(url);
}

export function postFetch(url, params) {
    const options = {
        method: 'POST',
        body: params
    };
    return fetchWrapper(url, options);
}

export function putFetch(url, params) {
    const options = {
        method: 'PUT',
        body: params
    };
    return fetchWrapper(url, options);
}

export function deleteFetch(url) {
    const options = {
        method: 'DELETE'
    };
    return fetchWrapper(url, options);
}
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

export default function fetchWrapper(url, options = { headers: {} }) {
    options.headers = Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, options.headers);
    if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}
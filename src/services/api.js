import request from '../utils/request';

export async function products(params) {
    return request('http://localhost:3001/products', {
        method: 'GET',
        params,
    });
}

export async function users(params) {
    return request('/api/users', {
        method: 'GET',
        params,
    });
}
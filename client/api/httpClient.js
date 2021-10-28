import axios from 'axios'

let headerData = {
    'Content-Type': 'application/json'
}
if(localStorage.getItem('jwt')){
    headerData = { ...headerData, 'Authorization': "Bearer " + localStorage.getItem('jwt') } 
}

export function httpClient(baseURL) {
    return {
        get: (path) => {
            const url = baseURL + path
            return axios.get(url, {
                headers: headerData
            } )
        },
        post: (path, body, options = {}) => {
            const url = baseURL + path
            return axios.post(url, JSON.stringify(body), {
                ...options,
                headers: headerData
            })
        },
        put: (path, body, options = {}) => {
            const url = baseURL + path
            return axios.put(url, JSON.stringify(body), {
                ...options,
                headers: headerData
            })
        },
        delete: (path, body, options = {}) => {
            const url = baseURL + path
            console.log(url, ' url from httpp')
            return axios.delete(url, {
                ...options,
                headers: headerData
            })
        }
    };
}

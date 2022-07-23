import axios from "axios";


// baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3'
const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage, page) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEvent(id) {
        return apiClient.get('/events/' + id)
    }
}

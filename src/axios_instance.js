import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://api.chucknorris.io'
})
export default instance
import axios from 'axios'

const instance = axios.create({
    //baseURL:'http://localhost:3001',
    baseURL: 'https://raicesruralesback-production.up.railway.app',
    withCredentials:true,
    
})

export default instance
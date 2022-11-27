import axios from 'axios';
import config from 'config';


export const noAuthClient = axios.create({
    baseURL: config.apiUrl,
    timeout: 20000
});

import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://tool-desk-server.vercel.app/'
})
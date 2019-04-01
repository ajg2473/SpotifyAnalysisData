import axios from 'axios';
import config from '../config/config';

const baseURL = `http://${config.serverHost}/api`;

export const search = (query: string) => axios.get(`${baseURL}/search`, { params: { query } });

export const getSongData = (docId: number) => axios.get(`${baseURL}/getSongData`, { params: { docId }});

export const addComment = (comment: {username: string, comment: string, docId: number}) => axios.post(`${baseURL}/addComment`, comment);

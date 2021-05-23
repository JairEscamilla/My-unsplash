import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://my-unsplash-api.vercel.app/api'
});
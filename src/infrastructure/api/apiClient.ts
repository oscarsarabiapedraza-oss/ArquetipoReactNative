import axios from 'axios';
import { APIConfig } from '../config/apiConfig';

export const api = axios.create({
  baseURL: APIConfig.baseUrl,
  timeout: 10000,
});

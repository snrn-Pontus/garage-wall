import GarageWall from './GarageWall';
import axios, { AxiosRequestConfig } from 'axios';

export const get = (url: string, config: AxiosRequestConfig) => {
  config.headers = { stop: true, id: Math.random() * 1000 };
  return axios.get(url, config).catch(e => {
    console.log('E', e);
  });
};

export default GarageWall;

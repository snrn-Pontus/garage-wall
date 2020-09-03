import { AxiosRequestConfig } from 'axios';

export interface iInterceptedRequest {
  id: string;
  config: AxiosRequestConfig;
  resolver: () => void;
  rejecter: () => void;
}

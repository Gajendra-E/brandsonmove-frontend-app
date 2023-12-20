/// <reference types="react-scripts" />

declare module '*.pdf';
declare module '*.png';
declare module '*.svg';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_HASURA_URL: string;
    REACT_APP_HASURA_URL_WS: string;
    REACT_APP_SERVICES_BASE_URL: string;
    REACT_APP_GOOGLE_MAP_API_KEY: string;
  }
}
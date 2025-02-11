export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://hris-hp-server-e32890126a44.herokuapp.com';
export const HOSTED_PATH =
  process.env.NODE_ENV === 'development' ? '' : '/hris-hp';

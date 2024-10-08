export const HOST = import.meta.env.VITE_SERVER_BASE_URL;

export const AUTH_ROUTES = "/api/v1/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const USER_INFO_ROUTE = `${AUTH_ROUTES}/user-info`;

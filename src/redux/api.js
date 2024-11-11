const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_URL_SECOUND = process.env.REACT_APP_BASE_URL_SECOUND;

export const endpoints = {
  SENDOTP_API: BASE_URL + "/sendotp",
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  GET_MOVIES: BASE_URL_SECOUND + "/movie/getAllMovies",
};

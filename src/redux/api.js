const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const adminendpoints = {
  GET_ALL_CINEMAS_API: BASE_URL + "/cinema/getCinemaDetailes",
  ADD_CINEMA_API: BASE_URL + "/cinema/addCinema",
  UPDATE_SCREEN_API: BASE_URL + "/cinema/updateScreen",
  ADD_SHOW_API: BASE_URL + "/show/addShow",
  LIVE_YOUR_SHOW_API: BASE_URL + "/show/liveYourShow",
};



export const movieEndPoins={
  ADD_MOVIE_API: BASE_URL + "/movie/addMovie",
  UPDATE_MOVIE_API: BASE_URL + "/movie/updatemovie",
  GET_MOVIES: BASE_URL + "/movie/getAllMovies",
}
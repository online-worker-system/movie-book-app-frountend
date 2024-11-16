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
  GET_SHOW_CINEMA_API: BASE_URL + "/cinema/getShowCinema",
  GET_ADMIN_CINEMAS_API: BASE_URL + "/cinema/getCinemaDetailes",
  ADD_CITY_API: BASE_URL + "/cinema/addCity",
  ADD_SHOW_API: BASE_URL + "/show/addShow",
  LIVE_YOUR_SHOW_API: BASE_URL + "/show/liveYourShow",
  GET_UNLIVE_SHOWS_API: BASE_URL + "/show/getUnliveShows",
};

export const movieEndPoins = {
  ADD_MOVIE_API: BASE_URL + "/movie/addMovie",
  UPDATE_MOVIE_API: BASE_URL + "/movie/updatemovie",
  GET_MOVIE_DETAILS: BASE_URL + "/movie/getMovieDetails",
  GET_MOVIES: BASE_URL + "/movie/getAllMovies",
  SHOW_SEATS_API: BASE_URL + "/cinema/getShowCinema",
  GET_SHOWS_CINEMAS_API: BASE_URL + "/movie/getMovieCinema",
};

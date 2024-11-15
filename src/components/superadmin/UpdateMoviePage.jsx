import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieEndPoins } from "../../redux/api";
import { setFormData, updateMovie } from "../../redux/reducer/movieSlice";
import { fetchMovieApi } from "../../redux/reducer/movieSlice";

const UpdateMoviePage = () => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const { movie } = useSelector((state) => state.movie);
  console.log(movie);
  const formData = useSelector((state) => state.movie);
  const { loading, error } = formData;
  console.log(formData);

  useEffect(() => {
    const getMovie = async (movie_id) => {
      const result = await dispatch(fetchMovieApi({ movieId: movie_id }));
      console.log("Movie fetched: ", result);

      if (fetchMovieApi.fulfilled.match(result)) {
        // Dispatch the movie data to setFormData
        dispatch(
          setFormData({
            movieName: result.payload.movieName,
            categories: result.payload.categories,
            releaseDate: result.payload.releaseDate,
            summary: result.payload.summary,
            castMembers: result.payload.castMembers,
            supportingLanguages: result.payload.supportingLanguages,
            thumbnailImage: result.payload.thumbnailImage,
            genres: result.payload.genres,
          })
        );
      } else {
        console.log("Fetch failed:", result.payload || result.error);
      }
    };

    getMovie(movie_id);
  }, [dispatch, movie_id]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ name, value }));
  };

  // Handle checkbox (categories/genres) changes
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    const updatedList = checked
      ? [...formData[field], value]
      : formData[field].filter((item) => item !== value);

    dispatch(setFormData({ name: field, value: updatedList }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    dispatch(setFormData({ name, value: files[0] }));
  };

  // Handle form submission (for updating movie)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const movieFormData = new FormData();
    movieFormData.append("movieId", movie_id);
    movieFormData.append("movieName", formData.movieName);
    movieFormData.append("releaseDate", formData.releaseDate);
    movieFormData.append("summary", formData.summary);
    movieFormData.append("castMembers", formData.castMembers);
    movieFormData.append("supportingLanguages", formData.supportingLanguages);

    // Append categories and genres
    formData.categories.forEach((category) =>
      movieFormData.append("categories[]", category)
    );
    formData.genres.forEach((genre) => movieFormData.append("genres", genre));

    // Append the thumbnail image if available
    if (formData.thumbnailImage) {
      movieFormData.append("thumbnailImage", formData.thumbnailImage);
    }

    // Dispatch the form data to Redux for API submission (update the movie)
    const res = await dispatch(updateMovie(movieFormData));
  };

  return (
    <div>
      {movie && movie.movieName ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
        >
          {/* Movie Name */}
          <div>
            <label
              htmlFor="movieName"
              className="block text-sm font-medium text-gray-700"
            >
              Movie Name
            </label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              value={formData.movieName || ""}
              onChange={handleInputChange}
              required
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <div className="mt-2 space-y-2">
              {["Hollywood", "Bollywood", "South"].map((category) => (
                <div key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={formData.categories.includes(category)}
                    onChange={(e) => handleCheckboxChange(e, "categories")}
                    className="mr-2"
                  />
                  <label htmlFor={category} className="text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Release Date */}
          <div>
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={
                formData.releaseDate
                  ? new Date(formData.releaseDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              required
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Summary */}
          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700"
            >
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary || ""}
              onChange={handleInputChange}
              required
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Cast Members */}
          <div>
            <label
              htmlFor="castMembers"
              className="block text-sm font-medium text-gray-700"
            >
              Cast Members
            </label>
            <input
              type="text"
              id="castMembers"
              name="castMembers"
              value={formData.castMembers || ""}
              onChange={handleInputChange}
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Supporting Languages */}
          <div>
            <label
              htmlFor="supportingLanguages"
              className="block text-sm font-medium text-gray-700"
            >
              Supporting Languages
            </label>
            <input
              type="text"
              id="supportingLanguages"
              name="supportingLanguages"
              value={formData.supportingLanguages || ""}
              onChange={handleInputChange}
              className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Thumbnail Image */}
          <div>
            <label
              htmlFor="thumbnailImage"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail Image
            </label>
            <input
              type="file"
              id="thumbnailImage"
              name="thumbnailImage"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genres
            </label>
            <div className="mt-2 space-y-2">
              {[
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Thriller",
                "Sci-Fi",
              ].map((genre) => (
                <div key={genre}>
                  <input
                    type="checkbox"
                    id={genre}
                    value={genre}
                    checked={formData.genres.includes(genre)}
                    onChange={(e) => handleCheckboxChange(e, "genres")}
                    className="mr-2"
                  />
                  <label htmlFor={genre} className="text-sm text-gray-700">
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Updating..." : "Update Movie"}
          </button>

          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      ) : (
        <div className="text-center">Loading</div>
      )}
    </div>
  );
};

export default UpdateMoviePage;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, submitMovieForm } from "../../redux/reducer/movieSlice";

const AddMoviePage = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.movie);
  const { loading, error } = formData;

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieFormData = new FormData();
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

    // Dispatch the form data to Redux for API submission
    try {
      const res = await dispatch(submitMovieForm(movieFormData));
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
          value={formData.movieName}
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
          value={formData.releaseDate}
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
          value={formData.summary}
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
          value={formData.castMembers}
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
          Supporting Languages (English,Hindi,Telugu,Tamil,Kannada)
        </label>
        <input
          type="text"
          id="supportingLanguages"
          name="supportingLanguages"
          value={formData.supportingLanguages}
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
          {["Action", "Adventure", "Comedy", "Drama", "Thriller", "Sci-Fi"].map(
            (genre) => (
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
            )
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "Submitting..." : "Submit Movie"}
      </button>

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </form>
  );
};

export default AddMoviePage;

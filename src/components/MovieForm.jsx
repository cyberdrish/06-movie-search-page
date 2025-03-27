import { useState } from "react";

function MovieForm({ fetchAll }) {
  const [searchedMovie, setSearchedMovie] = useState("");

  function handleMovieSearch(e) {
    e.preventDefault();
    fetchAll(searchedMovie);
  }

  return (
    <form
      onSubmit={(e) => handleMovieSearch(e)}
      className="max-h-35 overflow-y-auto rounded-md justify-items-center"
    >
      <h1 className="text-3xl">Movie search page</h1>
      <div className="flex flex-wrap gap-2 items-center mt-4">
        <input
          type="text"
          id="first_name"
          className="border rounded-sm border-gray-300 text-gray-900 text-sm p-2 "
          required
          value={searchedMovie}
          onChange={(e) => setSearchedMovie(e.target.value)}
          placeholder="Enter Movie Name"
        />
        <button className="border rounded-sm p-2" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default MovieForm;

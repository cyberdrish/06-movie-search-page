import "tailwindcss";
import useAxiosFetch from "../hook/useAxiosFetch";
import MovieCard from "../components/MovieCard";
import MovieForm from "../components/MovieForm";
import SpinnerMini from "../components/SpinnerMini";

const MovieSearchPage = () => {
  const { fetchAll, data, error, isLoading } = useAxiosFetch();

  function handleMovieSearch(e, searchedMovie) {
    e.preventDefault();
    fetchAll(searchedMovie);
  }
  return (
    <div className="p-2 grid grid-cols-1  grid-rows-[auto,auto]">
      <MovieForm onMovieSearch={handleMovieSearch}></MovieForm>
      <div className="flex flex-wrap pt-4 justify-center">
        {error && <p>Error: {error}</p>}
        {data?.Error && <p>Error: {data.Error}</p>}
        {isLoading && <SpinnerMini />}
        {data?.Search?.map((val) => (
          <MovieCard key={val.imdbID} val={val} />
        ))}
      </div>
    </div>
  );
};
export default MovieSearchPage;

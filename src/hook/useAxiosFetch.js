// useAxiosFetch.js
import { useState } from "react";
import axios from "axios";

const useAxiosFetch = (
  url = `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&s=`
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAll = (query) => {
    if (!url) return;
    setData([]);
    setError(null);
    setIsLoading(true);
    axios
      .get(url + query)
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        throw Error(err);
      });
  };
  return { fetchAll, data, error, isLoading };
};

export default useAxiosFetch;

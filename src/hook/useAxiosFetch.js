// useAxiosFetch.js
import { useRef, useState } from "react";
import axios from "axios";

const useAxiosFetch = (
  url = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_MOVIE_API_KEY}&`
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cancelTokenSourceRef = useRef(null);

  const fetchAll = (query) => {
    if (!url) return;
    const fetchUrl = new URL(`${url}${new URLSearchParams({ s: query })}`);

    // or can use below code as it is a single value
    // const fetchUrl = new URL(
    //   `http://www.omdbapi.com/?apikey=${
    //     import.meta.env.VITE_MOVIE_API_KEY
    //   }&s=${encodeURIComponent(query)}`
    // );

    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel("Canceled due to new request");
    }

    cancelTokenSourceRef.current = axios.CancelToken.source();
    console.log(fetchUrl);

    setData([]);
    setError(null);
    setIsLoading(true);
    axios
      .get(fetchUrl, {
        cancelToken: cancelTokenSourceRef.current.token,
      })
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

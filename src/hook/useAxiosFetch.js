// useAxiosFetch.js
import { useRef, useState } from "react";
import axios from "axios";

const useAxiosFetch = (
  url = `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_MOVIE_API_KEY
  }&s=`
) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cancelTokenSourceRef = useRef(null);

  const fetchAll = (query) => {
    if (!url) return;

    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel("Canceled due to new request");
    }

    cancelTokenSourceRef.current = axios.CancelToken.source();

    setData([]);
    setError(null);
    setIsLoading(true);
    axios
      .get(url + query, {
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

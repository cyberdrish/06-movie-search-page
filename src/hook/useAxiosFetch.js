// useAxiosFetch.js
import { useState } from "react";
import axios from "axios";
const KEY = "c35d1b0b";

const useAxiosFetch = (url = `http://www.omdbapi.com/?apikey=${KEY}&s=`) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchAll = (query) => {
    if (!url) return;
    setData([]);
    setError();
    setIsLoading(true);
    axios
      .get(url + query)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };
  return { fetchAll, data, error, isLoading };
};

export default useAxiosFetch;

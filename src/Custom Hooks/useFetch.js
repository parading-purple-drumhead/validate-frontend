import { useEffect, useState } from "react/cjs/react.development";

const useFetch = (url, currentUserId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url, {
      headers: { uid: currentUserId },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Data could not be fetched");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setIsLoading(false);
        setError(err.message);
      });
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;

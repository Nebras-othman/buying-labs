import { useEffect, useState } from "react";
import queryString from "query-string";

export default function useHotels(query) {
  const [hotels, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5500/hotels/search?" + queryString.stringify(query))
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [query]);

  return { hotels, error, loading };
}

import React from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => queryString.parse(search), [search]);
}

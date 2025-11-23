import { useState, useCallback } from "react";

export interface UseDoctorsSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export function useDoctorsSearch(): UseDoctorsSearchReturn {
  const [query, setQuery] = useState("");

  const clearQuery = useCallback(() => {
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    clearQuery,
  };
}

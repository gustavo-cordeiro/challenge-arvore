import { useRef, useState, useCallback } from "react";
import { useDebounce } from "../useDebounce";

export type CachedFetch = <T>() => {
  loading: boolean;
  data: T | null;
  error: any;
  load: (url: string) => void;
}

export const useCachedfetch: CachedFetch = <T,>() => {
  const cache = useRef<{ [key: string]: T }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | any>(null);
  const [data, setData] = useState<T | null>(null);

  const customFetch = useCallback((url: string) => {
    if (!url) return;
    (async () => {
      setLoading(true);

      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setLoading(false);
      } else {
        try {
          const response = await fetch(url);
          const data: T = await response.json();
          cache.current[url] = data;
          setData(data);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
      }
    })();
  }, []);

  return { loading, data, error, load: customFetch };
};

export const useDebounceCachedFetch = <T,>() => {
  const cachedFetch = useCachedfetch<T>();
  
  const debouncedFetch = useDebounce<string>(term => {
    cachedFetch.load(term)
  }, 250);

  return { ...cachedFetch, load: debouncedFetch };
};
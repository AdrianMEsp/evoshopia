"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api";

interface CatalogState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useCatalog<T>(loader: () => Promise<T>) {
  const [state, setState] = useState<CatalogState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((loadError) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: getErrorMessage(loadError),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loader, reloadKey]);

  const retry = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }));
    setReloadKey((value) => value + 1);
  }, []);

  return { ...state, retry };
}

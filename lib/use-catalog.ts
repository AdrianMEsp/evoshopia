"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/api";

interface CatalogState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}

export function useCatalog<T>(loader: () => Promise<T[]>) {
  const [state, setState] = useState<CatalogState<T>>({
    items: [],
    loading: true,
    error: null,
  });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    loader()
      .then((items) => {
        if (!cancelled) setState({ items, loading: false, error: null });
      })
      .catch((loadError) => {
        if (!cancelled) {
          setState({
            items: [],
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

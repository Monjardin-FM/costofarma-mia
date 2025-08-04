import { useState } from "react";

export type AsyncState<T> = {
  loading: "idle" | "loading";
  err: Error | null;
  value?: T;
};

export function useAsyncState<T>(initialState?: T) {
  const fn = useState<AsyncState<T>>({
    err: null,
    loading: "idle",
    value: initialState,
  });

  return fn;
}

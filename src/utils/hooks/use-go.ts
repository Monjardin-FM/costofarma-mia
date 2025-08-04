import { useState } from "react";
export type AsyncState = {
  loading?: boolean;
  err?: Error | null;
};

export type UseAsyncParams = {
  initialValue?: AsyncState;
};

export const useAsyncState = ({
  initialValue = {
    err: null,
    loading: false,
  },
}: UseAsyncParams = {}) => useState<AsyncState>(initialValue);

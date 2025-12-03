import { useCallback, useState } from "react";
import { FindManyOrdersParams } from "../../domain/repositories/order-repository";
import { Order } from "../../domain/entities/Order";
import { findManyOrdersService } from "../../infraestructure/services/get-orders";

export type UseSearchOrderProps = {
  query?: FindManyOrdersParams;
};

export const useSearchOrder = ({ query }: UseSearchOrderProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // page index (0-based)
  const [hasMoreResults, setHasMoreResults] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const size = query?.pagination?.size ?? 20;

  const load = useCallback(
    async (params: Omit<FindManyOrdersParams, "pagination">) => {
      try {
        setLoading(true);

        const payload: FindManyOrdersParams = {
          ...params,
          pagination: { offset: 0, size },
        };

        const result = await findManyOrdersService(payload);

        setOrders(result);
        setHasMoreResults(result.length === size);
        setCurrentPage(1); // siguiente página

        return result;
      } finally {
        setLoading(false);
      }
    },
    [size]
  );

  const fetchMore = useCallback(
    async (params: Omit<FindManyOrdersParams, "pagination">) => {
      if (!hasMoreResults) return;

      try {
        setLoading(true);

        const payload: FindManyOrdersParams = {
          ...params,
          pagination: {
            offset: currentPage * size,
            size,
          },
        };

        const res = await findManyOrdersService(payload);

        setHasMoreResults(res.length === size);

        if (res.length > 0) {
          setCurrentPage((p) => p + 1);
          setOrders((prev) => [...prev, ...res]);
        }

        return res;
      } finally {
        setLoading(false);
      }
    },
    [currentPage, size, hasMoreResults]
  );

  return {
    orders,
    loading,
    fetchMore,
    load,
    hasMoreResults,
  };
};

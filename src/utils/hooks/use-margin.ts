import { useMemo } from "react";
import { useWindowSize } from "react-use";

export const useMargin = () => {
  const { width } = useWindowSize();
  const DEFAULT_MARGIN = 16;

  const breackpoints = [1536, 1280, 1024, 768, 640];

  const margin = useMemo<number>(() => {
    const size = breackpoints.reduce(
      (previous, current) =>
        previous === DEFAULT_MARGIN && width >= current
          ? (width - current) / 2 + DEFAULT_MARGIN
          : previous,
      DEFAULT_MARGIN
    );
    return size;
  }, [width]);

  return margin;
};

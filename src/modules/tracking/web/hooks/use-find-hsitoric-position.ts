import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { findHistoricPositionService } from "../../infraestructure/services/find-historic-position";

export const useFindHistoricPosition = () => {
  const [{ value: historicPosition, loading, error }, findHistoricPosition] =
    useAsyncFn<TrackingRepository["postHistoricPosition"]>(
      findHistoricPositionService,
      [findHistoricPositionService]
    );
  return {
    historicPosition,
    findHistoricPosition,
    loading,
    error,
  };
};

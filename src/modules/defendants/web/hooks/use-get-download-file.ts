import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { downloadFileService } from "../../infraestructure/services/download-file";

export const useDownloadFile = () => {
  const [{ value: linkDownload, loading, error }, downloadFile] = useAsyncFn<
    DefendantRepository["downloadFile"]
  >(downloadFileService, [downloadFileService]);
  return {
    linkDownload,
    loading,
    error,
    downloadFile,
  };
};

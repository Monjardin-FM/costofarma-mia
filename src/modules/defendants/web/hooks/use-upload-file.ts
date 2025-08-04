import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { uploadFileService } from "../../infraestructure/services/upload-file-defendant";

export const useUploadFile = () => {
  const [{ error, loading }, uploadFile] = useAsyncFn<
    DefendantRepository["uploadFile"]
  >(uploadFileService, [uploadFileService]);
  return {
    uploadFile,
    error,
    loading,
  };
};

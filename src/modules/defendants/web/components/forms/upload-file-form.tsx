import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useUploadFile } from "../../hooks/use-upload-file";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { TFunction } from "i18next";
export type UploadFileFormProps = {
  onClose: () => void;
  isVisible: boolean;
  idDefendant?: number | null;
  translation: TFunction<[string], undefined>;
};
export const UploadFileForm = ({
  isVisible,
  onClose,
  idDefendant,
  translation,
}: UploadFileFormProps) => {
  const [fileBase64String, setFileBase64String] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileExtension, setFileExtension] = useState<string>("");
  const { uploadFile, loading, error } = useUploadFile();
  const encodeFileBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length === 1) {
      setFileName(files[0].name);
      const file = files[0];
      const extension = file.name.split(".").pop();
      setFileExtension(extension ? `.${extension}` : "");
      const base64 = await encodeFileBase64(file);
      const split64 = base64.split(",").pop();
      if (split64) setFileBase64String(split64);
    }
  };
  const handleSubmit = async () => {
    if (fileName && idDefendant) {
      await uploadFile({
        extension: fileExtension,
        file: fileBase64String,
        idPerson: idDefendant,
      });
    }
    if (!error) {
      AppToast().fire({
        title: translation("ToastUploadFileTitle"),
        icon: "success",
        text: translation("ToastUploadFileText"),
      });
      onClose();
    }
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastUploadFileErrorText"),
      });
    }
    if (loading) {
      AppToast().fire({
        title: translation("ToastLoadingUploadFileTitle"),
        icon: "info",
        text: translation("ToastLoadingUploadFileText"),
      });
    }
  }, [error, loading]);
  return (
    <Modal size="md" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 items-center">
            {translation("ModalHeaderUploadFile")}
          </ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center w-full p-5 gap-5">
            <div className="w-full">
              <input
                type="file"
                onChange={onFileChange}
                className="w-full border border-primaryColor-800 inline-block p-10 cursor-pointer bg-primaryColor-100 rounded-lg "
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>{translation("ButtonCancel")}</Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isDisabled={loading || !fileName}
              isLoading={loading}
            >
              {translation("ButtonUploadFile")}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

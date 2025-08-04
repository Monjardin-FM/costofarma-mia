import { useState } from "react";
import { AppPageTransition } from "../../../../../presentation/Components/AppPageTransition";
import { AppCardFileStatus } from "./app-card-file-status";
import { FileUploader } from "react-drag-drop-files";
import { FileText, Paperclip, Upload } from "react-feather";

export type UploadFileLayoutProps = {
  file?: File | null;
  onUpload: (file: File) => void;
  onSubmit: () => void;
};

export const UploadFileLayout = ({
  file,
  //   onSubmit,
  onUpload,
}: UploadFileLayoutProps) => {
  const [dragging, setDragging] = useState(false);

  const onChange = (file: File) => {
    setDragging(false);
    onUpload(file);
  };
  return (
    <AppPageTransition>
      <FileUploader hoverTitle="" handleChange={onChange} name="file">
        {dragging ? (
          <AppCardFileStatus
            icon={<Paperclip size={32} />}
            end={() => setDragging(false)}
            title="Upload File"
            text="Drop file to upload"
            styles="text-primary-300 border-dashed text- border-2 cursor-pointer border-gray-300 bg-gray-200 py-4 rounded-lg flex flex-col items-center justify-center"
          />
        ) : file ? (
          <AppCardFileStatus
            icon={<FileText size={32} />}
            start={() => setDragging(true)}
            title="Click upload file"
            text={file.name}
            styles="text-info-300 border-dashed border-2 cursor-pointer border-gray-300 bg-info-100 py-4 rounded-lg flex flex-col items-center justify-center"
          />
        ) : (
          <AppCardFileStatus
            icon={<Upload size={32} />}
            start={() => setDragging(true)}
            title={`Upload file`}
            text="You can drag the file here"
            styles="text-primary-300 border-dashed border-2 cursor-pointer border-gray-300 py-4 rounded-lg flex flex-col items-center justify-center"
          />
        )}
      </FileUploader>
    </AppPageTransition>
  );
};

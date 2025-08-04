import clsx from "clsx";

import { useDropzone } from "react-dropzone";

type AppAttachmentProps = {
  onChange?: (file: File | null) => void;
  value?: File | null;
};

export const AppAttachment = ({
  onChange = () => {},
  value,
}: AppAttachmentProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (file) => {
      if (file && file[0]) onChange(file[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "w-full font-medium appearance-none focus:outline-none rounded-lg transition duration-200 bg-gray-50 text-gray-800 border-2 focus:border-primary-500 py-3 focus:ring-transparent disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed pl-4 pr-4",
        {
          "border-primary-500": isDragActive,
          "border-gray-200": !isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      {value?.name ? (
        value.name
      ) : isDragActive ? (
        <p>Soltar archivo</p>
      ) : (
        <p>Selecciona un archivo</p>
      )}
    </div>
  );
};

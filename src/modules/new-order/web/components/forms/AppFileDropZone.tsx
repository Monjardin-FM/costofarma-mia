import React, { useState, DragEvent, ChangeEvent } from "react";
import * as Icon from "react-feather";
interface AppFileDropzoneProps {
  label?: string;
  onFileSelect: (file: File) => void;
  accept?: string; // Ej: "application/pdf,image/*"
  mode: "view" | "edit";
}

const AppFileDropzone: React.FC<AppFileDropzoneProps> = ({
  label = "Subir documento",
  onFileSelect,
  accept = "application/pdf,image/*",
  mode,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  // --- Handlers ---
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full col-span-6">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer ${
          dragActive
            ? "border-info-500 bg-info-100"
            : "border-gray-300 hover:border-info-400"
        } ${fileName ? "bg-success-100" : "bg-white"}
        ${mode === "view" ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          type="file"
          accept={accept}
          id="fileUploadInput"
          onChange={handleChange}
          className="hidden"
          disabled={mode === "view"}
        />

        <label
          htmlFor="fileUploadInput"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          {!fileName ? (
            <Icon.Upload className=" text-info-400" size={45} />
          ) : (
            <Icon.FileText className=" text-info-400" size={45} />
          )}

          <span className="text-sm text-gray-600">
            Arrastra tu archivo aquí o{" "}
            <span className="text-info-600 font-medium">
              haz clic para subir
            </span>
          </span>

          {fileName && (
            <span className="text-sm mt-2 text-gray-800 font-medium">
              Archivo seleccionado: {fileName}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default AppFileDropzone;

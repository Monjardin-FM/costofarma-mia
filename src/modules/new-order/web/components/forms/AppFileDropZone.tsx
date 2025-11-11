import React, { useState, DragEvent, ChangeEvent } from "react";

interface AppFileDropzoneProps {
  label?: string;
  onFileSelect: (file: File) => void;
  accept?: string; // Ej: "application/pdf,image/*"
}

const AppFileDropzone: React.FC<AppFileDropzoneProps> = ({
  label = "Subir documento",
  onFileSelect,
  accept = "application/pdf,image/*",
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
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
      >
        <input
          type="file"
          accept={accept}
          id="fileUploadInput"
          onChange={handleChange}
          className="hidden"
        />

        <label
          htmlFor="fileUploadInput"
          className="cursor-pointer flex flex-col items-center space-y-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0l3 3m-3-3l-3 3M3 16h18M5 20h14"
            />
          </svg>

          <span className="text-sm text-gray-600">
            Arrastra tu archivo aquí o{" "}
            <span className="text-blue-600 font-medium">
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

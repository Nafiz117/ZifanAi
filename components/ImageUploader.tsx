
import React, { useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadProgress: number | null;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadProgress }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isUploading = typeof uploadProgress === 'number';

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };
  
  const handleClick = () => {
    if (isUploading) return;
    inputRef.current?.click();
  }

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isUploading) return;
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload, isUploading]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div 
        className={`w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 border-4 border-dashed border-gray-700 rounded-3xl transition-all duration-300 ${isUploading ? 'cursor-wait' : 'cursor-pointer hover:border-purple-500 hover:bg-gray-800/50'}`}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        disabled={isUploading}
      />
      {isUploading ? (
        <div className="w-full text-center">
            <h2 className="text-2xl font-bold text-gray-300">Reading File...</h2>
            <div className="w-full bg-gray-600 rounded-full h-3 my-4 overflow-hidden">
                <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-width duration-150 ease-linear" 
                style={{ width: `${uploadProgress}%` }}
                ></div>
            </div>
            <p className="text-gray-400 text-lg font-mono">{uploadProgress}%</p>
        </div>
      ) : (
        <>
            <UploadIcon />
            <h2 className="text-2xl font-bold text-gray-300">Drag & Drop an Image</h2>
            <p className="text-gray-500 mt-2">or click to browse your files</p>
        </>
      )}
    </div>
  );
};

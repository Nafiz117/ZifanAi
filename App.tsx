
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { TransformationOptions } from './components/TransformationOptions';
import { ImageDisplay } from './components/ImageDisplay';
import { transformImage } from './services/geminiService';
import { TRANSFORMATION_OPTIONS } from './constants';
import type { UploadedImage } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<UploadedImage | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onloadstart = () => {
      setUploadProgress(0);
      setError(null);
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };
    
    reader.onloadend = () => {
      setOriginalImage({
        base64: reader.result as string,
        mimeType: file.type,
      });
      setGeneratedImage(null);
      setUploadProgress(null);
    };

    reader.onerror = () => {
      setError("Failed to read the image file.");
      setUploadProgress(null);
    };

    reader.readAsDataURL(file);
  }, []);

  const handleTransform = useCallback(async (prompt: string) => {
    if (!originalImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const base64Data = originalImage.base64.split(',')[1];
      if (!base64Data) {
        throw new Error("Invalid image data.");
      }
      const newImageBase64 = await transformImage(base64Data, originalImage.mimeType, prompt);
      setGeneratedImage(`data:image/png;base64,${newImageBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image transformation.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleReset = useCallback(() => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
    setUploadProgress(null);
  }, []);

  const handleSurprise = useCallback(() => {
    const randomOption = TRANSFORMATION_OPTIONS[Math.floor(Math.random() * TRANSFORMATION_OPTIONS.length)];
    handleTransform(randomOption.prompt);
  }, [handleTransform]);


  return (
    <div className="min-h-screen bg-transparent text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} uploadProgress={uploadProgress} />
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* --- Sidebar --- */}
            <aside className="lg:col-span-1 w-full flex flex-col gap-6 p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
              <ImageDisplay
                  title="Original"
                  imageUrl={originalImage.base64}
                  isLoading={false}
                  isThumbnail
              />
              <TransformationOptions
                options={TRANSFORMATION_OPTIONS}
                onTransform={handleTransform}
                onSurpriseMe={handleSurprise}
                disabled={isLoading}
              />
               <button
                  onClick={handleReset}
                  className="mt-4 w-full px-6 py-3 bg-rose-600/80 text-white font-semibold rounded-xl border border-rose-500/50 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-rose-500 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Upload New Image
                </button>
            </aside>

            {/* --- Main Content --- */}
            <div className="lg:col-span-2 w-full">
               {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg w-full text-center mb-8">
                  <p><span className="font-bold">Error:</span> {error}</p>
                </div>
              )}
              <ImageDisplay
                title="Transformed"
                imageUrl={generatedImage}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
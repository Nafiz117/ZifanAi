
import React, { useState } from 'react';

// fix: Add optional 'isThumbnail' property to fix a type error in App.tsx.
interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading: boolean;
  isThumbnail?: boolean;
}

const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
  </div>
);

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5v-5.714c0-.597-.237-1.17-.659-1.591L14.25 5.5M5 14.5a2.25 2.25 0 00-2.25 2.25v3a2.25 2.25 0 002.25 2.25h14a2.25 2.25 0 002.25-2.25v-3a2.25 2.25 0 00-2.25-2.25M5 14.5h14" />
        </svg>
        <p className="mt-4 text-xl font-semibold">Magic awaits...</p>
    </div>
);

const ZoomedImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img
          src={imageUrl}
          alt="Zoomed view"
          className="object-contain w-full h-full rounded-lg shadow-2xl cursor-default"
          onClick={(e) => e.stopPropagation()} 
        />
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 text-white bg-gray-800/75 rounded-full p-1.5 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close zoomed view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading, isThumbnail }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = () => {
        if (imageUrl && !isLoading) {
            setIsZoomed(true);
        }
    };

    const handleCloseZoom = () => {
        setIsZoomed(false);
    };

    const handleDownload = () => {
        if (!imageUrl) return;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'transformed-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const isClickable = !!imageUrl && !isLoading;

    return (
    <>
        <div className="w-full flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-300">{title}</h2>
            <div 
                className={`w-full aspect-square bg-gray-800/50 rounded-2xl border border-gray-700 flex items-center justify-center overflow-hidden transition-all ${isClickable ? 'cursor-zoom-in' : ''}`}
                onClick={handleImageClick}
            >
                {isLoading ? (
                <Loader />
                ) : imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
                ) : (
                    <Placeholder />
                )}
            </div>
            {title === 'Transformed' && imageUrl && !isLoading && (
                 <button
                    onClick={handleDownload}
                    className="mt-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500 transition-colors flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.293V3a1 1 0 112 0v8.293l1.293-1.586a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Image
                </button>
            )}
        </div>
        {isZoomed && imageUrl && (
            <ZoomedImageModal imageUrl={imageUrl} onClose={handleCloseZoom} />
        )}
    </>
  );
};
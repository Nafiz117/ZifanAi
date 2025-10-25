
import React from 'react';
import type { TransformationOption } from '../types';

// fix: Add 'onSurpriseMe' prop to fix type error in App.tsx.
interface TransformationOptionsProps {
  options: TransformationOption[];
  onTransform: (prompt: string) => void;
  onSurpriseMe: () => void;
  disabled: boolean;
}

export const TransformationOptions: React.FC<TransformationOptionsProps> = ({ options, onTransform, onSurpriseMe, disabled }) => {
  return (
    <div className="w-full flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-300">Choose a Transformation</h3>
        <div className="w-full max-h-60 overflow-y-auto flex flex-wrap justify-center gap-2 p-2 border border-gray-700 rounded-lg bg-black/20">
        {options.map((option) => (
            <button
            key={option.label}
            onClick={() => onTransform(option.prompt)}
            disabled={disabled}
            className="px-3 py-1.5 text-sm bg-gray-700 text-white font-medium rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600"
            >
            {option.label}
            </button>
        ))}
        </div>
        {/* fix: Add button to trigger onSurpriseMe callback. */}
        <button
          onClick={onSurpriseMe}
          disabled={disabled}
          className="mt-4 px-6 py-2.5 bg-teal-600/80 text-white font-semibold rounded-xl border border-teal-500/50 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          ✨ Surprise Me!
        </button>
    </div>
  );
};
import React from 'react';
import { motion } from 'framer-motion';

const UploadProgress = ({ progress = 0, fileName = '', isUploading = false, isComplete = false }) => {
  if (!isUploading && !isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg"
    >
      <div className="flex items-center space-x-3">
        {/* Upload Icon */}
        <div className="flex-shrink-0">
          {isComplete ? (
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div className="w-6 h-6 relative">
              <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
        </div>

        {/* Upload Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {fileName || 'Uploading file...'}
          </p>
          <p className="text-xs text-gray-500">
            {isComplete ? 'Upload complete!' : `${Math.round(progress)}% uploaded`}
          </p>
        </div>

        {/* Progress Percentage */}
        <div className="flex-shrink-0">
          <span className={`text-sm font-medium ${isComplete ? 'text-green-600' : 'text-blue-600'}`}>
            {isComplete ? '100%' : `${Math.round(progress)}%`}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UploadProgress;

// File utility functions for handling different file types

export const getFileType = (fileUrl) => {
  if (!fileUrl) return '';
  
  const url = fileUrl.toLowerCase();
  if (url.includes('.pdf')) return 'PDF';
  if (url.includes('.doc') && !url.includes('.docx')) return 'DOC';
  if (url.includes('.docx')) return 'DOCX';
  if (url.includes('.txt')) return 'TXT';
  if (url.includes('.jpg') || url.includes('.jpeg')) return 'JPG';
  if (url.includes('.png')) return 'PNG';
  if (url.includes('.gif')) return 'GIF';
  if (url.includes('.webp')) return 'WebP';
  if (url.includes('.mp4')) return 'MP4';
  if (url.includes('.mov')) return 'MOV';
  if (url.includes('.avi')) return 'AVI';
  if (url.includes('.mkv')) return 'MKV';
  if (url.includes('.webm')) return 'WebM';
  if (url.includes('.m4v')) return 'M4V';
  return 'File';
};

export const isDocument = (fileUrl) => {
  if (!fileUrl) return false;
  
  const url = fileUrl.toLowerCase();
  return url.includes('.pdf') || 
         url.includes('.doc') || 
         url.includes('.txt');
};

export const isImage = (fileUrl) => {
  if (!fileUrl) return false;
  
  const url = fileUrl.toLowerCase();
  return url.includes('.jpg') || 
         url.includes('.jpeg') || 
         url.includes('.png') || 
         url.includes('.gif') || 
         url.includes('.webp');
};

export const isVideo = (fileUrl) => {
  if (!fileUrl) return false;
  
  const url = fileUrl.toLowerCase();
  return url.includes('.mp4') || 
         url.includes('.mov') || 
         url.includes('.avi') || 
         url.includes('.mkv') || 
         url.includes('.webm') || 
         url.includes('.m4v');
};

export const getFileIconType = (fileUrl) => {
  if (!fileUrl) return 'default';
  
  const url = fileUrl.toLowerCase();
  
  if (url.includes('.pdf')) return 'pdf';
  if (url.includes('.doc')) return 'doc';
  if (url.includes('.txt')) return 'txt';
  if (isImage(fileUrl)) return 'image';
  if (isVideo(fileUrl)) return 'video';
  
  return 'default';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFileType = (file) => {
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm', 'video/x-m4v',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  
  const isValid = allowedTypes.includes(file.type) || file.type.startsWith('video/');
  return {
    isValid,
    error: isValid ? null : `File type ${file.type} is not supported. Please upload images (JPG, PNG, GIF, WebP), videos (MP4, MOV, AVI, MKV, WebM, M4V), or documents (PDF, DOC, DOCX, TXT).`
  };
};

export const validateFileSize = (file, maxSizeInMB = 10) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  const isValid = file.size <= maxSizeInBytes;
  return {
    isValid,
    error: isValid ? null : `File size ${formatFileSize(file.size)} exceeds the maximum limit of ${maxSizeInMB}MB.`
  };
};

export const getFileIcon = (fileName) => {
  if (!fileName) return '📄';
  
  const name = fileName.toLowerCase();
  
  if (name.includes('.pdf')) return '📄';
  if (name.includes('.doc')) return '📝';
  if (name.includes('.txt')) return '📃';
  if (isImage(fileName)) return '🖼️';
  if (isVideo(fileName)) return '🎬';
  
  return '📄';
};

import { FileText, FileCode, FileImage, FileArchive, File as FileIcon } from 'lucide-react';

export const getFileIcon = (type?: string) => {
  const t = type?.toLowerCase() || '';

  if (t.includes('pdf')) return <FileText className="text-blue-400" size={20} />;
  if (t.includes('js') || t.includes('ts') || t.includes('json')) return <FileCode className="text-yellow-400" size={20} />;
  if (t.includes('png') || t.includes('jpg') || t.includes('svg')) return <FileImage className="text-purple-400" size={20} />;
  if (t.includes('zip') || t.includes('rar')) return <FileArchive className="text-orange-400" size={20} />;

  return <FileIcon className="text-gray-400" size={20} />;
};


export enum DocumentStatus {
  READY = 'READY',
  PROCESSING = 'PROCESSING',
  FAILED = 'FAILED',
  UPLOADING = 'UPLOADING'
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: DocumentStatus;
  uploadProgress?: number;
  errorMessage?: string;
  isNew?: boolean; // Used for the "Color Flash" transition effect
}

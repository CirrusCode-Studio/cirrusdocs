export enum DocumentStorageProvider {
  LOCAL = 'LOCAL',
  S3 = 'S3',
  R2 = 'R2',
}

export const DOCUMENT_STORAGE_PROVIDER = Symbol(
  'DOCUMENT_STORAGE_PROVIDER',
);

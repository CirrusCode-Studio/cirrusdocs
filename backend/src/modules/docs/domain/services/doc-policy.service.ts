class DocumentPolicyService {
  private readonly DOCUMENT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly IMAGE_MAX_SIZE = 5 * 1024 * 1024;     // 5MB

  private readonly DOCUMENT_MIME_TYPES = [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  private readonly IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  validateUpload(mimeType: string, size: number) {
    const isImage = mimeType.startsWith('image/');

    if (isImage) {
      if (!this.IMAGE_MIME_TYPES.includes(mimeType)) {
        throw new Error('Unsupported image file type');
      }

      if (size > this.IMAGE_MAX_SIZE) {
        throw new Error('Image file too large (max 5MB)');
      }

      return;
    }

    // Document
    if (!this.DOCUMENT_MIME_TYPES.includes(mimeType)) {
      throw new Error('Unsupported document file type');
    }

    if (size > this.DOCUMENT_MAX_SIZE) {
      throw new Error('Document file too large (max 10MB)');
    }
  }
}

export { DocumentPolicyService };

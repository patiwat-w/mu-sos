export interface IFile {
  id: number;
  name: string;
  length: number;
  creationTime: string;
  lastAccessTime: string;
  lastWriteTime: string;
  filePath: string;
  userId: number;
  subjectId: number;
  fileType: string;
  fileName : string;
  fileExtension : string;
  documentType: string;
  fileCategory: string;
}

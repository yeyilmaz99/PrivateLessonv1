export interface Photo {
  id: number;
  userId: number;
  url: string;
  description: string;
  dateAdded: Date;
  isMain: boolean;
  publicId: string;
  headerText: string;
  position: number;
  isCertificate: boolean;
}

export interface PhotoForUpdate{
  imageData:File,
  headerText:string,
  description:string
}

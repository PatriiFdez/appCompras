export class Archivo {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAd: Date = new Date();
  constructor(file: File) {
    this.file = file;
  }
}

export interface newDocumentForm {
  title: string;
  description: string;
  provider_name: string;
  register_date: Date;
  file_path: string;
  file: File;
  created_at: string;
}

export interface Document extends newDocumentForm {
  id: number;
}

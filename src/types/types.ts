export enum CertificateType {
  PermissionOfPrinting = 'Permission of Printing',
  OHSAS18001 = 'OHSAS 18001',
}

export type Certificate = {
  id: number;
  supplier: string;
  certificateType: CertificateType | '';
  validFrom: Date | null;
  validTo: Date | null;
  pdfData: string | null;
  participants?: Participant[];
};

export type Supplier = {
  id: number;
  name: string;
  index: string;
  city: string;
};

export enum Language {
  ENGLISH = 'en',
  GERMAN = 'de',
}

export type Participant = {
  id: number;
  name: string;
  firstName: string;
  userId: string;
  department: string;
  plant: string;
  email: string;
};

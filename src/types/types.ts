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
};

export interface Supplier {
  id: number;
  name: string;
  index: string;
  city: string;
}

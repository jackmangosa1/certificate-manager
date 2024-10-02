export enum Language {
  ENGLISH = 'en',
  GERMAN = 'de',
}

export type CertificateSummary = {
  certificateId: number;
  supplierDetails: string;
  certificateTypeName: string;
  validFrom: string;
  validTo: string;
};

export type Certificate = {
  certificateId: number;
  supplierId: number;
  certificateTypeId: number;
  validFrom: string;
  validTo: string;
  pdfDocumentData: string;
  comments?: Comment[];
  participants?: Participant[];
};

export type CertificateFormData = {
  name: string;
  certificateTypeName: string;
  validFrom: string;
  validTo: string;
  pdfDocumentData: string;
  participants: Participant[];
  comments: Comment[];
};

export type Comment = {
  commentId: number;
  username: string;
  commentText: string;
};

export type Participant = {
  participantId: number;
  name: string;
  firstName: string;
  department: string;
  plant: string;
};

export type User = {
  username: string;
};

export type CertificateType = {
  certificateTypeId: number;
  certificateTypeName: string;
};

export type Supplier = {
  supplierId: number;
  name: string;
  supplierIndex: string;
  city: string;
};

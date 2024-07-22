import { useState } from 'react';
import { Certificate } from '@/types/types';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      supplier: 'DAIMLER AG, 1, Berlin',
      certificateType: 'Permission of Printing',
      validFrom: new Date('2017-08-21'),
      validTo: new Date('2017-08-26'),
    },
    {
      supplier: 'ANDEMIS GmbH, 1, Stuttgart',
      certificateType: 'OHSAS 18001',
      validFrom: new Date('2017-08-18'),
      validTo: new Date('2017-08-24'),
    },
    {
      supplier: 'ANDEMIS GmbH, 1, Stuttgart',
      certificateType: 'Permission of Printing',
      validFrom: new Date('2017-10-04'),
      validTo: new Date('2017-10-10'),
    },
  ]);

  const addCertificate = (certificate: Certificate) => {
    setCertificates([...certificates, certificate]);
  };

  const updateCertificate = (
    index: number,
    updatedCertificate: Certificate,
  ) => {
    const newCertificates = [...certificates];
    newCertificates[index] = updatedCertificate;
    setCertificates(newCertificates);
  };

  const deleteCertificate = (index: number) => {
    const newCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(newCertificates);
  };

  return { certificates, addCertificate, updateCertificate, deleteCertificate };
};

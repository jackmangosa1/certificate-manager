import { Certificate } from '@/types/types';
import { CertificateType } from '../../types/types';
export const certificates: Certificate[] = [
  {
    supplier: 'DAIMLER AG, 1, Berlin',
    certificateType: CertificateType.PermissionOfPrinting,
    validFrom: new Date('2017-08-21'),
    validTo: new Date('2017-08-26'),
  },
  {
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.OHSAS18001,
    validFrom: new Date('2017-08-18'),
    validTo: new Date('2017-08-24'),
  },
  {
    supplier: 'ANDEMIS GmbH, 1, Stuttgart',
    certificateType: CertificateType.PermissionOfPrinting,
    validFrom: new Date('2017-10-04'),
    validTo: new Date('2017-10-10'),
  },
];

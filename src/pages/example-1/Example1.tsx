import React from 'react';
import './Example1.css';
import Table from '../../components/table/Table';
import { Certificate } from '@/types/types';
import { useNavigate } from 'react-router-dom';

export const certificates: Certificate[] = [
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
];

const Example2: React.FC = () => {
  const headers = ['Supplier', 'Certificate type', 'Valid from', 'Valid to'];
  const navigate = useNavigate();

  return (
    <div className="content">
      <h1 className="title">Example 1</h1>
      <button
        className="add-certificate-btn"
        onClick={() => navigate('/add-certificate')}
      >
        New Certificate
      </button>
      <Table
        headers={headers}
        data={certificates}
      />
    </div>
  );
};

export default Example2;

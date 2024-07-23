import React from 'react';
import './Example1.css';
import Table from '../../components/table/Table';
import { Certificate } from '../../types/types';

const Example2: React.FC = () => {
  const headers = ['Supplier', 'Certificate type', 'Valid from', 'Valid to'];

  const data: Certificate[] = [
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

  return (
    <div className="content">
      <h1 className="title">Example 1</h1>
      <Table
        headers={headers}
        data={data}
      />
    </div>
  );
};

export default Example2;

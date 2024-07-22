// src/components/Example2.tsx

import React, { useState, useRef, useEffect } from 'react';
import './Example1.css';
import Table from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import { certificates } from './certificateMockData';

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

export default Example1;

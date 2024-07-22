import React, { useState, useRef, useEffect } from 'react';
import './Example1.css';
import Table from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/routes';
import { useCertificates } from '../../hooks/useCertificates';

const Example1: React.FC = () => {
  const headers = ['Supplier', 'Certificate type', 'Valid from', 'Valid to'];
  const navigate = useNavigate();
  const { certificates, deleteCertificate } = useCertificates();

  const handleEdit = (index: number) => {
    const certificateToEdit = certificates[index];
    navigate(`${AppRoutes.AddCertificate}/${certificateToEdit.id}`);
  };

  const handleDelete = (index: number) => {
    const certificateToDelete = certificates[index];
    if (certificateToDelete.id !== undefined) {
      deleteCertificate(certificateToDelete.id);
    }
  };

  return (
    <div className="content">
      <h1 className="title">Example 1</h1>
      <button
        className="add-certificate-btn"
        onClick={() => navigate(AppRoutes.AddCertificate)}
      >
        New Certificate
      </button>
      <Table
        headers={headers}
        data={certificates}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Example1;

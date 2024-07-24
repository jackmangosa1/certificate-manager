import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddCertificate.css';
import CustomDateInput from '../../components/CustomDateInput/CustomDateInput';

const AddCertificate: React.FC = () => {
  return (
    <div className="certificate-form-container">
      <div className="left-side">
        <div className="row">
          <label htmlFor="supplier">Supplier</label>
          <div className="input-wrapper">
            <input
              type="text"
              id="supplier"
              className="supplier-input"
            />
            <button
              className="search-button"
              onClick={openModal}
            >
              <svg
                width="24"
                height="24"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 15.5L19 19"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="clear-button">
              <svg
                viewBox="0 0 352 512"
                xmlns="http://www.w3.org/2000/svg"
                className="cancel-icon"
              >
                <path d="m242.72 256 100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0l-100.07 100.07-100.07-100.07c-12.28-12.28-32.19-12.28-44.48 0l-22.24 22.24c-12.28 12.28-12.28 32.19 0 44.48l100.07 100.07-100.07 100.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0l100.07-100.07 100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="row">
          <label htmlFor="certificate-type">Certificate type</label>
          <select
            id="certificate-type"
            defaultValue=""
          >
            <option
              value=""
              disabled
            >
              Select your option
            </option>
            <option value="Permission of Printing">
              Permission of Printing
            </option>
            <option value="OHSAS 18001">OHSAS 18001</option>
          </select>
        </div>

        {/* <div className="row">
          <label htmlFor="start-date">Valid from</label>
          <input
            type="date"
            id="start-date"
            placeholder="Click to select date"
          />
        </div>

        <div className="row">
          <label htmlFor="end-date">Valid to</label>
          <input
            type="date"
            id="end-date"
            placeholder="Click to select date"
          />
        </div> */}

        <CustomDateInput
          id="start-date"
          label="Valid from"
        />
        <CustomDateInput
          id="end-date"
          label="Valid to"
        />
      </div>
      <div className="right-side">
        <div>
          <button>Upload</button>
          <textarea
            name=""
            id=""
          ></textarea>
        </div>

        <div>
          <button>Save</button>
          <button>Reset</button>
        </div>
      </div>

      <SupplierSearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleSupplierSelect}
      />
    </div>
  );
};

export default AddCertificate;

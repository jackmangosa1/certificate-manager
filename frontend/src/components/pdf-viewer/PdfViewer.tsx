import React, { useState } from 'react';
import './PdfViewer.css';
import { useLanguage } from '../../hooks/useLanguage';

type PdfViewerProps = {
  pdfPreview: string | null;
  setPdfPreview: (preview: string | null) => void;
  onPdfChange: (pdfFile: File | null) => void;
  error?: string;
};

const PdfViewer: React.FC<PdfViewerProps> = React.memo(
  ({ pdfPreview, setPdfPreview, onPdfChange, error }) => {
    const { translations } = useLanguage();
    const [loadError, setLoadError] = useState<string | null>(null);

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setPdfPreview(null);
      onPdfChange(file);
      setLoadError(null);
    };

    const handleIframeError = () => {
      setLoadError(
        'Failed to load PDF. The file might be corrupted or in an unsupported format.',
      );
    };

    return (
      <div className="pdf-viewer-container">
        <label className="upload-button">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            hidden
          />
          {translations.upload}
        </label>

        <div className="pdf-preview">
          <iframe
            src={pdfPreview ?? ''}
            width="100%"
            height="500px"
            title="PDF Preview"
            className="preview-area"
            onError={handleIframeError}
          />
        </div>
        {(error || loadError) && (
          <p className="pdf-error-message">{error || loadError}</p>
        )}
      </div>
    );
  },
);

export default PdfViewer;

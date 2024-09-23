import './PdfViewer.css';
import { useLanguage } from '../../hooks/useLanguage';

type PdfViewerProps = {
  pdfPreview: string | null;
  setPdfPreview: (preview: string | null) => void;
  onPdfChange: (pdfData: string | null) => void;
  error?: string;
};

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfPreview,
  setPdfPreview,
  onPdfChange,
  error,
}) => {
  const { translations } = useLanguage();
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const pdfData = reader.result as string;
        setPdfPreview(pdfData);
        onPdfChange(pdfData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
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
          src={pdfPreview || 'about:blank'}
          width="100%"
          height="100%"
          title="PDF Preview"
          className="preview-area"
        ></iframe>
      </div>
      {error && <p className="pdf-error-message">{error}</p>}
    </div>
  );
};

export default PdfViewer;

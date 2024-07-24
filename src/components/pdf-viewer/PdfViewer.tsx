import './pdfViewer.css';

type PdfViewerProps = {
  pdfPreview: string | null;
  setPdfPreview: (preview: string | null) => void;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfPreview, setPdfPreview }) => {
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPdfPreview(reader.result as string);
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
        Upload
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
    </div>
  );
};

export default PdfViewer;

import './ConfirmationModal.css';
import { useLanguage } from '../../hooks/useLanguage';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  const { translations } = useLanguage();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{translations.confirmAction}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button
            className="cancel-button"
            onClick={onClose}
          >
            {translations.cancel}
          </button>
          <button
            className="confirm-button"
            onClick={onConfirm}
          >
            {translations.confirmAction}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

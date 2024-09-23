import './ActionMenu.css';
import { useLanguage } from '../../hooks/useLanguage';
type ActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  const { translations } = useLanguage();
  return (
    <div className="action-menu">
      <button onClick={onEdit}>{translations.update}</button>
      <button onClick={onDelete}>{translations.delete}</button>
    </div>
  );
};

export default ActionMenu;

import './ActionMenu.css';
type ActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="action-menu">
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default ActionMenu;

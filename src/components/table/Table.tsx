import { useState, useRef, useEffect } from 'react';
import './Table.css';
import ActionMenu from '../action-menu/ActionMenu';
import GearIcon from '../../icons/GearIcon';
import ConfirmationModal from '../confirmation-modal/ConfirmationModal';

type TableProps<T extends Record<string, unknown>> = {
  headers: string[];
  data: T[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const Table = <T extends Record<string, unknown>>({
  headers,
  data,
  onEdit,
  onDelete,
}: TableProps<T>): JSX.Element => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      activeMenu !== null &&
      menuRefs.current[activeMenu] &&
      !menuRefs.current[activeMenu]?.contains(event.target as Node)
    ) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMenu]);

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      onDelete(deleteIndex);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <td></td>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const { id, pdfData, ...rowData } = row;
            return (
              <tr key={rowIndex}>
                <td>
                  <div
                    className="menu-wrapper"
                    ref={(el) => (menuRefs.current[rowIndex] = el)}
                  >
                    <div
                      onClick={() =>
                        setActiveMenu(activeMenu === rowIndex ? null : rowIndex)
                      }
                    >
                      <GearIcon className="gear-icon" />
                    </div>
                    {activeMenu === rowIndex && (
                      <ActionMenu
                        onEdit={() => onEdit(rowIndex)}
                        onDelete={() => handleDelete(rowIndex)}
                      />
                    )}
                  </div>
                </td>
                {Object.values(rowData).map((value, colIndex) => (
                  <td key={colIndex}>
                    {value instanceof Date
                      ? value.toLocaleDateString()
                      : String(value)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default Table;

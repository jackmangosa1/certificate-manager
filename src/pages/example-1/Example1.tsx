import './Example1.css';
import Table from '../../components/table/Table';
import { useNavigate } from 'react-router-dom';
import { certificates } from '../add-certificate/certificateMockData';

const Example1: React.FC = () => {
  const headers = ['Supplier', 'Certificate type', 'Valid from', 'Valid to'];
  const navigate = useNavigate();

  const handleEdit = (index: number) => {
    const certificateToEdit = certificates[index];
    navigate(`/add-certificate/${certificateToEdit.id}`);
  };

  const handleDelete = () => {};

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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Example1;

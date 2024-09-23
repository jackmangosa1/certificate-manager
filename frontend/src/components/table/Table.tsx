import { ReactNode } from 'react';
import './Table.css';

export type ColumnConfig<T> = {
  header: string;
  accessor: (row: T) => ReactNode;
};

type TableProps<T> = {
  columns: ColumnConfig<T>[];
  data: T[];
  actionColumn?: {
    header: ReactNode;
    render: (row: T, index: number) => ReactNode;
  };
  onRowClick?: (row: T, index: number) => void;
  selectedRows?: T[];
  onSelectRow?: (row: T) => void;
};

const Table = <T,>({
  columns,
  data,
  actionColumn,
  onRowClick,
}: TableProps<T>): JSX.Element => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {actionColumn && <th>{actionColumn.header}</th>}
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row, rowIndex)}
              style={onRowClick ? { cursor: 'pointer' } : {}}
            >
              {actionColumn && (
                <td onClick={(e) => e.stopPropagation()}>
                  {actionColumn.render(row, rowIndex)}
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{column.accessor(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
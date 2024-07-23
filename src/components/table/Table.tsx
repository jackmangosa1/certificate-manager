import './Table.css';

type TableProps<T extends Record<string, unknown>> = {
  headers: string[];
  data: T[];
};

const Table = <T extends Record<string, unknown>>({
  headers,
  data,
}: TableProps<T>): JSX.Element => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>
                  {value instanceof Date
                    ? value.toLocaleDateString()
                    : String(value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

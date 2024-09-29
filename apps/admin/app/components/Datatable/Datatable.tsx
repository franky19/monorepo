import {GetDatatable} from '@/slices/adminSlice';
import {useState} from 'react';

type DatatableProps = {
  headers: string[];
  data: GetDatatable[];
};

const Datatable = ({headers, data}: DatatableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowsPerPageChange = (event: {target: {value: string}}) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when rows per page change
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatString = (str: string): string => {
    return str.trim(); // Example: trim whitespace
  };

  return (
    <div className="lg:container mx-auto px-4">
      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full text-left text-sm border">
          {/* Dynamic table header */}
          <thead className="border bg-blue-500 text-white border-[black]">
            <tr className="bg-gray-200">
              {headers.map((header, index) => (
                <th key={index} className="py-3 px-6">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {/* Dynamic table body */}
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white border-b">
                {/* Include the ID directly from the row */}
                <td className="py-3 px-6">{row.id}</td>
                {/* Dynamically render each column value for the row */}
                {headers.slice(1).map((header, headerIndex) => {
                  // Skip the ID header
                  const key = header.toLowerCase().replace(/\s/g, '_');
                  const cellValue = row.data[key as keyof typeof row.data];

                  return (
                    <td key={headerIndex} className="py-3 px-6">
                      {
                        typeof cellValue === 'number'
                          ? formatNumber(cellValue) // Format number
                          : typeof cellValue === 'string'
                          ? formatString(cellValue) // Format string
                          : typeof cellValue === 'object' && cellValue !== null
                          ? JSON.stringify(cellValue) // Convert object to string
                          : String(cellValue) // Ensure it's a string or number
                      }
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Rows per page */}
        <div>
          <label className="mr-2">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded px-2 py-1 w-[60px]">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Pagination */}
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            className={`py-2 px-4 bg-gray-300 rounded ${
              currentPage === 1 ? 'cursor-not-allowed' : ''
            }`}
            disabled={currentPage === 1}>
            Previous
          </button>
          <span className="px-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className={`py-2 px-4 bg-gray-300 rounded ${
              currentPage === totalPages ? 'cursor-not-allowed' : ''
            }`}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Datatable;

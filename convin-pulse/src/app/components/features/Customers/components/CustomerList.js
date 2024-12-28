'use client';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rowsPerPageOptions = [10, 20, 50, 100];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/data/customers.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch customers data');
        }
        const csvText = await response.text();
        const results = Papa.parse(csvText, { 
          header: true,
          skipEmptyLines: true
        });
        
        const validCustomers = results.data.filter(customer => 
          customer.Name && customer.Name.trim() !== ''
        );
        
        setCustomers(validCustomers);
      } catch (err) {
        setError(err.message);
        console.error('Error loading customers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const tableHeaders = [
    { key: 'Name', label: 'Customer Name' },
    { key: 'Type', label: 'Type' },
    { key: 'ARR', label: 'ARR ($)' },
    { key: 'No of Users', label: 'Total Users' },
    { key: 'Days to Renewal', label: 'Days to Renewal' },
  ];

  // Pagination calculations
  const totalPages = Math.ceil(customers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCustomers = customers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Pagination Controls Component
  const PaginationControls = () => (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex items-center">
        <span className="mr-2 text-sm text-gray-700">Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border border-gray-300 rounded-md text-sm p-1"
        >
          {rowsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm text-gray-700 mr-4">
          {startIndex + 1}-{Math.min(endIndex, customers.length)} of {customers.length}
        </span>
        <nav className="flex items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-md mr-2 ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#5088FE] hover:bg-blue-50'
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              // Show first page, last page, current page, and pages around current page
              return (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
              );
            })
            .map((page, index, array) => {
              // Add ellipsis where there are gaps
              if (index > 0 && page - array[index - 1] > 1) {
                return (
                  <span key={`ellipsis-${page}`} className="px-2 py-1">
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md mx-1 ${
                    currentPage === page
                      ? 'bg-[#5088FE] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-md ml-2 ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#5088FE] hover:bg-blue-50'
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="mt-6">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Customer List</h3>
              <button className="bg-[#5088FE] text-white px-4 py-2 rounded-md hover:bg-[#4070dd]">
                Add Customer
              </button>
            </div>
            <div className="border rounded-lg">
              <div className="px-6 py-12 text-center text-gray-500">
                Loading customers...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6">
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center text-red-600">
              Error loading customers: {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Customer List ({customers.length})
            </h3>
            <button className="bg-[#5088FE] text-white px-4 py-2 rounded-md hover:bg-[#4070dd]">
              Add Customer
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header.key}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCustomers.map((customer, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.Name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{customer.Type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer.ARR !== '0' ? `$${customer.ARR}` : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer['No of Users'] || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customer['Days to Renewal'] !== '-' ? customer['Days to Renewal'] : 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <PaginationControls />
        </div>
      </div>
    </div>
  );
} 
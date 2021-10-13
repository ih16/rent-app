import React, { useEffect, useState } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FiAlertCircle } from 'react-icons/fi';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

export const Column = () => {};

function Table({ data, children }) {
  if (!children.length) children = [children];
  const ColumnProps = children.map(child => child.props);
  const [rows, setRows] = useState([]);
  const [sortingColumn, setSortingColumn] = useState({});

  function sort(dataIndex) {
    const keyExisit = !!(dataIndex in sortingColumn);
    setSortingColumn({
      [dataIndex]: keyExisit ? !sortingColumn[dataIndex] : true,
    });
    setRows(currentRows => [
      ...currentRows.sort((a, b) => {
        if (a[dataIndex] > b[dataIndex])
          return sortingColumn[dataIndex] ? 1 : -1;
        if (a[dataIndex] < b[dataIndex])
          return sortingColumn[dataIndex] ? -1 : 1;
        return 0;
      }),
    ]);
  }

  useEffect(() => {
    setRows(data);
  }, [data]);

  const TableHeaders = () => {
    return ColumnProps.map(column => (
      <th key={column.title} className={`px-5 py-3 ${column.width}`}>
        <button
          type="button"
          onClick={() => sort(column.dataIndex)}
          className="group flex items-center justify-between w-full font-medium"
        >
          <span>{column.title}</span>
          <span className="ml-1 text-gray-400 group-hover:text-gray-500 text-xs">
            {!(column.dataIndex in sortingColumn) && <FaSort />}
            {sortingColumn[column.dataIndex] && <FaSortUp />}
            {!!(column.dataIndex in sortingColumn) &&
              !sortingColumn[column.dataIndex] && <FaSortDown />}
          </span>
        </button>
      </th>
    ));
  };

  const TableRows = () => {
    return (rows || []).map(row => (
      <tr key={row.code} className="hover:bg-gray-100 border-b border-gray-200">
        {ColumnProps.map(column => (
          <td
            key={column.dataIndex}
            className={`py-3 px-5 ${column.width} whitespace-nowrap text-${
              column.align || 'left'
            }`}
          >
            {typeof row[column.dataIndex] === 'boolean' && (
              <span
                className={`bg-${
                  row[column.dataIndex] ? 'green' : 'red'
                }-50 text-${
                  row[column.dataIndex] ? 'green' : 'red'
                }-600 py-1 px-3 rounded-full text-xs`}
              >
                {row[column.dataIndex] ? 'Yes' : 'No'}
              </span>
            )}
            {row[column.dataIndex]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <table className="my-4 bg-white rounded shadow-md">
      <thead className="text-gray-600 text-sm leading-normal bg-gray-200 rounded-t overflow-hidden uppercase">
        <tr>
          <TableHeaders />
        </tr>
      </thead>
      <tbody className="max-h-120 block text-gray-600 text-sm overflow-y-auto">
        <TableRows />
        {rows === undefined && (
          <tr>
            <td>
              <div className="flex items-center justify-center w-full h-24 text-gray-400 text-2xl">
                <span className="text-3xl mr-1.5">
                  <CgSpinnerTwoAlt className="spinner" />
                </span>
                <span>Loading</span>
              </div>
            </td>
          </tr>
        )}
        {rows !== undefined && !rows?.length && (
          <tr>
            <td>
              <div className="flex items-center justify-center w-full h-24 text-gray-400 text-2xl">
                <span className="mt-0.5 mr-1.5">
                  <FiAlertCircle />
                </span>
                <span>Nothing Found</span>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;

Table.propTypes = {
  data: PropTypes.array,
  children: PropTypes.node,
};

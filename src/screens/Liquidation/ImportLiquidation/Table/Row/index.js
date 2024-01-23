import React, { useEffect, useState, useRef } from 'react';

import { ImportLiquidationSchema } from '../../../../../utils/ValidateSchema';
import useListAgencies from '../../../../../hooks/Suggestion/useListAgencies';

const Row = ({ item, setRowIsError }) => {
  const rowErrorRef = useRef(false); // Ref to keep track of whether the Row is in an error state
  const [columns, setColumns] = useState({});

  const { listAgencies } = useListAgencies();

  const printColumn = async (column) => {
    try {
      let valid;
      if (column === 'receiver') {
        valid = listAgencies.data.find(
          (agency) => agency.name === item[column],
        );
        if (!valid) throw new Error('Invalid receiver');
      } else valid = await ImportLiquidationSchema.validateAt(column, item);
      return item[column];
      // if (valid) {
      //   return item[column];
      // } else {
      //   return <span className='dataError'>{item[column]}</span>;
      // }
    } catch (error) {
      if (error && !rowErrorRef.current) {
        // Check if the Row is in an error state and the error flag is not set
        rowErrorRef.current = true; // Set the error flag in the ref to true
        setRowIsError(true); // Set the error flag in the parent component
      }
      return <span className="dataError">{item[column] ?? 'Error'}</span>;
    }
  };

  useEffect(() => {
    const fetchColumns = async () => {
      const columnData = {};
      const columnNames = [
        'name',
        'from',
        'to',
        'category',
        'receiver',
        'status',
        'cost',
        'pic',
      ];

      for (const columnName of columnNames) {
        const field = columnName.replace(/\s/g, '_').toLowerCase();
        columnData[field] = await printColumn(field);
      }

      setColumns(columnData);
    };

    fetchColumns();
  }, [item, setRowIsError]);

  return (
    <div className="tableRow">
      <p className="d-table-cell tableCell py-4 roundedLeft">{columns.name}</p>
      <p className="d-table-cell tableCell">{columns.from}</p>
      <p className="d-table-cell tableCell">{columns.to}</p>
      <div className="d-table-cell tableCell">
        <p
          className="status text-white"
          style={{ backgroundColor: columns?.category?.color }}
        >
          {columns?.category?.name}
        </p>
      </div>
      <p className="d-table-cell tableCell">{columns?.receiver}</p>
      <div className="d-table-cell tableCell">
        <p
          className="status text-white"
          style={{ backgroundColor: columns?.status?.color }}
        >
          {columns?.status?.name}
        </p>
      </div>
      <p className="d-table-cell tableCell">{columns.cost}</p>
      <div className="d-table-cell tableCell roundedRight">
        <p
          className="status text-white"
          style={{ backgroundColor: columns?.pic?.color }}
        >
          {columns?.pic?.name}
        </p>
      </div>
    </div>
  );
};

export default Row;

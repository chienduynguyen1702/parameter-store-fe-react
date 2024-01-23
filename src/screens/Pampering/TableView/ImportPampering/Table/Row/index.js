import React, { useEffect, useState, useRef, useCallback } from 'react';

import { ImportPamperingsSchema } from '../../../../../../utils/ValidateSchema';

const Row = ({ item, setRowIsError }) => {
  const rowErrorRef = useRef(false); // Ref to keep track of whether the Row is in an error state
  const [columns, setColumns] = useState({});

  const printColumn = useCallback(
    async (column) => {
      try {
        const valid = await ImportPamperingsSchema.validateAt(column, item);
        if (valid) {
          return item[column];
        } else {
          return <span className="dataError">{item[column]}</span>;
        }
      } catch (error) {
        console.log(error);
        if (error && !rowErrorRef.current) {
          // Check if the Row is in an error state and the error flag is not set
          rowErrorRef.current = true; // Set the error flag in the ref to true
          setRowIsError(true); // Set the error flag in the parent component
        }
        return <span className="dataError">{item[column]}</span>;
      }
    },
    [item, setRowIsError],
  );

  useEffect(() => {
    const fetchColumns = async () => {
      const columnData = {};
      const columnNames = [
        'date',
        'name',
        'category',
        'cost',
        'pic',
        'status',
        'evidence_url',
      ];

      for (const columnName of columnNames) {
        columnData[columnName] = await printColumn(columnName);
      }

      setColumns(columnData);
    };

    fetchColumns();
  }, [item, setRowIsError, printColumn]);

  return (
    <div className="tableRow">
      <p className="d-table-cell tableCell py-4 roundedLeft">{columns.date}</p>
      <p className="d-table-cell tableCell">{columns.name}</p>
      <div className="d-table-cell tableCell">
        <p
          className="status text-white"
          style={{ backgroundColor: columns?.category?.color }}
        >
          {columns?.category?.name}
        </p>
      </div>
      <p className="d-table-cell tableCell">{columns.cost}</p>
      <div className="d-table-cell tableCell">
        <p
          className="status text-white"
          style={{ backgroundColor: columns?.pic?.color }}
        >
          {columns?.pic?.name}
        </p>
      </div>
      <div className="d-table-cell tableCell">
        <p
          className="status text-white"
          style={{ backgroundColor: columns?.status?.color }}
        >
          {columns?.status?.name}
        </p>
      </div>
      <p className="d-table-cell tableCell textOverFlow roundedRight">
        {columns.evidence_url}
      </p>
    </div>
  );
};

export default Row;

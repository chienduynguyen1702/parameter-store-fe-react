import { useEffect } from 'react';

import cn from 'classnames';
import React, { useState } from 'react';
import styles from './ConfirmField.module.sass';

import { RHFLabel } from '../../';

import RHFDropdown from '../RHFCustom/RHFDropdown';

const ConfirmField = ({
  className,
  label,
  tooltip,
  titleExcel,
  listColumn,
  defaultValues,
  setDefaultValues,
}) => {
  const [fixedHeader, setFixedHeader] = useState(null);

  useEffect(() => {
    const tempHeader = titleExcel[0] ?? null;
    if (!tempHeader) {
      setFixedHeader(null);
      return;
    }

    const filteredHeader = tempHeader
      .filter((item) => item !== '')
      ?.map((item) => item[0].toUpperCase() + item.slice(1));
    setFixedHeader(filteredHeader);

    const result = listColumn.map((item) => {
      const formattedColumn = item?.replace(/\s/g, '_');
      const mappedColumn = filteredHeader.find((column) => {
        const filteredHeaderColumn = column?.replace(/\s/g, '_')?.toLowerCase();
        if (formattedColumn == filteredHeaderColumn && formattedColumn) {
          return true;
        } else return false;
      });

      return mappedColumn ?? 'Unknown';
    });

    setDefaultValues(result);
  }, []);

  const onChangeColumn = (item, index) => {
    const updatedDefaultValues = [...defaultValues];
    updatedDefaultValues[index] = item;
    setDefaultValues(updatedDefaultValues);
  };

  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <RHFLabel classLabel={styles.label} label={label} tooltip={tooltip} />
      )}
      <div className={styles.tableTitle}>
        <div className={cn(styles.col)}>Respective Field</div>
        <div className={cn(styles.col)}>Excel Column Name</div>
      </div>
      {fixedHeader &&
        listColumn?.map((item, index) => {
          return (
            <div className={styles.tableSelect} key={index}>
              <div className={cn(styles.head, 'text-truncate')}>{item}</div>
              <div className={styles.dropdownField}>
                <RHFDropdown
                  name={`field-${index}`}
                  data={fixedHeader ? [...fixedHeader, 'Unknown'] : []}
                  defaultValue={
                    defaultValues?.[index][0].toUpperCase() +
                    defaultValues?.[index].slice(1)
                  }
                  onChangeColumn={(e) => onChangeColumn(e, index)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ConfirmField;

import cn from 'classnames';
import styles from './ConfirmField.module.sass';

import RHFDropdown from './RHFDropdown';
import Tooltip from '../../../../../components/Tooltip';

const ConfirmField = ({
  className,
  label,
  tooltip,
  excelColumnName,
  listColumnName,
  defaultValues,
}) => {
  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <div className={styles.label}>
          {label}{' '}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div className={styles.tableTitle}>
        <div className={cn(styles.col)}>Excel Column Name</div>
        <div className={cn(styles.col)}>Respective Field</div>
      </div>
      {excelColumnName?.map((columnName, index) => {
        return (
          <div className={styles.tableSelect} key={index}>
            <div className={cn(styles.head, 'text-truncate')}>{columnName}</div>
            <div className={styles.dropdownField}>
              <RHFDropdown
                name={`field-${index}`}
                data={listColumnName || []}
                defaultValue={defaultValues[index] || 'Select Field'}
                tooltip="Tooltip text"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConfirmField;

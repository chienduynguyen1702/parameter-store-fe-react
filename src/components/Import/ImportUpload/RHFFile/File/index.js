import cn from 'classnames';

import { RHFLabel, Icon } from '../../../../../components';
import styles from './File.module.sass';

import { ImportExcel } from '../../../../../utils/helpers';

const File = ({
  className,
  label,
  tooltip,
  title,
  onChange,
  setData,
  setTitleExcel,
  value,
}) => {
  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <RHFLabel classLabel={styles.label} label={label} tooltip={tooltip} />
      )}
      <div className={styles.wrap}>
        <input
          className={styles.input}
          type="file"
          accept=".xlsx"
          onChange={(e) => {
            ImportExcel(e, setData, setTitleExcel);
            return onChange(e?.target?.files[0]);
          }}
        />
        <div className={styles.box}>
          {!value.name && <Icon name="upload" size="24" />}
          {value.name || title}
        </div>
      </div>
    </div>
  );
};

export default File;

import cn from 'classnames';
import styles from './File.module.sass';
import Icon from '../../../../../../components/Icon';
import Tooltip from '../../../../../../components/Tooltip';

import { ImportExcel } from '../../../../../../utils/helpers';

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

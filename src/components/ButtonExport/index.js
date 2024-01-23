import { BiImport } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';

import cn from 'classnames';
import styles from './ButtonExport.module.sass';

export default function ButtonExport({
  titleExport = 'Export',
  handleClickExport,
  isLoading,
  className,
}) {
  return (
    <div
      className={cn(
        'button-white-text-grey pe-1',
        styles.btn,
        isLoading && styles.isLoading,
        className,
      )}
      onClick={handleClickExport}
    >
      {titleExport}
      {isLoading ? (
        <Oval
          height={20}
          width={20}
          // color="#6F767E"
          wrapperClass={cn(styles.loader, 'fs-5 ms-2')}
          secondaryColor="#6F767E"
          strokeWidth={6}
          strokeWidthSecondary={6}
        />
      ) : (
        <BiImport className="fs-5 mb-1 ms-2 me-2" />
      )}
    </div>
  );
}

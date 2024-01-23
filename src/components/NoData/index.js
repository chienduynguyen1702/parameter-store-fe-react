import styles from './NoData.module.sass';

import cn from 'classnames';

export default function NoData() {
  return (
    <div
      className={cn(
        'd-flex justify-content-center flex-column align-items-center mt-4 w-100',
        styles.container,
      )}
    >
      <img
        className={styles.imgEmpty}
        src="https://d1j8r0kxyu9tj8.cloudfront.net/files/fXQanWaoXJtqJLvMcGICP4OSqH5m9xzfO7TLn8r6.png"
        alt="empty"
      ></img>
      <div className="mt-3">No data to display</div>
    </div>
  );
}

import cn from 'classnames';
import styles from './PageContent.module.sass';

export default function PageContent({ wide, title, children }) {
  return (
    <>
      <div
        className={cn(styles.container, {
          [styles.wide]: wide,
        })}
      >
        {title && <div className={cn('h3', styles.title)}>{title}</div>}
        {children}
      </div>
    </>
  );
}

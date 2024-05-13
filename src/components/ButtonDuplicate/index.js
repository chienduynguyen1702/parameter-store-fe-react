import cn from 'classnames';
import { IoDuplicateOutline } from 'react-icons/io5';

export default function ButtonDuplicate({
  className,
  handleClick = () => {},
  titleButton = 'Setting',
}) {
  return (
    <button
      className={cn('button-small button-white-grey-border', className)}
      onClick={handleClick}
    >
      <IoDuplicateOutline className="fs-5" />
      {titleButton}
    </button>
  );
}

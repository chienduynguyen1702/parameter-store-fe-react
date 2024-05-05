import cn from 'classnames';
import { GoRocket } from 'react-icons/go';

export default function ButtonApply({
  className,
  handleClickApply = () => {},
  titleButton = 'Apply',
}) {
  return (
    <button
      className={cn('button-small button-white-grey-border', className)}
      onClick={handleClickApply}
    >
      <GoRocket className="fs-5" />
      {titleButton}
    </button>
  );
}

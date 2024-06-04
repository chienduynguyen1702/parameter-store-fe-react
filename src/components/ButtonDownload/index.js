import cn from 'classnames';
import { AiOutlineDownload } from 'react-icons/ai';

export default function ButtonDownload({
  className,
  handleClick = () => {},
  titleButton = '',
}) {
  return (
    <button className={cn('button-small', className)} onClick={handleClick}>
      <AiOutlineDownload size={20} />
      {titleButton}
    </button>
  );
}

import cn from 'classnames';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Button({
  className,
  handleClickAdd = () => {},
  titleButton = '',
}) {
  return (
    <button className={cn('button-small', className)} onClick={handleClickAdd}>
      {/* <AiOutlinePlus className="fs-5" /> */}
      {titleButton}
    </button>
  );
}

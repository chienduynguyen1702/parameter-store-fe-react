import cn from 'classnames';
import { AiOutlinePlus } from 'react-icons/ai';

export default function ButtonImport({
  className,
  handleClickAdd = () => {},
  titleButton = 'Add',
}) {
  return (
    <button className={cn('button-small', className)} onClick={handleClickAdd}>
      <AiOutlinePlus className="fs-5" />
      {titleButton}
    </button>
  );
}

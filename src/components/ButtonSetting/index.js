import cn from 'classnames';
import { AiOutlineSetting } from 'react-icons/ai';

export default function ButtonSetting({
  className,
  handleClickSetting = () => {},
  titleButton = 'Setting',
}) {
  return (
    <button
      className={cn('button-small button-white-grey-border', className)}
      onClick={handleClickSetting}
    >
      <AiOutlineSetting className="fs-5" />
      {titleButton}
    </button>
  );
}

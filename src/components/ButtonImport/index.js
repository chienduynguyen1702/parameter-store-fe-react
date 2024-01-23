import cn from 'classnames';
import Icon from '../Icon';

export default function ButtonImport({
  className,
  handleClickImport = () => {},
  titleButton = 'Import',
}) {
  return (
    <button
      className={cn('button-small button-white-grey-border', className)}
      onClick={handleClickImport}
    >
      <Icon name="upload" size="24" />
      {titleButton}
    </button>
  );
}

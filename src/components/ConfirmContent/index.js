import { Stack } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';

import cn from 'classnames';
import Card from '../Card';

function ConfirmContent({
  title,
  content,
  contentBtnCancel = 'Cancel',
  contentBtnSubmit = 'Submit',
  isLoading,
  onClose,
  handleSubmit,
}) {
  return (
    <>
      <Card
        title={title}
        className="p-0"
        classCardHead="mb-2"
        classTitle={cn('title-red')}
      >
        <p>{content}</p>
      </Card>
      <Stack direction="horizontal" gap={3} className="mt-4">
        <p onClick={onClose} className="button-white-grey-border ms-auto">
          {contentBtnCancel}
        </p>
        <button
          className="button"
          onClick={() => {
            handleSubmit();
          }}
        >
          {isLoading ? (
            <ThreeDots width={50} height={32} />
          ) : (
            <span>{contentBtnSubmit}</span>
          )}
        </button>
      </Stack>
    </>
  );
}

export default ConfirmContent;

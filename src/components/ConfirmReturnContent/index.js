import { Stack } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';

import cn from 'classnames';
import Card from '../Card';
import RHFTextInput from '../RHF/RHFTextInput';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';

function ConfirmReturnContent({
  title,
  content,
  message,
  contentBtnCancel = 'Cancel',
  contentBtnSubmit = 'Submit',
  isLoading,
  onClose,
  handleSubmit,
}) {
  const method = useForm({});
  return (
    <>
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Card
          title={title}
          className="p-0"
          classCardHead="mb-2"
          classTitle={cn('title-red')}
        >
          <p>{message}</p>
          <RHFTextInput
            name="content"
            value={content}
            disabled={true}
          />
        </Card>
        <Stack direction="horizontal" gap={3} className="mt-4">
          {/* <p onClick={onClose} className="button-white-grey-border ms-auto">
            {contentBtnCancel}
          </p> */}
          <button
            className="button ms-auto"
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

        </form>
      </FormProvider>
    </>
  );
}

export default ConfirmReturnContent;

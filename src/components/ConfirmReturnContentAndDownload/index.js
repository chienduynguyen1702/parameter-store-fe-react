import { Stack } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';
import { AiOutlineDownload } from 'react-icons/ai';

import cn from 'classnames';
import Card from '../Card';
import RHFTextInput from '../RHF/RHFTextInput';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';

function ConfirmReturnContent({
  title,
  content,
  message,
  submessages,
  contentBtnCancel = 'Cancel',
  contentBtnSubmit = 'Submit',
  contentBtnDownload = 'Download Agent Script',
  isLoading,
  onClose,
  handleSubmit,
  handleDownload,
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
            <RHFTextInput name="content" value={content} disabled={true} />
            {submessages && (
              <ul>
                {submessages.map((submessage, index) => (
                  <li key={index}>{submessage}</li>
                ))}
              </ul>
            )}
          </Card>
          <Stack direction="horizontal" className="mt-4">
            {/* Download button */}
            <button
              className="button-white-grey-border ms-auto"
              onClick={(event) => {
                event.preventDefault(); // Ngăn chặn hành vi mặc định của button
                handleDownload();
              }}
            >
              <AiOutlineDownload size={20} />
              {isLoading ? (
                <ThreeDots width={50} height={32} />
              ) : (
                <span>{contentBtnDownload}</span>
              )}
            </button>

            {/* Submit button */}
            <button
              className="button ms-3"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isLoading ? (
                <ThreeDots width={50} height={32} />
              ) : (
                // add download icon
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

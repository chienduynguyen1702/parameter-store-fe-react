import { useForm } from 'react-hook-form';

import ParameterForm from '../ParameterForm';

import { useListParameters } from '../../../../../hooks/data';

const EditForm = ({ onClose }) => {
  const { editParameterMutation } = useListParameters();
  const method = useForm({});

  const handleSubmit = (data) => {
    editParameterMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ParameterForm
      title="Edit Parameter"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default EditForm;

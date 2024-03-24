import { useForm } from 'react-hook-form';

import ParameterForm from '../ParameterForm';

import { useListParameters } from '../../../../../hooks/data';

const AddForm = ({ onClose }) => {
  const { addParameterMutation } = useListParameters();
  const method = useForm({});

  const handleSubmit = (data) => {
    addParameterMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ParameterForm
      title="Add Parameter"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddForm;

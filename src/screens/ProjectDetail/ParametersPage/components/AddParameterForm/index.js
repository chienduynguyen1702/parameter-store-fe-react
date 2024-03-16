import { useForm } from 'react-hook-form';

import ParameterForm from '../ParameterForm';

import { useAddUser } from '../../../../../hooks/data';

const AddForm = ({ onClose }) => {
  const { addUserMutation } = useAddUser({ onClose });
  const method = useForm({
    // resolver: yupResolver(schema),
    // defaultValues: {},
  });

  const handleSubmit = (data) => {
    addUserMutation.mutate(data);
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

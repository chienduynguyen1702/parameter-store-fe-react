import { useForm } from 'react-hook-form';

import ProjectForm from '../ProjectForm/ProjectForm';

import { useAddUser } from '../../../../hooks/data';

const EditForm = ({ onClose }) => {
  const { addUserMutation } = useAddUser({ onClose });
  const method = useForm({
    // resolver: yupResolver(schema),
    // defaultValues: {},
  });

  const handleSubmit = (data) => {
    addUserMutation.mutate(data);
  };

  return (
    <ProjectForm
      title="Add User"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default EditForm;

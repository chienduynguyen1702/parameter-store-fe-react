import { useForm } from 'react-hook-form';
import { useListUsers } from '../../../../hooks/data';
import UserForm from '../UserForm';

const EditUserForm = () => {
  const { editUserMutation } = useListUsers();
  const method = useForm({});

  const handleSubmit = (data) => {
    editUserMutation.mutate(data);
  };

  return (
    <UserForm
      title="Edit User"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={() => {}}
    />
  );
};

export default EditUserForm;

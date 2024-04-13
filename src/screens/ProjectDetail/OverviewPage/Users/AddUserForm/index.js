import { useForm } from 'react-hook-form';
import { useListUsers } from '../../../../../hooks/data';
import UserForm from '../UserForm';

const AddUserForm = ({ listUsers, onClose }) => {
  const { addUserMutation } = useListUsers({ onClose });
  const method = useForm({});

  const handleSubmit = (data) => {
    addUserMutation.mutate(data);
  };

  return (
    <UserForm
      title="Add User"
      listUsers={listUsers}
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddUserForm;

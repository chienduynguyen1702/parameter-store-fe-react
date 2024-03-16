import { useForm } from 'react-hook-form';
import { useAddUser } from '../../../../hooks/data';
import UserForm from '../UserForm';

const AddUserForm = ({ onClose }) => {
  const { addUsersMutation } = useAddUser({ onClose });
  const method = useForm({
    // resolver: yupResolver(schema),
    // defaultValues: {},
  });

  const handleSubmit = (data) => {
    addUsersMutation.mutate(data);
  };

  return (
    <UserForm
      title="Add User"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddUserForm;

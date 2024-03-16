import { useForm } from 'react-hook-form';
import { useAddUser } from '../../../../hooks/data';
import UserForm from '../UserForm';

const EditUserForm = () => {
  const { addUsersMutation } = useAddUser();
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
      onClose={() => {}}
    />
  );
};

export default EditUserForm;

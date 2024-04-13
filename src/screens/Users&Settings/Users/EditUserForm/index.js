import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useListUsers } from '../../../../hooks/data';
import UserForm from '../UserForm';
import { getUser } from '../../../../services/api';

const EditUserForm = ({ editedItemId }) => {
  const { editUserMutation } = useListUsers();
  const method = useForm({});
  const handleSubmit = (data) => {
    // console.log('handleSubmit data', data);
    editUserMutation.mutate(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(editedItemId);
        const userData =  response.data.data.users;// Assuming response.data contains user information
        method.reset(userData); // Populate form fields with user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);

  // console.log('method', method);

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

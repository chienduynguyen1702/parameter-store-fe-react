import { useForm } from 'react-hook-form';
import { useListUsers } from '../../../../hooks/data';
import UserForm from '../UserForm';
import { toast } from 'react-toastify';

const AddUserForm = ({ onClose }) => {
  const { addUserMutation } = useListUsers({ onClose });
  const method = useForm({});

  const handleSubmit = (data) => {
    addUserMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.log("error", error.response.data.error)
        toast.error(error.response.data.error, {
          autoClose: 5000,
        });
      }
    });
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

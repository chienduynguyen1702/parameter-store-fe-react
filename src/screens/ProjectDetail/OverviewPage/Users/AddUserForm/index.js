import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useProjectUserList } from '../../../../../hooks/data';
import UserForm from '../UserForm';

const AddUserForm = ({ listUsers, onClose }) => {
  const { id } = useParams();
  const { addUserMutation } = useProjectUserList(id);
  const method = useForm({});

  const handleSubmit = (data) => {
    console.log(data);
    const body = {
      data: data,
      project_id: id,
    }
    addUserMutation.mutate(body,{
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.log(error);
      }
    });
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

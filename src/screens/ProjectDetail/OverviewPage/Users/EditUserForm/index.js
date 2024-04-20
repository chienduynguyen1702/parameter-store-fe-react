import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useProjectUserList } from '../../../../../hooks/data';
import UserForm from '../UserForm';
import { getUserInProject } from '../../../../../services/api';
import { toast } from 'react-toastify';


const EditUserForm = ({ editedItemId ,onClose}) => {
  const { id } = useParams();
  const { editUserMutation } = useProjectUserList();
  const method = useForm({});

  const handleSubmit = (data) => {
    const req = {
      data: data,
      user_id: editedItemId,
      project_id: id,
    }
    editUserMutation.mutate(req, {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const project_id = id;
        const response = await getUserInProject(project_id,editedItemId);

        const userData =  response.data.data?.users;// Assuming response.data contains user information
        console.log ('userData',userData)
        method.reset(userData); // Populate form fields with user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);
  
  return (
    <UserForm
      title="Edit User and Role"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={() => {}}
    />
  );
};

export default EditUserForm;

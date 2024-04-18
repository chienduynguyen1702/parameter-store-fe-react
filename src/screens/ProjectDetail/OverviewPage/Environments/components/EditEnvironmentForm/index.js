import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import EnvironmentForm from '../EnvironmentForm';
import { useListEnvironments } from '../../../../../../hooks/data';
import { getEnvironmentByID } from '../../../../../../services/api';

const EditEnvironmentForm = ({ project_id , editedItemId }) => {
  // const {id} = useParams();
  // console.log('id', id);
  const { editEnvironmentMutation } = useListEnvironments(project_id);
  const method = useForm({});
  // console.log('editedItemId', editedItemId);
  const handleSubmit = (data) => {
    const req = {
      data: data,
      environment_id: editedItemId,
      project_id: project_id,
    }
    editEnvironmentMutation.mutate(req);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEnvironmentByID(project_id, editedItemId);
        const environmentData =  response.data.environment;// Assuming response.data contains environment information
        console.log('response', environmentData);
        method.reset(environmentData); // Populate form fields with environment data
      } catch (error) {
        console.error('Error fetching environment data:', error);
      }
    };

    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);


  return (
    <EnvironmentForm
      title="Edit Environment"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={() => {}}
    />
  );
};

export default EditEnvironmentForm;

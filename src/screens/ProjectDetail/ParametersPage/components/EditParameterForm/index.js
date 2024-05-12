import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ParameterForm from '../ParameterForm';

import { useListParameters } from '../../../../../hooks/data';
import { getParameterByID } from '../../../../../services/api';

const EditForm = ({
  project_id,
  editedItemId,
  onClose,
  stages,
  environments,
}) => {
  const { editParameterMutation } = useListParameters();
  const method = useForm({});

  const handleSubmit = (data) => {
    const req = {
      data: data,
      parameter_id: editedItemId,
      project_id: project_id,
    };
    editParameterMutation.mutate(req, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Error editing parameter:', error);
      },
    });
  };
  // console.log('editedItemId', editedItemId);
  // console.log('project_id', project_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getParameterByID(project_id, editedItemId);
        const parameterData = response.data.data.parameter; // Assuming response.data contains parameter information
        console.log('parameterData EditForm', parameterData);
        method.reset(parameterData); // Populate form fields with parameter data
      } catch (error) {
        console.error('Error fetching parram data:', error);
      }
    };

    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);

  return (
    <ParameterForm
      title="Edit Parameter"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
      stages={stages}
      environments={environments}
    />
  );
};

export default EditForm;

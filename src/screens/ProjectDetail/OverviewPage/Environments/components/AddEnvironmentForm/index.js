import { useForm } from 'react-hook-form';
import EnvironmentForm from '../EnvironmentForm';

import { useListEnvironments } from '../../../../../../hooks/data';

const AddForm = ({ project_id, onClose }) => {
  const { addEnvironmentMutation } = useListEnvironments(project_id);
  const method = useForm({});
  // console.log('project_id in AddForm', project_id);
  const handleSubmit = (data) => {
    const body = {
      data: data,
      project_id: project_id,
    };
    addEnvironmentMutation.mutate(body, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <EnvironmentForm
      title="Add Environment"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddForm;

import { useForm } from 'react-hook-form';

import ProjectForm from '../ProjectForm';
import { useListProjects } from '../../../../hooks/data';

const AddForm = ({ onClose }) => {
  const { addProjectMutation } = useListProjects();
  const method = useForm({});

  const handleSubmit = (data) => {
    addProjectMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ProjectForm
      title="Add Project"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddForm;

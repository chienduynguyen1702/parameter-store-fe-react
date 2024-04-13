import { useForm } from 'react-hook-form';

import ProjectForm from '../ProjectForm';
import { useListProjects } from '../../../../../hooks/data';

const AddForm = ({ onClose }) => {
  const { editProjectMutation } = useListProjects();
  const method = useForm({});

  const handleSubmit = (data) => {
    editProjectMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ProjectForm
      title="Edit Project"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddForm;

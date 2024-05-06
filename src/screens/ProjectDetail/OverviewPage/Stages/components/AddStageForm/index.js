import { useForm } from 'react-hook-form';
import StageForm from '../StageForm';

import { useListStages } from '../../../../../../hooks/data';

const AddForm = ({ project_id, onClose, stages, environments }) => {
  const { addStageMutation } = useListStages(project_id);
  const method = useForm({});
  // console.log('project_id in AddForm', project_id);
  const handleSubmit = (data) => {
    const body = {
      data: data,
      project_id: project_id,
    };
    addStageMutation.mutate(body, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <StageForm
      title="Add Stage"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
      stages={stages}
      environments={environments}
    />
  );
};

export default AddForm;

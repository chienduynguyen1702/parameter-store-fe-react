import { useForm } from 'react-hook-form';

import ParameterForm from '../ParameterForm';

import { useListParameters } from '../../../../../hooks/data';

const AddForm = ({project_id, onClose, stages, environments }) => {
  const { addParameterMutation } = useListParameters();
  const method = useForm({});

  const handleSubmit = (data) => {
    const req = {
      data: data,
      project_id: project_id,
    };
    addParameterMutation.mutate(req, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <ParameterForm
      title="Add Parameter"
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

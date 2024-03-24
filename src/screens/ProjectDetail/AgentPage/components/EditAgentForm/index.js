import { useForm } from 'react-hook-form';

import AgentForm from '../AgentForm';

import { useListAgents } from '../../../../../hooks/data';

const AddForm = ({ onClose }) => {
  const { editAgentMutation } = useListAgents();
  const method = useForm({});

  const handleSubmit = (data) => {
    editAgentMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <AgentForm
      title="Edit Agent"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddForm;

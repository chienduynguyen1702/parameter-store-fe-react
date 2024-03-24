import { useForm } from 'react-hook-form';

import AgentForm from '../AgentForm';

import { useListAgents } from '../../../../../hooks/data';

const AddForm = ({ onClose }) => {
  const { addAgentMutation } = useListAgents();
  const method = useForm({});

  const handleSubmit = (data) => {
    addAgentMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <AgentForm
      title="Add Agent"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
    />
  );
};

export default AddForm;

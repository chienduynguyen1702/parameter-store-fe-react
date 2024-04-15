import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import AgentForm from '../AgentForm';

import { useListAgents } from '../../../../../hooks/data';

const AddForm = ({ project_id, onClose ,stages, environments}) => {
  const { addAgentMutation } = useListAgents(project_id);
  const method = useForm({});
  // console.log('project_id in AddForm', project_id);
  const handleSubmit = (data) => {
    const body = {
        data : data,
        project_id : project_id,
      };
    addAgentMutation.mutate(body, {
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
      stages={stages}
      environments={environments}
    />
  );
};

export default AddForm;

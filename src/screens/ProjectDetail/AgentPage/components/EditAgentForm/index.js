import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AgentForm from '../AgentForm';
import { useListAgents } from '../../../../../hooks/data';
import { getAgentById } from '../../../../../services/api';

const EditAgentForm = ({ editedItemId }) => {
  const { editAgentMutation } = useListAgents();
  const method = useForm({});
  const handleSubmit = (data) => {
    editAgentMutation.mutate(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAgentById(editedItemId);
        const agentData =  response.data.data.agents;// Assuming response.data contains agent information
        method.reset(agentData); // Populate form fields with agent data
      } catch (error) {
        console.error('Error fetching  agent data:', error);
      }
    };

    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);

  // console.log('method', method);

  return (
    <AgentForm
      title="Edit Agent"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={() => {}}
    />
  );
};

export default EditAgentForm;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AgentForm from '../AgentForm';
import { useListAgents } from '../../../../../hooks/data';
import { getAgentById } from '../../../../../services/api';

const EditAgentForm = ({ project_id , editedItemId, stages, environments }) => {
  const {id} = useParams();
  // console.log('id', id);
  const { editAgentMutation } = useListAgents(project_id);
  const method = useForm({});
  // console.log('editedItemId', editedItemId);
  const handleSubmit = (data) => {
    const req = {
      data: data,
      agent_id: editedItemId,
      project_id: project_id,
    }
    editAgentMutation.mutate(req);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAgentById(project_id, editedItemId);
        const agentData =  response.data.agent;// Assuming response.data contains agent information
        console.log('response', agentData);
        method.reset(agentData); // Populate form fields with agent data
      } catch (error) {
        console.error('Error fetching agent data:', error);
      }
    };

    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);


  return (
    <AgentForm
      title="Edit Agent"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      stages={stages}
      environments={environments}
      onClose={() => {}}
    />
  );
};

export default EditAgentForm;

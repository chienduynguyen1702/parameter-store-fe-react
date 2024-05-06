import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AgentForm from '../AgentForm';
import { useListAgents } from '../../../../../hooks/data';
import { getAgentById } from '../../../../../services/api';
import { toast } from 'react-toastify';

const EditAgentForm = ({
  project_id,
  onClose,
  editedItemId,
  stages,
  environments,
  workflows,
}) => {
  // const {id} = useParams();
  const { editAgentMutation } = useListAgents(project_id);
  const method = useForm({});

  const handleSubmit = (data) => {
    const req = {
      data: data,
      agent_id: editedItemId,
      project_id: project_id,
    };
    editAgentMutation.mutate(req, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.log('error', error.response.data.error);
        toast.error(error.response.data.error, {
          autoClose: 5000,
        });
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAgentById(project_id, editedItemId);
        const agentData = response.data.agent;
        const parseAgentData = {
          name: agentData.name,
          description: agentData.description,
          environment_id: agentData.Environment.ID,
          environment: agentData.Environment.name,
          stage_id: agentData.Stage.ID,
          stage: agentData.Stage.name,
          workflow_name: agentData.workflow_name,
        };
        // console.log('response', parseAgentData);
        method.reset(parseAgentData); // Populate form fields with agent data
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
      workflows={workflows}
      onClose={() => {}}
    />
  );
};

export default EditAgentForm;

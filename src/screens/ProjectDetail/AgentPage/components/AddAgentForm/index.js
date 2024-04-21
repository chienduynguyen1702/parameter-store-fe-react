import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import AgentForm from '../AgentForm';

import { useListAgents } from '../../../../../hooks/data';
import { toast } from 'react-toastify';

const AddForm = ({ project_id, onClose ,stages, environments, setShowConfirmation , setReturnToken}) => {
  const { addAgentMutation } = useListAgents(project_id);
  const method = useForm({});
  // console.log('project_id in AddForm', project_id);
  const handleSubmit = (data) => {
    console.log("AddForm data", data)
    const body = {
        data : data,
        project_id : project_id,
      };
    addAgentMutation.mutate(body, {
      onSuccess: (data) => {
        onClose();
        setReturnToken(data.data?.api_token);
        setShowConfirmation(true);
        console.log("data", data)
      },
      onError: (error) => {
        console.log("error", error.response.data.error)
        toast.error(error.response.data.error, {
          autoClose: 5000,
        });
      }
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

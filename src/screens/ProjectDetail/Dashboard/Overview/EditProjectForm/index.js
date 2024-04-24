import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ProjectForm from '../ProjectForm';
import { useListProjects } from '../../../../../hooks/data';
import { getProjectOverview } from '../../../../../services/api';
import moment from 'moment';
import { toast } from 'react-toastify';

const AddForm = ({editedItemId, onClose }) => {
  const { editProjectMutation } = useListProjects();
  const method = useForm({});
  const handleSubmit = (data) => {
    editProjectMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.log("error", error.response.data.error)
        toast.error(error.response.data.error, {
          autoClose: 5000,
        });
      }
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjectOverview(editedItemId);
        
        const projectData = {
            id: response.data.overview.ID,
            name: response.data.overview.name,
            description: response.data.overview.description,
            status: response.data.overview.status,
            start_at: moment(response.data.overview.start_at).format('DD-MM-YYYY'),
            current_sprint: response.data.overview.current_sprint,
            address: response.data.overview.address,
            repo_url: response.data.overview.repo_url,
            repo_api_token: response.data.overview.repo_api_token,
          } 
        method.reset(projectData); // Populate form fields with org data
      } catch (error) {
        console.error('Error fetching org data:', error);
      }
    };
    
    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);
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

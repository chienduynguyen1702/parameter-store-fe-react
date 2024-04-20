import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import ProjectForm from '../ProjectForm';
import { useListProjects } from '../../../../../hooks/data';
import { getProjectOverview } from '../../../../../services/api';
import moment from 'moment';

const AddForm = ({editedItemId, onClose }) => {
  const { editProjectMutation } = useListProjects();
  const method = useForm({});
  const handleSubmit = (data) => {
    editProjectMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjectOverview(editedItemId);
        console.log('project overview in fetch', response.data.overview);
        
        const orgData = {
            id: response.data.overview.ID,
            name: response.data.overview.name,
            description: response.data.overview.description,
            status: response.data.overview.status,
            start_at: moment(response.data.overview.start_at).format('YYYY-MM-DD'),
            current_sprint: response.data.overview.current_sprint,
            address: response.data.overview.address,
            repo_url: response.data.overview.repo_url,
            repo_api_token: response.data.overview.repo_api_token,
          } 
        method.reset(orgData); // Populate form fields with org data
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

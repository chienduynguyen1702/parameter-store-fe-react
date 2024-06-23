import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import ParameterForm from '../ParameterForm';

import { useListParameters } from '../../../../../hooks/data';
import {
  getParameterByID,
  getProjectOverview,
} from '../../../../../services/api';

const EditForm = ({
  project_id,
  editedItemId,
  onClose,
  stages,
  environments,
}) => {
  const { editParameterMutation } = useListParameters();
  const method = useForm({});

  const [parameterData, setParameterData] = useState({
    name: '',
    value: '',
    description: '',
    is_using_at_file: '',
    stage_id: '',
    environment_id: '',
    is_using_at_file_array: [],
    projectRepoURL: '',
  });
  const [projectRepoURL, setProjectRepoURL] = useState(''); // [1] Initialize projectRepoURL state

  const handleSubmit = (data) => {
    const req = {
      data: data,
      parameter_id: editedItemId,
      project_id: project_id,
    };
    editParameterMutation.mutate(req, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Error editing parameter:', error);
      },
    });
  };
  // console.log('editedItemId', editedItemId);
  // console.log('project_id', project_id);

  const parseStringToArray = (string) => {
    try {
      // Check if the string is a valid JSON
      return JSON.parse(string);
    } catch (error) {
      // If the string is not a valid JSON, handle the error appropriately
      console.error('Failed to parse string to array:', error);
      return [];
    }
  };

  const formatIsUsedAtFile = (isUsedAtFile) => {
    return isUsedAtFile
      .map((file) => `${file.file_name}: [${file.line_number.join(', ')}]\n`)
      .join('; ');
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getParameterByID(project_id, editedItemId);
        const parameterData = response.data.data.parameter;
        parameterData.is_using_at_file_array = parseStringToArray(
          parameterData.is_using_at_file,
        );
        parameterData.is_using_at_file = formatIsUsedAtFile(
          parseStringToArray(parameterData.is_using_at_file),
        );
        setParameterData(parameterData); // Update state with fetched data
        console.log('parameterData', parameterData);
        method.reset(parameterData); // Populate form fields with parameter data
      } catch (error) {
        console.error('Error fetching parameter data:', error);
      }
    };
    const fetchProjectRepoURL = async () => {
      try {
        const response = await getProjectOverview(project_id);

        const projectData = {
          id: response.data.overview.ID,
          repo_url: response.data.overview.repo_url,
        };
        setProjectRepoURL(projectData.repo_url); // [2] Update projectRepoURL state with fetched data
        setParameterData((prev) => ({
          ...prev,
          projectRepoURL: projectData.repo_url,
        })); // [3] Update parameterData state with projectRepoURL
      } catch (error) {
        console.error('Error fetching org data:', error);
      }
    };
    fetchProjectRepoURL();
    fetchData();
  }, [editedItemId, project_id, method]);

  return (
    <ParameterForm
      title="Edit Parameter"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      onClose={onClose}
      stages={stages}
      parameterInfo={parameterData}
      environments={environments}
    />
  );
};

export default EditForm;

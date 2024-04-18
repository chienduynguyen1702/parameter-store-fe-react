import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import StageForm from '../StageForm';
import { useListStages } from '../../../../../../hooks/data';
import { getStageByID } from '../../../../../../services/api';

const EditStageForm = ({ project_id , editedItemId, stages, environments }) => {
  const {id} = useParams();
  // console.log('id', id);
  const { editStageMutation } = useListStages(project_id);
  const method = useForm({});
  // console.log('editedItemId', editedItemId);
  const handleSubmit = (data) => {
    const req = {
      data: data,
      stage_id: editedItemId,
      project_id: project_id,
    }
    editStageMutation.mutate(req);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStageByID(project_id, editedItemId);
        const stageData =  response.data.stage;// Assuming response.data contains stage information
        console.log('response', stageData);
        method.reset(stageData); // Populate form fields with stage data
      } catch (error) {
        console.error('Error fetching stage data:', error);
      }
    };

    fetchData(); // Call fetchData function when editedItemId changes
  }, [editedItemId, method]);


  return (
    <StageForm
      title="Edit Stage"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      stages={stages}
      environments={environments}
      onClose={() => {}}
    />
  );
};

export default EditStageForm;

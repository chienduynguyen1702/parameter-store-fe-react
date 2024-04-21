import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import OrganizationForm from '../OrganizationForm';
import { useOrganization } from '../../../hooks/data';
import { toast } from 'react-toastify';

import moment from 'moment';

const EditOrganizationForm = ({ orgData, onClose, editedItemId }) => {
  // console.log('EditOrganizationForm editedItemId',orgData);
  const {id} = useParams();
  const method = useForm({});
  const { editOrganizationMutation } = useOrganization(editedItemId);

  const handleSubmit = (orgData) => {
    const req = {
      data: orgData,
      org_id: editedItemId,
    }
    editOrganizationMutation.mutate(req, {
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
    orgData.establishment_date = moment(orgData.establishment_date).format('DD-MM-YYYY')
    method.reset(orgData); // Populate form fields with organization data
  }, [orgData, method]);

  return (
    <OrganizationForm
      title="Edit Organization"
      method={method}
      handleSubmit={handleSubmit}
      onLoading={false}
      orgData={orgData}
      onClose={() => {}}
    />
  );
};

export default EditOrganizationForm;

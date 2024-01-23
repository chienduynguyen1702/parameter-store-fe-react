import { useMutation } from '@tanstack/react-query';
import { addListSettings, addSetting, editSetting } from '../../services/api';
import { toast } from 'react-toastify';

const useSettingsMutation = () => {
  const addSettingMutation = useMutation(
    (data) => {
      return addSetting(data);
    },
    {
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );
  const addListSettingsMutation = useMutation(
    (data) => {
      return addListSettings(data);
    },
    {
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  const editSettingMutation = useMutation(
    ({ id, data }) => {
      return editSetting(id, data);
    },
    {
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    addSettingMutation,
    addListSettingsMutation,
    editSettingMutation,
  };
};

export default useSettingsMutation;

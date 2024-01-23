import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { archiveKOC, editKOC } from '../../../../services/api';

export default function useRow({ item }) {
  const queryClient = useQueryClient();

  const archiveKOCMutation = useMutation(
    (id) => {
      return archiveKOC(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['KOCs'],
        });
      },
    },
  );

  // Archived KOC
  const { isLoading } = archiveKOCMutation;
  const handleArchiveUser = (id) => {
    archiveKOCMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['koc-summary'],
        });
        toast.success('KOC archived successfully');
      },
    });
  };

  // Edit KOC
  const editKOCsMutation = useMutation(({ id, data }) => {
    return editKOC(id, data);
  });

  // Update KOC (Tier, Category) Mutation
  const handleUpdateTPC = (newSetting, type) => {
    const body = {
      tier: item?.tier?.name,
      category: item?.category?.name,
      platforms: item?.platforms?.map((platform) => platform?.name),
    };

    if (type === 'user-tier') {
      if (item?.tier?.name === newSetting) {
        body['tier'] = null;
      } else body['tier'] = newSetting;
    } else if (type === 'user-category') {
      if (item?.category?.name === newSetting) {
        body['category'] = null;
      } else {
        body['category'] = newSetting;
      }
    } else if (type === 'user-platform') {
      const newPlatforms = item?.platforms.map((platform) => platform?.name);
      // Change currentSetting to newSetting
      const index = newPlatforms.indexOf(newSetting);
      // Update newListPlatforms to body
      if (index === -1) {
        body['platforms'] = [...newPlatforms, newSetting];
      } else {
        body['platforms'] = newPlatforms.filter(
          (platformName) => platformName !== newSetting,
        );
      }
    }

    return editKOCsMutation.mutate(
      { id: item.id, data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['KOCs'],
          });
          toast.success('Edit KOC successfully');
        },
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
        },
      },
    );
  };

  return {
    isLoadingArchive: isLoading,
    handleArchiveUser,
    handleUpdateTPC,
  };
}

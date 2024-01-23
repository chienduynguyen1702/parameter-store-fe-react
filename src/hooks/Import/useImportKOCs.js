import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importUsers } from '../../services/api';
import { ImportUsersSchema } from '../../utils/ValidateSchema';
import moment from 'moment';

export default function useImportKOCs() {
  const queryClient = useQueryClient();

  const importKOCsMutation = useMutation(
    async (items) => {
      try {
        const data = await Promise.all(
          items.map(async (item) => {
            const isValidItem = await ImportUsersSchema.isValid(item);

            if (isValidItem) {
              const {
                category,
                tier,
                platforms,
                id_account,
                hashtag,
                note,
                ...rest
              } = item;

              if (rest.date_of_birth) {
                rest.date_of_birth = moment(
                  rest.date_of_birth,
                  'DD/MM/YYYY',
                ).format('YYYY-MM-DD HH:mm:ss');
              }

              const transformedItem = {
                ...rest,
                category: category?.name,
                tier: tier?.name,
                platforms: platforms?.map((platform) => platform.name),
                is_koc: true,
              };

              platforms.forEach((platform) => {
                const platformName = platform.name?.toLowerCase();

                transformedItem[`${platformName}_id`] = rest[`${platformName}_id`]?.replace(
                  '@',
                  '',
                );

                const platformHashtagKey = `${platformName}_hashtags`;
                transformedItem[platformHashtagKey] = hashtag
                  ?.split(/[, ]+/)
                  .filter(Boolean)
                  .map((item) => item.replace('#', ''));
              });

              return transformedItem;
            }

            return null;
          }),
        );

        const validData = data.filter((item) => item !== null);
        return importUsers(validData);
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['KOCs'],
        });
        toast.success('Import KOCs successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message ?? error.message);
      },
    },
  );
  return {
    importKOCsMutation,
  };
}

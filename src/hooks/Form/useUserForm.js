import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useMatch, useOutletContext, useParams } from 'react-router';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import {
  addUser,
  editUser,
  getListRole,
  getListSettings,
  getUser,
  uploadImage,
} from '../../services/api';

import { AddUserSchema, EditUserSchema } from '../../utils/ValidateSchema';

export default function useUserForm() {
  const { onClose } = useOutletContext();

  const queryClient = useQueryClient();

  // ------------------------------ Handle mode -----------------------------

  const addUserMatch = useMatch('/user-setting/users/add-user');
  const addKOCMatch = useMatch('/kocs/add-koc');

  const isAddMode = useMemo(
    () => Boolean(addUserMatch || addKOCMatch),
    [addUserMatch, addKOCMatch],
  );

  const schema = useMemo(() => {
    if (isAddMode) {
      return AddUserSchema;
    }
    return EditUserSchema;
  }, [isAddMode]);

  const rolesQuery = useQuery({
    queryKey: ['roles'],
    queryFn: () => {
      return getListRole({ page: 1, limit: 1000 });
    },
    select: (data) => {
      return data.data.data.roles.map((item) => ({
        id: item.id,
        text: item.name,
      }));
    },
  });

  const tiersQuery = useQuery({
    queryKey: ['tiers'],
    queryFn: () => {
      return getListSettings({
        type: 'user-tier',
      });
    },
    select: (data) => {
      return data.data.data.map((item) => item.name);
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getListSettings({
        type: 'user-category',
      });
    },
    select: (data) => {
      return data.data.data.map((item) => item.name);
    },
  });

  const platformsQuery = useQuery({
    queryKey: ['platforms'],
    queryFn: () => {
      return getListSettings({
        type: 'user-platform',
      });
    },
    select: (data) => {
      return data.data.data.map((item) => {
        return {
          id: item.id,
          text: item.name,
        };
      });
    },
  });

  // ------------------------------ Add user ------------------------------

  const { id } = useParams();

  const defaultForm = useMemo(
    () => ({
      id: '',
      avatar: '',
      username: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      userType: '',
      agency: '',
      roles: null,
      color: '',
      bio: '',
      // newPassword: '',
      isKOC: true,
      tikTokId: '',
      instagramId: '',
      youtubeId: '',
      facebookId: '',
      tiktokHashtags: null,
      instagramHashtags: null,
      youtubeHashtags: null,
      facebookHashtags: null,
      tier: '',
      category: '',
      platforms: null,
    }),
    [],
  );

  const parseData = useCallback(
    (data) => {
      return {
        ...defaultForm,
        // if field is null, set default value
        id: data?.id || defaultForm.id,
        avatar: data?.avatar_url || defaultForm.avatar,
        username: data?.username || defaultForm.username,
        birthday: new Date(data?.date_of_birth) || defaultForm.birthday,
        email: data?.email || defaultForm.email,
        phone: data?.phone || defaultForm.phone,
        address: data?.address || defaultForm.address,
        city: data?.city || defaultForm.city,
        country: data?.country || defaultForm.country,
        userType: data?.is_koc ? 'KOC' : data?.is_agency ? 'Agency' : 'Other',
        agency: data.agency_id,
        isKOC: data?.is_koc ?? null,

        roles:
          data?.roles?.map((item) => ({
            id: item.id,
            text: item.name,
          })) || defaultForm.roles,
        color: data?.color || defaultForm.color,
        bio: data?.bio || defaultForm.bio,

        tikTokId:
          data?.tiktok_metadata?.rapid_api?.username || defaultForm.tikTokId,
        instagramId:
          data?.instagram_metadata?.rapid_api?.username ||
          defaultForm.instagramId,
        youtubeId:
          data?.youtube_metadata?.rapid_api?.username || defaultForm.youtubeId,
        facebookId:
          data?.facebook_metadata?.rapid_api?.username ||
          defaultForm.facebookId,

        tiktokHashtags:
          data?.tiktok_metadata?.hashtags?.map((item, index) => {
            return {
              id: `${index}`,
              text: item,
            };
          }) || defaultForm.tiktokHashtags,
        instagramHashtags:
          data?.instagram_metadata?.hashtags?.map((item, index) => {
            return {
              id: `${index}`,
              text: item,
            };
          }) || defaultForm.instagramHashtags,
        youtubeHashtags:
          data?.youtube_metadata?.hashtags?.map((item, index) => {
            return {
              id: `${index}`,
              text: item,
            };
          }) || defaultForm.youtubeHashtags,

        tier:
          data?.settings.find((item) => item.type === 'user-tier')?.name ||
          defaultForm.tier,
        category:
          data?.settings.find((item) => item.type === 'user-category')?.name ||
          defaultForm.category,

        platforms:
          data?.settings
            .filter((item) => item.type === 'user-platform')
            ?.map((item) => {
              return {
                id: item.id,
                text: item.name,
              };
            }) || defaultForm.platforms,
      };
    },
    [defaultForm],
  );

  // ------------------------------ Get User -----------------------------
  const userQuery = useQuery({
    queryKey: ['user', id],
    queryFn: () => {
      // if (id === 'me') {
      //   return getMyInfo();
      // }
      return getUser(id);
    },
    enabled: !isAddMode,
    select: (data) => parseData(data.data.data),
  });

  // ------------------------------ Add user ------------------------------

  const addUsersMutation = useMutation(
    (data) => {
      return addUser(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'],
        });
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
        queryClient.invalidateQueries({
          queryKey: ['KOCs'],
        });
        queryClient.invalidateQueries({
          queryKey: ['koc-summary'],
        });
        onClose();
        toast.success('Add user successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  // ------------------------------ Edit user ------------------------------

  const editUsersMutation = useMutation(
    ({ id, data }) => {
      // if (id === 'me') {
      //   return editMyInfo(data);
      // }
      return editUser(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'],
        });
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
        queryClient.invalidateQueries({
          queryKey: ['KOCs'],
        });
        queryClient.invalidateQueries({
          queryKey: ['koc-summary'],
        });
        onClose();
        toast.success('Edit user successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  // ------------------------------ Upload image ------------------------------
  const uploadImageMutation = useMutation((data) => {
    return uploadImage(data);
  });

  // ------------------------------ Submit form ------------------------------
  const handleSubmit = useCallback(
    async (data) => {
      if (!!data.avatar && data.avatar !== userQuery.data?.avatar) {
        const uploadImageResponse = await uploadImageMutation.mutateAsync({
          file: data.avatar,
        });
        data.avatar = uploadImageResponse.data.data || '';
      }

      // Check if user is KOC or Agency
      let isKOC = false;
      let isAgency = false;
      switch (data?.userType) {
        case 'KOC':
          isKOC = true;
          break;
        case 'Agency':
          isAgency = true;
          break;

        default:
          break;
      }

      const body = {
        agency_id: data?.agency && isKOC ? data?.agency : null,
        is_agency: isAgency,
        city: data?.city,
        country: data?.country,
        date_of_birth: data?.birthday,
        is_koc: isKOC,
        tiktok_id: data?.tikTokId,
        instagram_id: data?.instagramId,
        youtube_id: data?.youtubeId,
        facebook_id: data?.facebookId,
        tiktok_hashtags: data?.tiktokHashtags?.map((item) => item.text),
        instagram_hashtags: data?.instagramHashtags?.map((item) => item.text),
        youtube_hashtags: data?.youtubeHashtags?.map((item) => item.text),
        facebook_hashtags: data?.facebookHashtags?.map((item) => item.text),
        platforms: data?.platforms?.map((item) => item.text),
        category: data?.category,
        tier: data?.tier,
        avatar_url: data?.avatar,
        roles:
          data?.roles
            ?.map((item) => {
              const role = rolesQuery.data.find(
                (role) => role.text === item.text,
              );
              if (role) {
                return role.text;
              }
              return null;
            })
            .filter((item) => item !== null) || [],
        color: data?.color,
        bio: data?.bio,
        address: data?.address,
        phone: data?.phone,
        username: data?.username,
        email: data?.email,
      };
      if (data?.newPassword.length > 0) {
        body.password = data?.newPassword;
      }

      if (isAddMode) {
        return addUsersMutation.mutate(body);
      }

      return editUsersMutation.mutate({ id, data: body });
    },
    [
      addUsersMutation,
      editUsersMutation,
      id,
      isAddMode,
      rolesQuery.data,
      uploadImageMutation,
      userQuery.data,
    ],
  );

  return {
    id,
    rolesQuery,
    tiersQuery,
    categoriesQuery,
    platformsQuery,
    defaultForm,
    addUsersMutation,
    userQuery,
    editUsersMutation,
    uploadImageMutation,
    schema,
    isAddMode,
    handleSubmit,
  };
}

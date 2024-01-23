// import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  archiveBrandHashtagsForCrawler,
  getBrandHashtagsForCrawler,
  unarchiveBrandHashtagsForCrawler,
  deleteBrandHashtagsForCrawler,
  updateListCrawlerHashtags,
  createCrawlerHashtags,
} from '../../services/api';
import useQueryString from '../useQueryString';

export default function useBrandHashtagForCrawler() {
  const { queryString } = useQueryString();
  const queryClient = useQueryClient();

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['brandHashtagsForCrawler', queryString],
    queryFn: () => getBrandHashtagsForCrawler(),
    select: (data) => data.data.data,
    staleTime: 1000,
  });

  const archiveHashtagMutation = useMutation(
    (id) => {
      return archiveBrandHashtagsForCrawler(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['brandHashtagsForCrawler'],
        });
        toast.success('Hashtag archived successfully');
      },
    },
  );

  const unarchiveHashtagMutation = useMutation(
    (id) => {
      return unarchiveBrandHashtagsForCrawler(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['brandHashtagsForCrawler'],
        });
        toast.success('Hashtag unarchived successfully');
      },
    },
  );

  const deleteHashtagMutation = useMutation(
    (id) => {
      return deleteBrandHashtagsForCrawler(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['brandHashtagsForCrawler'],
        });
        toast.success('Hashtag deleted successfully');
      },
    },
  );

  const updateListCrawlerHashtagsMutation = useMutation(
    (data) => {
      return updateListCrawlerHashtags(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['brandHashtagsForCrawler'],
        });
        toast.success('List hashtags updated successfully');
      },
    },
  );

  const createCrawlerHashtagsMutation = useMutation(
    (data) => {
      return createCrawlerHashtags(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['brandHashtagsForCrawler'],
        });
        toast.success('Hashtag created successfully');
      },
    },
  );

  return {
    data: data,
    isSuccess,
    isLoading,
    isError,
    archiveHashtagMutation,
    unarchiveHashtagMutation,
    deleteHashtagMutation,
    updateListCrawlerHashtagsMutation,
    createCrawlerHashtagsMutation,
  };
}

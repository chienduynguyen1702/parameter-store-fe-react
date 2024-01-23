import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getTaskSettings } from '../../services/api';

function useSettingsTask() {
  const parseData = useCallback((data) => {
    const settings = data.data.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        color: item.color,
        type: item.type,
      };
    });
    return settings;
  }, []);

  const taskPlatforms = useQuery({
    queryKey: ['task-platform'],
    queryFn: () => getTaskSettings({ type: 'user-platform' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  const taskTypes = useQuery({
    queryKey: ['task-type'],
    queryFn: () => getTaskSettings({ type: 'task-type' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  const taskStatus = useQuery({
    queryKey: ['task-status'],
    queryFn: () => getTaskSettings({ type: 'task-status' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  const taskHashtags = useQuery({
    queryKey: ['task-hashtag'],
    queryFn: () => getTaskSettings({ type: 'hashtag' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data),
  });

  return {
    taskPlatforms,
    taskTypes,
    taskStatus,
    taskHashtags,
  };
}

export default useSettingsTask;

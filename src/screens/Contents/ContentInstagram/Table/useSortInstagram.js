import { useCallback, useMemo, useState } from 'react';
import useQueryString from '../../../../hooks/useQueryString';

export default function useSortInstagram() {
  const { queryString, setQueryString } = useQueryString();

  const [sortMode, setSortMode] = useState(null);

  // Set default icon to display in table column
  const [displayIcon, setDisplayIcon] = useState([
    'default',
    'default',
    'default',
  ]);

  // Handle sort when click on icon in table column
  const handleSort = useCallback(
    (orderBy) => {
      const key = orderBy.slice(0, -1).toLocaleLowerCase() + '_count';
      let mode;
      if (sortMode) {
        mode = 'DESC';
      } else mode = 'ASC';
      const params = {
        ...queryString,
      };
      if (params.orderBy) {
        delete params.orderBy;
      }
      if (params.sortBy) {
        delete params.sortBy;
      }

      params.orderBy = key;
      params.sortBy = mode;
      params.page = 1;
      switch (key) {
        case 'view_count':
          setDisplayIcon([`${mode}`, 'default', 'default']);
          break;
        case 'like_count':
          setDisplayIcon(['default', `${mode}`, 'default']);
          break;
        case 'comment_count':
          setDisplayIcon(['default', 'default', `${mode}`]);
          break;

        default:
          break;
      }

      setSortMode(!sortMode);
      setQueryString(params);
    },
    [queryString, setQueryString, sortMode],
  );

  const summaryField = useMemo(() => {
    // default columns to display
    return ['Views', 'Likes', 'Comments'];
  }, []);

  return {
    displayIcon,
    handleSort,
    summaryField,
  };
}

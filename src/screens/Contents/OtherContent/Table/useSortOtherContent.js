import { useMemo, useState } from 'react';
import useQueryString from '../../../../hooks/useQueryString';

export default function useSortOtherContent() {
  const { queryString, setQueryString } = useQueryString();

  const [sortMode, setSortMode] = useState(null);

  // Set default icon to display in table column
  const [displayIcon, setDisplayIcon] = useState([
    'default',
    'default',
    'default',
    'default',
    'default',
  ]);

  // Handle sort when click on icon in table column
  const handleSort = (orderBy) => {
    // set key from orderBy data like
    const key = orderBy.slice(0, -1).toLocaleLowerCase() + '_count';

    // set mode for sort
    let mode;
    if (!sortMode) {
      mode = 'DESC';
    } else {
      mode = 'ASC';
    }

    // set params from query string
    const params = {
      ...queryString,
    };

    // delete orderBy and sortBy from params
    if (params.orderBy) {
      delete params.orderBy;
    }
    if (params.sortBy) {
      delete params.sortBy;
    }

    // set new params
    params.orderBy = key;
    params.sortBy = mode;
    params.page = 1;

    // set icon to display by key
    switch (key) {
      case 'view_count':
        setDisplayIcon([`${mode}`, 'default', 'default', 'default', 'default']);
        break;
      case 'like_count':
        setDisplayIcon(['default', `${mode}`, 'default', 'default', 'default']);
        break;
      case 'comment_count':
        setDisplayIcon(['default', 'default', `${mode}`, 'default', 'default']);
        break;
      case 'save_count':
        setDisplayIcon(['default', 'default', 'default', `${mode}`, 'default']);
        break;
      case 'share_count':
        setDisplayIcon(['default', 'default', 'default', 'default', `${mode}`]);
        break;

      default:
        break;
    }

    // set sort mode
    setSortMode(!sortMode);

    // set new params to query string
    setQueryString(params);
  };

  const summaryField = useMemo(() => {
    // default columns to display
    return ['Views', 'Likes', 'Comments', 'Shares'];
  }, []);

  return {
    displayIcon,
    handleSort,
    summaryField,
  };
}

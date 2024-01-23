import { useCallback } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import cn from 'classnames';
import styles from './SortingHeader.module.sass';

import { useQueryString } from '../../hooks';

const SortingHeader = ({
  title = 'Header',
  titleTooltip,
  orderParam = 'id',
  className,
}) => {
  const { queryString, setQueryString } = useQueryString();
  const params = queryString;

  const handleSort = useCallback(() => {
    switch (params.sortBy) {
      case 'DESC':
        params.sortBy = 'ASC';
        params.orderBy = orderParam;
        break;
      case 'ASC':
        delete params.sortBy;
        delete params.orderBy;
        break;
      default:
        params.sortBy = 'DESC';
        params.orderBy = orderParam;
    }
    setQueryString(params);
  }, [orderParam, params, setQueryString]);

  return (
    <div
      className={cn('tableCell cursor-pointer', className)}
      onClick={handleSort}
    >
      {title}
      <span className="ms-1">
        <div className={cn(styles.tooltip)}>
          <span data-tip={titleTooltip} data-place={'right'}>
            {!(params.sortBy && params.orderBy === orderParam) && (
              <BiSortAlt2 />
            )}
            {params.orderBy === orderParam && params.sortBy === 'DESC' && (
              <AiOutlineArrowDown />
            )}
            {params.orderBy === orderParam && params.sortBy === 'ASC' && (
              <AiOutlineArrowUp />
            )}
          </span>
        </div>
      </span>
    </div>
  );
};

export default SortingHeader;

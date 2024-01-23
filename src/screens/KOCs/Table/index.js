import React, { useEffect } from 'react';

import Row from './Row';

import {
  NoData,
  Pagination,
  SkeletonTable,
  SortingHeader,
} from '../../../components';

import { useListKOCs } from '../../../hooks/Data';
import { useSettingsUser } from '../../../hooks/Setting';

const Table = ({ setTotal }) => {
  const { listKOCs, isSuccess, isLoading, pagination, totalPage, limit } =
    useListKOCs();

  const { userTiers, userCategories, userPlatforms } = useSettingsUser();

  useEffect(() => {
    if (isSuccess) setTotal(pagination.total);
  });

  return (
    <div className="tableOuter">
      <div className="tableContainer">
        <div className="tableHead">
          {/* <div
            style={{ width: '400px' }}
            className="d-table-cell tableCell ps-3 pb-3 "
          >
            User
          </div> */}
          <SortingHeader title="User" orderParam="username" />
          <SortingHeader title="Followers" orderParam="total_followers" />
          <SortingHeader title="Total videos" orderParam="total_videos" />
          <SortingHeader
            title="Total like of videos"
            orderParam="total_likes"
          />
          <div className="d-table-cell tableCell">Tier</div>
          <div className="d-table-cell tableCell">Platform</div>
          <div className="d-table-cell tableCell">Category</div>
          <div className="d-table-cell tableCell"></div>
        </div>
        {isLoading && (
          <SkeletonTable
            avatar
            threeDotsCols
            colsDesktop={6}
            rowsMobile={3}
            limit={limit}
          />
        )}
        {isSuccess &&
          listKOCs?.map((KOC, index) => (
            <Row
              key={`table-user-${KOC.id}`}
              item={KOC}
              platformList={userPlatforms}
              categoryList={userCategories}
              tierList={userTiers}
            />
          ))}
      </div>
      {isSuccess && listKOCs.length === 0 && <NoData />}
      {((isSuccess && listKOCs.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </div>
  );
};

export default Table;

import Row from './Row';
import { NoData, Pagination, SkeletonTable } from '../../../../components';

import { useListPamperingTableView } from '../../../../hooks/Data';
import { useSettingsPampering } from '../../../../hooks/Setting';

export default function Table({ setTotal }) {
  const { pamperingCategories, pamperingPICs, pamperingStatus } =
    useSettingsPampering();

  const {
    listPamperings,
    isSuccess,
    isLoading,
    limit,
    totalPage,
    total,
    archivePamperingMutation,
  } = useListPamperingTableView();

  isSuccess && setTotal(total);

  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="d-none d-sm-table-row tableHead">
            <div className="tableCell pb-4">Date</div>
            <div className="tableCell">Name</div>
            <div className="tableCell">Category</div>
            <div className="tableCell">Cost</div>
            <div className="tableCell">P.I.C</div>
            <div className="tableCell">Status</div>
            <div className="tableCell">Evidence</div>
            <div className="tableCell">Last edited</div>
            <div className="tableCell"></div>
          </div>
          {isLoading && (
            <SkeletonTable colsDesktop={8} threeDotsCols limit={limit} />
          )}
          {isSuccess &&
            listPamperings?.length > 0 &&
            listPamperings?.map((task) => (
              <Row
                key={task.id}
                item={task}
                listCategories={pamperingCategories}
                listPIC={pamperingPICs}
                listStatus={pamperingStatus}
                archivePamperingMutation={archivePamperingMutation}
              />
            ))}
        </div>
        {isSuccess && listPamperings?.length === 0 && <NoData />}
      </div>
      {((isSuccess && listPamperings?.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
}

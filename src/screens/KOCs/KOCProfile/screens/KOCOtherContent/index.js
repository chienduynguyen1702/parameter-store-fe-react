import { useParams } from 'react-router';
import { useState, useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import Row from './Row';
import OtherContentView from './OtherContentView';
import FormFilter from './FormFilter';
import Settings from './Settings';
import ArchivedKOCs from './ArchivedOtherContent';

import {
  Decentralization,
  FiltersCustom,
  FormSearch,
  Archived,
  ModalPreview,
  Card,
  ModalWithoutPortal,
  Pagination,
  NoData,
  SkeletonTable,
} from '../../../../../components';

import {
  useSettingsMutation,
  useSettingsOtherContent,
} from '../../../../../hooks/Setting';
import useListOtherContentByKOC from './useListOtherContentByKOC';

export default function KOCOtherContent(className) {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  const [videoModalPreview, setVideoModalPreview] = useState();

  const [visibleOtherContentView, setVisibleOtherContentView] = useState(false);
  const [idItem, setIdItem] = useState();

  const handleVisibleOtherContentView = useCallback((value) => {
    setVisibleOtherContentView(value);
  }, []);

  const { id } = useParams();

  const { otherContentPostTypes, otherContentPlatforms } =
    useSettingsOtherContent();

  const { addSettingMutation, editSettingMutation } = useSettingsMutation();

  const {
    listContents,
    isSuccess,
    isLoading,
    pagination,
    limit,
    totalPage,
    deleteOtherContentMutation,
    archiveOtherContentMutation,
  } = useListOtherContentByKOC(id);

  return (
    <>
      <ModalWithoutPortal
        visible={visibleOtherContentView}
        onClose={() => {
          setVisibleOtherContentView(false);
        }}
      >
        <OtherContentView
          key={visibleOtherContentView}
          visibleOtherContent={visibleOtherContentView}
          setVisibleOtherContentView={setVisibleOtherContentView}
          id={idItem}
          KOCId={id}
        />
      </ModalWithoutPortal>
      <div className="d-flex">
        <button
          className="button-small me-auto"
          onClick={() => {
            handleVisibleOtherContentView(true);
            setIdItem();
          }}
        >
          <AiOutlinePlus className="fs-5" />
          Create
        </button>
        <Settings
          addSettingMutation={addSettingMutation}
          editSettingMutation={editSettingMutation}
          userPlatforms={otherContentPlatforms}
          userType={otherContentPostTypes}
        />
      </div>
      <Card
        title={(pagination?.total || 0) + ' Other Contents'}
        classTitle="title-purple"
        classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3"
        head={
          <>
            <FormSearch placeholder="Search by title or description" />
            <div className="d-flex">
              <FiltersCustom className="me-2">
                <FormFilter
                  userPlatforms={otherContentPlatforms}
                  userType={otherContentPostTypes}
                />
              </FiltersCustom>
              <Decentralization permissions={['user-archivist-list']}>
                <Archived title="Archived OtherContents">
                  <ArchivedKOCs id={id} />
                </Archived>
              </Decentralization>
            </div>
          </>
        }
      />
      <div className="tableOuter">
        <div className="d-table w-100">
          <div className="d-sm-table-row tableHead d-none">
            <div className="d-table-cell tableCell pb-4">Image</div>
            <div className="d-table-cell tableCell">Title</div>
            <div className="d-table-cell tableCell">Type</div>
            <div className="d-table-cell tableCell">Platform</div>
            <div className="d-table-cell tableCell">Create at</div>
            <div className="d-table-cell tableCell">Extracted Data</div>
            <div className="d-table-cell tableCell invisible"></div>
          </div>
          {isLoading && (
            <SkeletonTable
              colsDesktop={6}
              threeDotsCols
              rowsMobile={4}
              limit={limit}
            />
          )}
          {isSuccess &&
            listContents?.map((content) => (
              <Row
                key={content.id}
                item={content}
                platformList={otherContentPlatforms}
                typeList={otherContentPostTypes}
                archiveOtherContentMutation={archiveOtherContentMutation}
                deleteOtherContentMutation={deleteOtherContentMutation}
                onVisibleOtherContentView={handleVisibleOtherContentView}
                setIdItem={setIdItem}
                setVisibleModalPreview={setVisibleModalPreview}
                setVideoModalPreview={setVideoModalPreview}
              />
            ))}
        </div>
        {isSuccess && listContents?.length === 0 && <NoData />}
        {pagination?.total > 0 && <Pagination pageCount={totalPage || 5} />}
        <ModalPreview
          visible={visibleModalPreview}
          onClose={() => setVisibleModalPreview(false)}
          video={videoModalPreview}
          title="Preview OtherContent"
        >
          <img
            className="h-100"
            src={videoModalPreview}
            alt="img OtherContent"
          />
        </ModalPreview>
      </div>
    </>
  );
}

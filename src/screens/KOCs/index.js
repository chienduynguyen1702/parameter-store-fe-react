import React, { useState, useMemo, useCallback } from 'react';
import { useMatch, useNavigate, Outlet } from 'react-router-dom';

import cn from 'classnames';

import {
  Archived,
  Card,
  ModalWithoutPortal,
  Decentralization,
  FormSearch,
  FiltersCustom,
  ButtonExport,
  ButtonAdd,
  ButtonSetting,
} from '../../components';

import ArchivedKOCs from './ArchivedKOCs';
import FormFilter from './FormFilter';
import Overview from './Overview';
import Table from './Table';
import ImportModal from './ImportModal';

import { useQueryString } from '../../hooks';
import useExport from '../../hooks/Export/useExport';

export default function KOCs() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  // Handle mode add/edit KOC or setting
  const addKOCMatch = useMatch('/kocs/add-koc');
  const isAddMode = useMemo(() => addKOCMatch !== null, [addKOCMatch]);

  const editKOCMatch = useMatch('/kocs/edit-koc/:id');
  const isEditMode = useMemo(() => editKOCMatch !== null, [editKOCMatch]);

  // Handle mode setting
  const settingMatch = useMatch('/kocs/settings');
  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  // Handle mode import
  const importStep1Match = useMatch('/kocs/import/1');
  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );

  const importStep2Match = useMatch('/kocs/import/2');
  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  const [totalKOCs, setTotalKOCs] = useState(0);

  const handleCloseModal = useCallback(() => {
    navigate({
      pathname: '/kocs',
      search: `?${parseQueryString(queryString)}`,
    });
  }, [navigate, parseQueryString, queryString]);

  const openAddModal = useCallback(
    () =>
      navigate({
        pathname: '/kocs/add-koc',
        search: `?${parseQueryString(queryString)}`,
      }),
    [navigate, parseQueryString, queryString],
  );

  const openSettingModal = useCallback(
    () =>
      navigate({
        pathname: '/kocs/settings',
      }),
    [navigate],
  );

  const { handleClickExport, isLoadingExport } = useExport({
    exportedObject: 'kocs',
  });

  return (
    <>
      <Decentralization
        permissions={['user-create', 'user-update', 'user-one', 'setting-list']}
        exact
      >
        <ModalWithoutPortal
          outerClassName={cn(
            !isSettingMode && 'outerModal',
            isSettingMode && 'outerSettingModal',
            isImportStep1Mode && 'outerSettingModal',
            isImportStep2Mode && 'outerDetail',
          )}
          visible={
            isAddMode ||
            isEditMode ||
            isSettingMode ||
            isImportStep1Mode ||
            isImportStep2Mode
          }
          onClose={handleCloseModal}
        >
          <Outlet
            context={{
              onClose: handleCloseModal,
            }}
          />
        </ModalWithoutPortal>
      </Decentralization>

      <div className="d-inline-flex justify-content-between mb-4">
        <div className="d-flex flex-wrap gap-2">
          <Decentralization permissions={['user-create']} exact>
            <ButtonAdd titleButton="Add KOC" handleClickAdd={openAddModal} />
          </Decentralization>

          <Decentralization permissions={['user-create']} exact>
            <ImportModal />
          </Decentralization>
        </div>
        <div>
          <Decentralization permissions={['setting-list']} exact>
            <ButtonSetting
              titleButton="Setting"
              handleClickSetting={openSettingModal}
            />
          </Decentralization>
        </div>
      </div>

      <Decentralization
        permissions={['user-list', 'user-archivist-list', 'user-export']}
      >
        <Card
          title={`${totalKOCs} KOCs`}
          classTitle="title-purple"
          head={
            <>
              <FormSearch placeholder="Search by name or email" />
              <div className="d-flex">
                <FiltersCustom className="me-2">
                  <FormFilter />
                </FiltersCustom>
                <Decentralization permissions={['user-archivist-list']}>
                  <Archived title={'Archived KOCs'}>
                    <ArchivedKOCs />
                  </Archived>
                </Decentralization>
                <Decentralization permissions={['user-export']}>
                  <ButtonExport
                    isLoading={isLoadingExport}
                    handleClickExport={handleClickExport}
                  />
                </Decentralization>
              </div>
            </>
          }
        >
          <Decentralization permissions={['user-summary']}>
            <Overview />
          </Decentralization>

          <Decentralization permissions={['user-list']}>
            <Table setTotal={setTotalKOCs} />
          </Decentralization>
        </Card>
      </Decentralization>
    </>
  );
}

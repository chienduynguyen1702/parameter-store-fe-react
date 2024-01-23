import React, { useMemo, useState } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';

import cn from 'classnames';

import {
  Card,
  Archived,
  FormSearch,
  ModalWithoutPortal,
  FiltersCustom,
  Decentralization,
  ButtonExport,
  ButtonAdd,
  ButtonImport,
  ButtonSetting,
} from '../../components';

import Table from './Table';
import FormFilters from './FormFilters';
import ArchivedLiquidation from './ArchivedLiquidation';

import useQueryString from '../../hooks/useQueryString';
import useExport from '../../hooks/Export/useExport';

export default function Liquidation() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  //------------------Handle model add or edit user------------------------
  const addLiquidationMatch = useMatch('/liquidation/add-liquidation');
  const isAddMode = useMemo(
    () => addLiquidationMatch !== null,
    [addLiquidationMatch],
  );

  const editLiquidationMatch = useMatch('/liquidation/edit-liquidation/:id');
  const isEditMode = useMemo(
    () => editLiquidationMatch !== null,
    [editLiquidationMatch],
  );

  //------------------Handle model import----------------------------------
  const importStep1Match = useMatch('/liquidation/import/1');
  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );

  const importStep2Match = useMatch('/liquidation/import/2');
  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  //------------------Handle model setting----------------------------------
  const settingMatch = useMatch('/liquidation/settings');
  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  const handleCloseModal = () => {
    navigate({
      pathname: '/liquidation',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  const navigateCreate = () => {
    navigate({
      pathname: '/liquidation/add-liquidation',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  const navigateSetting = () => {
    navigate({
      pathname: '/liquidation/settings',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  const navigateImport = () => {
    navigate({
      pathname: '/liquidation/import/1',
    });
  };

  const { isLoadingExport, handleClickExport } = useExport({
    exportedObject: 'liquidations',
  });

  // set View option
  const [viewOption, setViewOption] = useState('View all liquidations');

  const [totalLiquidations, setTotalLiquidations] = useState(0);

  return (
    <>
      <Decentralization
        permissions={[
          'liquidation-one',
          'liquidation-create',
          'liquidation-update',
          'setting-list',
        ]}
        exact
      >
        <ModalWithoutPortal
          outerClassName={cn(
            (isAddMode || isEditMode) && 'outerModal',
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

      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex flex-wrap gap-2">
          <Decentralization permissions={['liquidation-create']} exact>
            <ButtonAdd titleButton="Create" handleClickAdd={navigateCreate} />
          </Decentralization>
          <Decentralization permissions={['liquidation-create']} exact>
            <ButtonImport
              titleButton="Import"
              handleClickImport={navigateImport}
            />
          </Decentralization>
        </div>
        <Decentralization permissions={['setting-list']} exact>
          <ButtonSetting
            titleButton="Setting"
            handleClickSetting={navigateSetting}
          />
        </Decentralization>
      </div>

      <Decentralization permissions={['liquidation']}>
        <Card
          title={`${totalLiquidations} Liquidation Files`}
          classTitle="title-purple"
          classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3 gap-sm-2"
          head={
            <>
              <FormSearch placeholder="Search Liquidation File" />
              <div className="d-flex">
                <Decentralization permissions={['liquidation-me-list']} exact>
                  <button
                    className={`allOrMeButton ${
                      viewOption === 'View all liquidations' ? 'active' : ''
                    } `}
                    onClick={() => setViewOption('View all liquidations')}
                  >
                    All
                  </button>
                  <button
                    className={`allOrMeButton ${
                      viewOption === 'View my liquidations' ? 'active' : ''
                    } me-0 me-md-2`}
                    onClick={() => setViewOption('View my liquidations')}
                  >
                    Me
                  </button>
                </Decentralization>

                <FiltersCustom>
                  <FormFilters />
                </FiltersCustom>
              </div>
              <div className="d-flex">
                <Decentralization
                  permissions={['liquidation-archivist-list']}
                  exact
                >
                  <Archived title={'Archived liquidation'}>
                    <ArchivedLiquidation />
                  </Archived>
                </Decentralization>

                <Decentralization permissions={['user-export']} exact>
                  <ButtonExport
                    isLoading={isLoadingExport}
                    handleClickExport={handleClickExport}
                  />
                </Decentralization>
              </div>
            </>
          }
        >
          <Table setTotal={setTotalLiquidations} viewOption={viewOption} />
        </Card>
      </Decentralization>
    </>
  );
}

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';

import cn from 'classnames';

import {
  Card,
  Archived,
  FormSearch,
  ModalWithoutPortal,
  Decentralization,
  ButtonExport,
} from '../../components';

import Table from './Table';
import ArchivedLiquidationItem from './ArchivedLiquidationItem';
import Overview from './Overview';

import useLiquidationItem from './useLiquidationItem';
import useExport from '../../hooks/Export/useExport';

export default function LiquidationFile() {
  // Handle Mode of Modal (Add, Edit, Setting) and handle navigate
  const {
    isAddMode,
    isEditMode,
    isViewMode,
    isSettingMode,
    isEditFileMode,
    handleCloseModal,
    navigateCreate,
    navigateSetting,
  } = useLiquidationItem();

  const { isLoadingExport, handleClickExport } = useExport({
    exportedObject: 'liquidations-items',
  });

  // count liquidation items
  const [countLiquidation, setCountLiquidation] = useState(0);

  return (
    <div className="min-vh-100">
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
            (isAddMode || isEditMode || isEditFileMode || isViewMode) &&
              'outerModal',
            isSettingMode && 'outerSettingModal',
          )}
          visible={
            isAddMode ||
            isEditMode ||
            isViewMode ||
            isSettingMode ||
            isEditFileMode
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

      <div className="mb-4 d-flex">
        <Decentralization permissions={['liquidation-create']} exact>
          <button className="button-small me-auto" onClick={navigateCreate}>
            <AiOutlinePlus className="fs-5" />
            Add item
          </button>
        </Decentralization>
        <Decentralization permissions={['setting-list']} exact>
          <button
            className="button-small button-white-grey-border"
            onClick={navigateSetting}
          >
            <AiOutlineSetting className="fs-5" />
            Setting
          </button>
        </Decentralization>
      </div>
      <Decentralization permissions={['liquidation']}>
        <Decentralization permissions={['liquidation']}>
          <Overview />
        </Decentralization>
        <Card
          title={`${countLiquidation} Liquidation Items`}
          classTitle="title-purple"
          classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3"
          head={
            <>
              <FormSearch placeholder="Search Liquidation File" />
              <div className="d-flex">
                <Decentralization
                  permissions={['liquidation-archivist-list']}
                  exact
                >
                  <Archived title={'Archived liquidation item'}>
                    <ArchivedLiquidationItem />
                  </Archived>
                </Decentralization>

                <Decentralization permissions={['liquidation-create']} exact>
                  <ButtonExport
                    handleClickExport={handleClickExport}
                    isLoading={isLoadingExport}
                  />
                </Decentralization>
              </div>
            </>
          }
        >
          <Table setCount={setCountLiquidation} />
        </Card>
      </Decentralization>
    </div>
  );
}

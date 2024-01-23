import React, { useState, useMemo } from 'react';
import { useMatch, useNavigate, Outlet } from 'react-router-dom';

import cn from 'classnames';
import styles from './Products.module.sass';

import {
  Archived,
  ButtonAdd,
  ButtonExport,
  ButtonImport,
  ButtonSetting,
  Card,
  FormSearch,
  ModalWithoutPortal,
} from '../../components';

import ProductView from './ProductView';
import Table from './Table';
import Filters from './Table/Filters';
import Decentralization from '../../components/Decentralization';

import useQueryString from '../../hooks/useQueryString';
import ArchivedComponent from './components/ArchivedComponent';
import useExport from '../../hooks/Export/useExport';

export default function Products() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  const settingMatch = useMatch('/products/settings');

  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  const detailMatch = useMatch('/products/product-detail');

  const isDetailMode = useMemo(() => detailMatch !== null, [detailMatch]);

  const importStep1Match = useMatch('/products/import/1');

  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );

  const importStep2Match = useMatch('/products/import/2');

  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  const handleCloseModal = () => {
    navigate({
      pathname: '/products',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  const { handleClickExport, isLoadingExport } = useExport({
    exportedObject: 'products',
  });

  const [countProducts, setCountProducts] = useState(0);

  const [visibleProductView, setVisibleProductView] = useState(false);

  return (
    <>
      <Decentralization permissions={['product-import']} exact>
        <ModalWithoutPortal
          outerClassName={cn(
            !isSettingMode && !isDetailMode && 'outerModal',
            isSettingMode && 'outerSettingModal',
            isDetailMode && styles.outerDetail,
            isImportStep1Mode && 'outerSettingModal',
            isImportStep2Mode && styles.outerDetail,
          )}
          visible={
            isSettingMode ||
            isDetailMode ||
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

      <div className={cn('mb-4 d-flex justify-content-between flex-wrap')}>
        <div className="d-flex flex-wrap gap-2">
          <Decentralization permissions={['product-import']} exact>
            <ButtonAdd
              titleButton="Add Product"
              handleClickAdd={() => {
                setVisibleProductView(true);
              }}
            />
          </Decentralization>
          <Decentralization permissions={['product-import']} exact>
            <ButtonImport
              titleButton="Import Products"
              handleClickImport={() =>
                navigate({
                  pathname: '/products/import/1',
                })
              }
            />
          </Decentralization>
        </div>
        <div>
          <Decentralization permissions={['setting-list']} exact>
            <ButtonSetting
              handleClickSetting={() =>
                navigate({
                  pathname: '/products/settings',
                })
              }
            />
          </Decentralization>
        </div>
      </div>

      <ModalWithoutPortal
        visible={visibleProductView}
        outerClassName={styles.outerClassName}
        onClose={() => {
          setVisibleProductView(false);
        }}
      >
        <ProductView
          key={visibleProductView}
          visibleProduct={visibleProductView}
          setVisibleProductView={setVisibleProductView}
        />
      </ModalWithoutPortal>

      <Card
        title={`${countProducts} Products`}
        classTitle="title-purple"
        classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3"
        head={
          <>
            <FormSearch placeholder="Search by name or code" />
            <div className="d-flex">
              <Filters className="me-2 ml-2 ml-sm-0" title="Filter" />
              <Decentralization permissions={['user-archivist-list']}>
                <Archived title={'Archived Products'}>
                  <ArchivedComponent />
                </Archived>
              </Decentralization>
              <Decentralization permissions={['product-export']}>
                <ButtonExport
                  handleClickExport={handleClickExport}
                  isLoading={isLoadingExport}
                />
              </Decentralization>
            </div>
          </>
        }
      >
        <Decentralization permissions={['product-list']} exact>
          <Table
            setCountProducts={setCountProducts}
            setVisibleProductView={setVisibleProductView}
          />
        </Decentralization>
      </Card>
    </>
  );
}

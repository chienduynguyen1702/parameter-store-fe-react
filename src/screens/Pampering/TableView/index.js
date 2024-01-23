import { Outlet, useMatch, useNavigate } from 'react-router';
import { useCallback, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import cn from 'classnames';

import {
  Archived,
  ButtonAdd,
  ButtonExport,
  ButtonImport,
  ButtonSetting,
  Card,
  Decentralization,
  FiltersCustom,
  FormSearch,
  ModalWithoutPortal,
} from '../../../components';

import ArchivedPamperings from '../components/ArchivedPamperings';
import Table from './Table';
import FormFilter from './FormFilter';

import { dateToUrl, exportExcel } from '../../../utils/helpers';
import { exportPamperings } from '../../../services/api';

import useQueryString from '../../../hooks/useQueryString';

export default function PamperingTableView() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  const [total, setTotal] = useState(0);

  // Switch between add pampering, edit pampering and setting
  const addPamperingMatch = useMatch('/pamperings/table-view/add-pampering');
  const isAddMode = useMemo(
    () => addPamperingMatch !== null,
    [addPamperingMatch],
  );

  const editPamperingMatch = useMatch(
    '/pamperings/table-view/edit-pampering/:id',
  );
  const isEditMode = useMemo(
    () => editPamperingMatch !== null,
    [editPamperingMatch],
  );

  const settingMatch = useMatch('/pamperings/table-view/settings');
  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  const evidenceMatch = useMatch('/pamperings/table-view/select-evidence/:id');
  const isEvidenceMode = useMemo(() => evidenceMatch !== null, [evidenceMatch]);

  // Handle import
  const importStep1Match = useMatch('/pamperings/table-view/import/1');
  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );

  const importStep2Match = useMatch('/pamperings/table-view/import/2');
  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  // Close modal
  const handleCloseModal = () => {
    navigate({
      pathname: '/pamperings/table-view',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  //handle export
  const exportMutation = useMutation((query) => exportPamperings(query));

  const handleClickExport = useCallback(() => {
    exportMutation.mutate(queryString, {
      onSuccess: (data) => {
        const parseDate = data.data.data?.map((data) => ({
          ...data,
          Date: dateToUrl(new Date(data?.Date)),
        }));
        exportExcel(parseDate, 'Pamperings');
      },
    });
  }, [exportMutation, queryString]);

  return (
    <>
      <Decentralization permissions={['user-create', 'user-update']} exact>
        <ModalWithoutPortal
          outerClassName={cn(
            isAddMode && 'outerModal',
            isEditMode && 'outerModal',
            isEvidenceMode && 'outerSettingModal',
            isSettingMode && 'outerSettingModal',
            isImportStep1Mode && 'outerSettingModal',
            isImportStep2Mode && 'outerDetail',
          )}
          visible={
            isAddMode ||
            isEditMode ||
            isSettingMode ||
            isEvidenceMode ||
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
      {/* Add pampering and setting */}
      <div className="d-inline-flex justify-content-between mb-4">
        <div className="d-flex flex-wrap gap-2">
          <Decentralization permissions={['user-create']} exact>
            <ButtonAdd
              titleButton="Create"
              handleClickAdd={() =>
                navigate({
                  pathname: '/pamperings/table-view/add-pampering',
                  search: `?${parseQueryString(queryString)}`,
                })
              }
            />
          </Decentralization>
          <Decentralization permissions={['user-create']} exact>
            <ButtonImport
              titleButton="Import"
              handleClickImport={() =>
                navigate({
                  pathname: '/pamperings/table-view/import/1',
                })
              }
            />
          </Decentralization>
        </div>
        {/* Setting  */}
        <Decentralization permissions={['setting-list']} exact>
          <ButtonSetting
            titleButton="Setting"
            handleClickSetting={() =>
              navigate({
                pathname: '/pamperings/table-view/settings',
              })
            }
          />
        </Decentralization>
      </div>
      <Card
        title={`${total} Pampering`}
        classTitle="title-purple"
        classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3 gap-sm-2"
        head={
          <>
            <FormSearch placeholder="Search pampering" />
            <div className="d-flex">
              <FiltersCustom className="me-2">
                <FormFilter />
              </FiltersCustom>
              <Decentralization permissions={['user-archivist-list']}>
                <Archived title={'Archived Pamperings'}>
                  <ArchivedPamperings />
                </Archived>
              </Decentralization>
              <Decentralization permissions={['user-export']}>
                <ButtonExport
                  isLoading={exportMutation.isLoading}
                  handleClickExport={handleClickExport}
                />
              </Decentralization>
            </div>
          </>
        }
      >
        <Table setTotal={setTotal} />
      </Card>
    </>
  );
}

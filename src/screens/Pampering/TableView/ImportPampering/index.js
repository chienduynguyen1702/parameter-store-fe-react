import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { ImportStepOne, ImportStepTwo } from '../../../../components';
import NewSettingsModal from './NewSettingModal';
import Table from './Table';

import { useImportPampering } from '../../../../hooks/Import';
import {
  useSettingsMutation,
  useSettingsPampering,
} from '../../../../hooks/Setting';

const listColumnName = [
  'date',
  'name',
  'category',
  'cost',
  'pic',
  'status',
  'evidence_url',
];

function ImportPampering() {
  const navigate = useNavigate();

  // Catch url import step 1 and 2
  const importStep1Match = useMatch('/pamperings/table-view/import/1');
  const importStep2Match = useMatch('/pamperings/table-view/import/2');

  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );
  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  // Query import pampering
  const { importPamperingsMutation } = useImportPampering();

  // Store data import
  const [data, setData] = useState(null);

  // Store data new Settings
  const [newSettings, setNewSettings] = useState({});

  // Handle setting modal
  const [isSettingMode, setIsSettingMode] = useState(false);

  // Handle state of adding new setting success
  const [addSettingSuccess, setAddSettingSuccess] = useState(false);

  // Query settings
  const { pamperingPICs, pamperingCategories, pamperingStatus } =
    useSettingsPampering();

  const { addListSettingsMutation } = useSettingsMutation();

  // Check new settings
  const checkNewSettings = useCallback(
    (data) => {
      const newPic = [];
      const newStatus = [];
      const newCategory = [];
      data?.forEach((item) => {
        const dataPic = item.pic;
        const dataStatus = item.status?.split(', ').filter(Boolean);
        const dataCategory = item.category;

        if (
          !pamperingPICs?.data.some(
            (pamperingPic) => pamperingPic.name === dataPic,
          ) &&
          !newPic.includes(dataPic) &&
          dataPic
        ) {
          newPic.push(dataPic);
        }

        if (dataStatus) {
          dataStatus.forEach((dataStatus) => {
            if (
              !pamperingStatus?.data.some(
                (pamperingStatus) => pamperingStatus.name === dataStatus,
              ) &&
              !newStatus.includes(dataStatus) &&
              dataStatus
            ) {
              newStatus.push(dataStatus);
            }
          });
        }

        if (
          !pamperingCategories?.data.some(
            (pamperingCategory) => pamperingCategory.name === dataCategory,
          ) &&
          !newCategory.includes(dataCategory) &&
          dataCategory
        ) {
          newCategory.push(dataCategory);
        }
      });

      if (newPic.length > 0 || newStatus.length > 0 || newCategory.length > 0) {
        toast.warning(`Please add new settings`);
        return {
          newPic: newPic,
          newStatus: newStatus,
          newCategory: newCategory,
        };
      }

      return {};
    },
    [pamperingPICs, pamperingCategories, pamperingStatus],
  );

  // Format data with adding setting
  const formatDataWithSetting = useCallback(
    (setting) => {
      return setting?.map((item) => {
        if (typeof item.pic === 'string') {
          item.pic = pamperingPICs?.data?.find((pic) => pic.name === item.pic);
        }

        if (typeof item.category === 'string') {
          item.category = pamperingCategories?.data?.find(
            (category) => category.name === item.category,
          );
        }

        if (typeof item.status === 'string') {
          item.status = pamperingStatus?.data?.find(
            (status) => status.name === item.status,
          );
        }

        return item;
      });
    },
    [pamperingPICs, pamperingCategories, pamperingStatus],
  );

  // Check if have new settings then show modal add settings
  // else update data with settings and navigate to step 2
  const handleNewSettings = useCallback(
    (result) => {
      // Check new type and category and open settings modal if have new type or category
      const newSettings = checkNewSettings(result);

      if (newSettings !== {} && !addSettingSuccess) {
        if (
          newSettings?.newPic?.length > 0 ||
          newSettings?.newStatus?.length > 0 ||
          newSettings?.newCategory?.length > 0
        ) {
          setIsSettingMode(true);
          setNewSettings(newSettings);
          return;
        }
      }

      // set data and navigate to step 2
      setData(formatDataWithSetting(result));

      navigate('/pamperings/table-view/import/2');
    },
    [addSettingSuccess, navigate, checkNewSettings, formatDataWithSetting],
  );

  // Handle import data
  const handleImport = useCallback(() => {
    importPamperingsMutation.mutate(data);
  }, [data, importPamperingsMutation]);

  return (
    <>
      {isImportStep1Mode && (
        <ImportStepOne
          title="Import Pamperings"
          data={data}
          setData={setData}
          listColumn={listColumnName}
          module="pampering"
          handleNewSettings={(setting) => handleNewSettings(setting)}
          isSettingMode={isSettingMode}
          setIsSettingMode={setIsSettingMode}
          navigateCancel="/pamperings/table-view"
        >
          <NewSettingsModal
            addListSettingsMutation={addListSettingsMutation}
            handleCloseModal={() => setIsSettingMode(false)}
            data={newSettings}
            addSettingSuccess={() => setAddSettingSuccess(true)}
          />
        </ImportStepOne>
      )}
      {isImportStep2Mode && (
        <ImportStepTwo
          title="Import Pamperings"
          data={data}
          handleImport={handleImport}
          mainPath="/pamperings/table-view"
          importPath="/pamperings/table-view/import/1"
          isLoading={importPamperingsMutation.isLoading}
        >
          <Table />
        </ImportStepTwo>
      )}
    </>
  );
}

export default ImportPampering;

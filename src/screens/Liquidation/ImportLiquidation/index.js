import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router';

import Table from './Table';
import NewSettingsModal from './NewSettingModal';
import { ImportStepOne, ImportStepTwo } from '../../../components';

import { useImportLiquidations } from '../../../hooks/Import';

export const LIQUIDATION_COLUMN_NAME = [
  'name',
  'from',
  'to',
  'category',
  'receiver',
  'status',
  'cost',
  'pic',
];

export default function ImportLiquidation() {
  const title = 'Import Liquidation';
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // Handle import step 1 and step 2
  const importStep1Match = useMatch('/liquidation/import/1');
  const importStep2Match = useMatch('/liquidation/import/2');
  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );
  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  const {
    listCategory,
    listPIC,
    listStatus,
    addListSettingsMutation,
    importLiquidationsMutation,
  } = useImportLiquidations();

  // Handle setting modal
  const [isSettingMode, setIsSettingMode] = useState(false);

  // Store data new Settings
  const [newSettings, setNewSettings] = useState({});

  // Handle add new setting success
  const [addSettingSuccess, setAddSettingSuccess] = useState(false);

  // Check new type and category
  const checkNewSettings = (data) => {
    const newCategory = [];
    const newStatus = [];
    const newPIC = [];
    data?.forEach((item) => {
      const dataCategory = item.category;
      const dataStatus = item.status;
      const dataPIC = item.pic;

      if (
        !listCategory?.data.some(
          (liquidationCategory) => liquidationCategory.name === dataCategory,
        ) &&
        !newCategory.includes(dataCategory) &&
        dataCategory
      ) {
        newCategory.push(dataCategory);
      }

      if (
        !listStatus?.data.some(
          (liquidationStatus) => liquidationStatus.name === dataStatus,
        ) &&
        !newStatus.includes(dataStatus) &&
        dataStatus
      ) {
        newStatus.push(dataStatus);
      }

      if (
        !listPIC?.data.some(
          (liquidationPIC) => liquidationPIC.name === dataPIC,
        ) &&
        !newPIC.includes(dataPIC) &&
        dataPIC
      ) {
        newPIC.push(dataPIC);
      }
    });

    if (newCategory.length > 0 || newStatus.length > 0 || newPIC.length > 0) {
      toast.warning(`Please add new settings`);
      return {
        newCategory: newCategory,
        newStatus: newStatus,
        newPIC: newPIC,
      };
    }

    return {};
  };

  // Format data with adding setting type and category
  const formatDataWithSetting = (data) => {
    return data?.map((item) => {
      if (typeof item.category === 'string') {
        item.category = listCategory?.data?.find(
          (liquidationCategory) => liquidationCategory.name === item.category,
        );
      }

      if (typeof item.status === 'string') {
        item.status = listStatus?.data?.find(
          (liquidationStatus) => liquidationStatus.name === item.status,
        );
      }

      if (typeof item.pic === 'string') {
        item.pic = listPIC?.data?.find(
          (liquidationPIC) => liquidationPIC.name === item.pic,
        );
      }

      return item;
    });
  };

  const handleNewSettings = (result) => {
    // Check new type and category and open settings modal if have new type or category
    const newSettings = checkNewSettings(result);

    if (newSettings !== {} && !addSettingSuccess) {
      if (
        newSettings?.newCategory?.length > 0 ||
        newSettings?.newStatus?.length > 0 ||
        newSettings?.newPIC?.length > 0
      ) {
        setIsSettingMode(true);
        setNewSettings(newSettings);
        return;
      }
    }

    // set data and navigate to step 2
    setData(formatDataWithSetting(result));
    navigate('/liquidation/import/2');
  };

  const handleImport = () => {
    // Import and back to main product screen
    importLiquidationsMutation.mutate(data, {
      onSuccess: () => {
        navigate('/liquidation');
      },
    });
  };

  return (
    <>
      {isImportStep1Mode && (
        <ImportStepOne
          title={title}
          data={data}
          setData={setData}
          listColumn={LIQUIDATION_COLUMN_NAME}
          module="liquidations"
          handleNewSettings={(data) => handleNewSettings(data)}
          isSettingMode={isSettingMode}
          setIsSettingMode={setIsSettingMode}
          navigateCancel="/liquidation"
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
          title={title}
          data={data}
          handleImport={handleImport}
          mainPath="/liquidation"
          importPath="/liquidation/import/1"
          isLoading={importLiquidationsMutation.isLoading}
        >
          <Table />
        </ImportStepTwo>
      )}
    </>
  );
}

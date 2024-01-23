import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { ImportStepOne, ImportStepTwo } from '../../../components';
import NewSettingsModal from './NewSettingModal';
import Table from './Table';
import {
  useSettingsMutation,
  useSettingsProduct,
} from '../../../hooks/Setting';
import { useImportProducts } from '../../../hooks/Import';

import { useQueryClient } from '@tanstack/react-query';

const listColumnName = [
  'sku code',
  'platform',
  'title',
  'description',
  'image url',
  'full price',
  'current price',
  'discounted rate',
  'type',
  'category',
];

const title = 'Import Products';

function ImportProduct() {
  const navigate = useNavigate();
  const importStep1Match = useMatch('/products/import/1');
  const importStep2Match = useMatch('/products/import/2');
  const [data, setData] = useState(null);
  const [mounted, setMounted] = useState(true); // Add a state to track if the component is mounted

  const queryClient = useQueryClient();

  const isImportStep1Mode = useMemo(
    () => importStep1Match !== null,
    [importStep1Match],
  );

  const isImportStep2Mode = useMemo(
    () => importStep2Match !== null,
    [importStep2Match],
  );

  const { productTypes, productCategories } = useSettingsProduct();

  const { addListSettingsMutation } = useSettingsMutation();

  const { importProductsMutation } = useImportProducts();

  // Handle setting modal
  const [isSettingMode, setIsSettingMode] = useState(false);

  // Store data new Settings
  const [newSettings, setNewSettings] = useState({});

  // Handle add new setting success
  const [addSettingSuccess, setAddSettingSuccess] = useState(false);

  // Check new type and category
  const checkNewSettings = (data) => {
    const newType = [];
    const newCategory = [];
    data?.forEach((item) => {
      const dataType = item.type;
      const dataCategory = item.category;

      const checkExistType = productTypes?.data?.find(
        (productType) => productType.name === dataType,
      );
      const checkExistCategories = productCategories?.data?.find(
        (productCategory) => productCategory.name === dataCategory,
      );

      if (!checkExistType && !newType.includes(dataType)) {
        newType.push(dataType);
      }
      if (!checkExistCategories && !newCategory.includes(dataCategory)) {
        newCategory.push(dataCategory);
      }
    });

    if (newType && newCategory) {
      if (newType.length > 0 || newCategory.length > 0) {
        toast.warning(
          `Please add new${newType.length > 0 ? ' type' : ''}${
            newType.length > 0 && newCategory.length > 0 ? ' and' : ''
          } ${newCategory.length > 0 ? ' category' : ''}`,
        );
        return {
          newType: newType,
          newCategory: newCategory,
        };
      }
    }
    return {};
  };

  // Format data with adding setting type and category
  const formatDataWithSetting = (data) => {
    data?.map((item) => {
      item.shop = item.platform;
      return (({ platform, ...item }) => item)(item);
    });
    return data?.map((item) => {
      item.shop = item.platform;
      item.type = productTypes?.data?.find(
        (productType) => productType.name === item.type,
      );
      item.category = productCategories?.data?.find(
        (productCategory) => productCategory.name === item.category,
      );
      return (({ platform, ...item }) => item)(item);
    });
  };

  const handleNewSettings = (result) => {
    // Check new type and category and open settings modal if have new type or category
    const newSettings = checkNewSettings(result);

    if (newSettings !== {} && !addSettingSuccess) {
      if (
        newSettings?.newType?.length > 0 ||
        newSettings?.newCategory?.length > 0
      ) {
        setIsSettingMode(true);
        setNewSettings(newSettings);
        return;
      }
    }

    // set data and navigate to step 2
    setData(formatDataWithSetting(result));
    navigate('/products/import/2');
  };

  const handleImport = () => {
    // Import and back to main product screen
    importProductsMutation.mutate(data, {
      onSuccess: () => {
        if (mounted) {
          // Check if the component is still mounted before updating state
          queryClient.invalidateQueries('list-products-sku');
          navigate('/products');
        }
      },
    });
  };

  // Cleanup function to cancel the mutation when the component is unmounted
  useEffect(() => {
    return () => {
      setMounted(false); // Set mounted to false when the component is unmounted
      // Ensure the mutation is reset when the component is unmounted
      importProductsMutation.reset();
    };
  }, []);

  return (
    <>
      {isImportStep1Mode && (
        <ImportStepOne
          title={title}
          data={data}
          setData={setData}
          listColumn={listColumnName}
          module="products"
          handleNewSettings={(data) => handleNewSettings(data)}
          isSettingMode={isSettingMode}
          setIsSettingMode={setIsSettingMode}
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
          data={data}
          title={title}
          handleImport={handleImport}
          mainPath="/products"
          importPath="/products/import/1"
        >
          <Table />
        </ImportStepTwo>
      )}
    </>
  );
}

export default ImportProduct;

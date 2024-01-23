import { ImportPreview } from '../../../../../../components';
import Table from './Table';
import { useContext, useEffect, useState } from 'react';
import { ImportContext } from '../..';

const ImportPreviewContents = ({ data, goBack, cancelModal }) => {
  const { handleImport, isImportLoading } = useContext(ImportContext);

  const [successData, setSuccessData] = useState([]);
  const [failedData, setFailedData] = useState([]);

  useEffect(() => {
    data?.map((content) => {
      let isError = false;
      let errorMessages = [];
      const { product_sku, product_name, video_id, ...others } = content;

      if (video_id === null || isNaN(video_id) || video_id === '') {
        isError = true;
        errorMessages.push(`Video ID is not a number`);
      }

      if (product_sku === null || product_sku === '') {
        isError = true;
        errorMessages.push(`Product SKU is required`);
      }

      if (product_name === null || product_name === '') {
        isError = true;
        errorMessages.push(`Product Name is required`);
      }

      const productSku = product_sku?.split(',');
      const productName = product_name?.split(',');

      if (productSku?.length !== productName?.length) {
        isError = true;
        errorMessages.push(
          `Product SKU and Product name must have the same number of items`,
        );
      }

      const checkNotNullOrNaN = {
        ...others,
      };

      Object.keys(checkNotNullOrNaN).map((key) => {
        if (checkNotNullOrNaN[key] !== null) {
          if (isNaN(checkNotNullOrNaN[key])) {
            isError = true;
            errorMessages.push(`${key} is not a number`);
          }
        }
        return null;
      });
      if (isError)
        setFailedData((prev) => [...prev, { ...content, errorMessages }]);
      else setSuccessData((prev) => [...prev, content]);

      return null;
    });
  }, [data]);

  // const handleImport = async () => {
  //   cancelModal();
  //   setIsImporting(true);
  //   await importContentsMutation.mutateAsync(data, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('contents');
  //       toast.success('Import contents successfully');
  //       setIsImporting(false);
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   });
  // };

  const handleFailedRowDownload = (data) => {
    const result = data.map((row) => {
      return {
        'Video ID': row.video_id,
        'Products SKU': row.product_sku,
        'Products Name': row.product_name,
        // 'Product Impressions': row.product_impressions,
        // 'Product Clicks': row.product_clicks,
        // CTR: row.ctr,
        'Video Revenue': row.video_revenue,
        'Unit Sales': row.unit_sales,
        Orders: row.orders,
        Buyers: row.buyers,
        'Est. commission': row.est_commission,
        Refunds: row.refunds,
        'Product refunds': row.product_refunds,
        // 'CO rate': row.co_rate,
        // VV: row.vv,
        'Error Messages': row.errorMessages.join(', '),
      };
    });

    return result;
  };

  return (
    <ImportPreview
      title="Import Content"
      successData={successData}
      failedData={failedData}
      isImportLoading={isImportLoading}
      handleImport={() => handleImport(successData)}
      handleFailedRowDownload={() => handleFailedRowDownload(failedData)}
      cancelModal={cancelModal}
      goBack={goBack}
    >
      <Table />
    </ImportPreview>
  );
};

export default ImportPreviewContents;

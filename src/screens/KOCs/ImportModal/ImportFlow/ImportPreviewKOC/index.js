import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { importUsers, testImportUsers } from '../../../../../services/api';

import { ImportPreviewWithTestAPI } from '../../../../../components';
import Table from './Table';

const ImportPreviewKOC = ({ data, goBack, cancelModal }) => {
  const [successData, setSuccessData] = useState([]);
  const [failedData, setFailedData] = useState([]);
  const [isTestLoading, setIsTestLoading] = useState(false);

  const queryClient = useQueryClient();

  const testImportMutation = useMutation(async (d) => {
    return testImportUsers(d);
  });

  const importUsersMutation = useMutation((data) => importUsers(data));

  const removeNullUndefinedFields = (obj) => {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
  };

  useEffect(() => {
    const updatedData = data.map((item, key) => {
      const newItem = {
        ...item,
        username: String(item?.username).trim()?.replace('@', ''),
        platforms: ['TikTok'],
        // Object.keys(item.platform ?? {})?.filter(
        //   (platformName) => item.platform[platformName] === true,
        // ) ?? [],
        is_koc: true,
      };

      newItem.platforms.forEach((platform) => {
        const platformName = platform?.toLowerCase();

        const platformHashtagKey = `${platformName}_hashtags`;
        newItem[platformHashtagKey] = newItem.hashtag
          ?.split(/[, ]+/)
          .filter(Boolean)
          .map((item) => item.replace('#', ''));
      });

      delete newItem.platform;
      delete newItem.hashtag;

      console.log(removeNullUndefinedFields(newItem));

      return removeNullUndefinedFields(newItem);
    });

    const batchSize = 50;
    const totalData = updatedData.length;
    let currentIndex = 0;
    setSuccessData([]);
    setFailedData([]);

    const processBatch = () => {
      const endIndex = Math.min(currentIndex + batchSize, totalData);
      const currentBatch = updatedData.slice(currentIndex, endIndex);

      if (currentBatch.length > 0) {
        setIsTestLoading(true); // Bắt đầu xử lý

        testImportMutation.mutate(currentBatch, {
          onSuccess: (res) => {
            setSuccessData((prev) => [...prev, ...res.data.data.successData]);
            setFailedData((prev) => [...prev, ...res.data.data.failedData]);
            currentIndex += batchSize;
            processBatch(); // Gọi đệ quy để xử lý batch tiếp theo
          },
          onError: (error) => {
            toast.error(error.response.data.message || error.message);
            setIsTestLoading(false); // Kết thúc xử lý
            setSuccessData([]);
            setFailedData([]);
          },
        });
      } else {
        setIsTestLoading(false); // Kết thúc xử lý
      }
    };

    processBatch();
  }, []);

  const handleImport = () => {
    importUsersMutation.mutate(successData, {
      onSuccess: (res) => {
        queryClient.invalidateQueries('KOCs');
        if (res.data.data?.successData?.length > 0) {
          toast.success('Import users successfully');
          cancelModal();
        } else {
          toast.error('Import users failed');
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleFailedRowDownload = () => {
    const result = failedData.map((row) => {
      return {
        Username: row.username,
        Email: row.email,
        Platforms: row.platforms,
        'TikTok ID': row.tiktok_id,
        'Instagram ID': row.instagram_id,
        Hashtag: row?.tiktok_hashtags?.map((tag) => '#' + tag)?.join(','),
        Address: row.address,
        Phone: row.phone,
        Category: row.category,
        Tier: row.tier,
        'Date of birth': row.date_of_birth,
        Message: row.failed_message,
      };
    });

    return result;
  };

  return (
    <ImportPreviewWithTestAPI
      title="Import KOCs"
      successData={successData}
      failedData={failedData}
      isTestLoading={isTestLoading}
      isImportLoading={importUsersMutation.isLoading}
      handleImport={handleImport}
      handleFailedRowDownload={handleFailedRowDownload}
      cancelModal={cancelModal}
      goBack={goBack}
    >
      <Table />
    </ImportPreviewWithTestAPI>
  );
};

export default ImportPreviewKOC;

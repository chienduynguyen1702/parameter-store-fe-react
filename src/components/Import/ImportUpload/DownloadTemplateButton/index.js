import { useCallback } from 'react';
import { Stack } from 'react-bootstrap';
import { BiImport } from 'react-icons/bi';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import cn from 'classnames';

import users from '../../../../utils/json/users.json';
import products from '../../../../utils/json/products.json';
import liquidations from '../../../../utils/json/liquidations.json';
import pamperings from '../../../../utils/json/pamperings.json';
import orders from '../../../../utils/json/orders.json';
import contents from '../../../../utils/json/contents.json';

import { exportExcel } from '../../../../utils/helpers';

const TEMPLATE_LIST = {
  users: {
    data: users,
    name: 'KOCs Template',
  },
  products: {
    data: products,
    name: 'Products Template',
  },
  liquidations: {
    data: liquidations,
    name: 'Liquidations Template',
  },
  pampering: {
    data: pamperings,
    name: 'Pampering Template',
  },
  orders: {
    data: orders,
    name: 'Orders Template',
  },
  contents: {
    data: contents,
    name: 'Contents Template',
  }
};
// Header: 2 rows
export const exportToExcel = (arr, filename) => {
  const Heading = [
    [
      'Username',
      'Email',
      'Platforms',
      '',
      '',
      '',
      'TikTok ID',
      'Instagram ID',
      'Hashtag',
      'Address',
      'Phone',
      'Category',
      'Tier',
      'Date of birth',
    ],
    [
      '',
      '',
      'TikTok',
      'Instagram',
      'Facebook',
      'Youtube',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(Heading); // Add remaining headers

  // Merge cells for the header sections
  ws['!merges'] = [
    { s: { r: 0, c: 2 }, e: { r: 0, c: 5 } }, // Merge Platform
  ];

  const dataRows = arr.map((item) => {
    const row = [];
    row.push(item.Username);
    row.push(item.Email);

    for (const platform of ['TikTok', 'Instagram', 'Facebook', 'Youtube']) {
      const hasPlatform = item.Platforms.find((item) => item === platform);
      row.push(hasPlatform ? true : '');
    }

    row.push(item['TikTok ID'] || '');
    row.push(item['Instagram ID'] || '');
    row.push(item.Hashtag || '');
    row.push(item?.Address);
    row.push(item?.Phone);
    row.push(item?.Category);
    row.push(item?.Tier);
    row.push(item['Date of Birth']);
    row.push(item['Message']);

    return row;
  });

  XLSX.utils.sheet_add_aoa(ws, dataRows, { origin: 'A3' });

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
};

export default function DownloadTemplateButton({ module }) {
  const handleClickExport = useCallback(() => {
    const template = TEMPLATE_LIST[module];
    if (template?.data && template?.name && module !== 'users')
      exportExcel(template.data, template.name);
    if (module === 'users') exportToExcel(template.data, template.name);
  }, [module]);

  return (
    <Stack className="mt-4 mb-4" direction="horizontal" gap={3}>
      <button
        className={cn('button ms-auto w-100')}
        onClick={handleClickExport}
      >
        Download template (XLSX)
        <BiImport className="fs-5 mb-1 ms-2" />
      </button>
    </Stack>
  );
}

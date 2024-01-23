import { useCallback } from 'react';
import { Stack } from 'react-bootstrap';
import { BiImport } from 'react-icons/bi';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import cn from 'classnames';
import styles from '../ImportFlow.module.sass';

import users from '../../../utils/json/users.json';
import products from '../../../utils/json/products.json';
import liquidations from '../../../utils/json/liquidations.json';
import pamperings from '../../../utils/json/pamperings.json';

import { exportExcel } from '../../../utils/helpers';

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
};

const exportToExcel = (arr, filename) => {
  const Heading = [
    [
      'Username',
      'Email',
      'Platform',
      '',
      '',
      '',
      'ID Account',
      'Hashtag',
      'Address',
      'Phone',
      'Category',
      'Tier',
      'Date of birth',
      'Note',
    ],
    [
      '',
      '',
      'TikTok',
      'Instagram',
      'Youtube',
      'Facebook',
      '',
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

    for (const platform of ['TikTok', 'Instagram', 'Youtube', 'Facebook']) {
      row.push(item.Platforms[platform] || '');
    }

    row.push(item['ID Account'] || '');
    row.push(item.Hashtag || '');
    row.push(item.Address);
    row.push(item.Phone);
    row.push(item.Category);
    row.push(item.Tier);
    row.push(item['Date of Birth']);
    row.push(item.Note);

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
  // export to Excel
  const handleClickExport = useCallback(() => {
    const template = TEMPLATE_LIST[module];
    if (module === 'users') {
      exportToExcel(template.data, template.name);
    } else exportExcel(template.data, template.name);
  }, [module]);

  return (
    <Stack className="mt-4 mb-4" direction="horizontal" gap={3}>
      <button
        className={cn('button ms-auto', styles.downloadBtn)}
        onClick={handleClickExport}
      >
        Download template (XLSX)
        <BiImport className={cn(styles.icon, styles.iconDownload)} />
      </button>
    </Stack>
  );
}

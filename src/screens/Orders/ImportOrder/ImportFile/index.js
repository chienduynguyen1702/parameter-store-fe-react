import { Stack } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { BiImport } from 'react-icons/bi';

import RHFFile from './RHFFile';
import ConfirmField from './ConfirmField';

import dataOrdersTemplate from '../../../../utils/json/orders.json';
import { exportExcel } from '../../../../utils/helpers';
import { useCallback, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UploadOrdersSchema } from '../../../../utils/ValidateSchema';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const listColumnName = [
  'order_name',
  'phone_number',
  'city',
  'address',
  'order_date',
  'amount',
  'transport_fee',
  'delivery_code',
  'koc_name',
  'platform',
  'status',
  'item_sku',
  'total_price',
  'type',
];

export default function ImportFile({ setData, goNextStep }) {
  const navigate = useNavigate();

  const [excelData, setExcelData] = useState([]);
  const [titleExcel, setTitleExcel] = useState();

  const defaultValues = useMemo(() => {
    return titleExcel?.[0].map((item) => {
      if (listColumnName.includes(item.toLowerCase().replace(/ /g, '_')))
        return item.toLowerCase().replace(/ /g, '_');
      return 'Not Known';
    });
  }, [titleExcel]);

  const handlePreview = (formData) => {
    // get index of listColumnName in formData
    const listNameAttribute = [];
    for (const [, value] of Object.entries(formData)) {
      if (listColumnName.includes(value)) {
        listNameAttribute.push(listColumnName.indexOf(value));
      }
    }

    // check listNameAttribute have all values in (0,1,2,3,4,5,6,7,8,9,10,11,12)
    const exist = {};
    for (var i = 0; i < listNameAttribute.length; i++) {
      exist[listNameAttribute[i]] = true;
    }

    let isFull = true;
    for (let i = 0; i <= 12; i++) {
      if (!exist[i]) {
        isFull = false;
        break;
      }
    }

    // check listNameAttribute have duplicate number
    const isNotDuplicate = listNameAttribute.every(
      (item, index) => listNameAttribute.indexOf(item) === index,
    );

    if (!isFull || !isNotDuplicate) {
      if (!isFull) toast.error('Please select all required fields');
      if (!isNotDuplicate)
        toast.error('Some fields are duplicated, please check again');
      return;
    }

    const data = excelData.map((item) => {
      const order = {};
      listColumnName.forEach((i, index) => {
        order[i] = item[listNameAttribute[index]];
      });
      return order;
    });
    setData(data);
    goNextStep();
    return;
  };

  const handleClickExport = useCallback(() => {
    exportExcel(dataOrdersTemplate, 'Orders Template');
  }, []);

  const method = useForm({
    resolver: yupResolver(UploadOrdersSchema(13)),
  });

  return (
    <div className="">
      <Stack className="mt-4 mb-4" direction="horizontal" gap={3}>
        <button className="button ms-auto w-100" onClick={handleClickExport}>
          Download template (XLSX)
          <BiImport className="fs-5 mb-1 ms-2" />
        </button>
      </Stack>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handlePreview)}>
          <RHFFile
            name="upload"
            label="Upload"
            tooltip="Upload file (CSV or XLSX)"
            title="Click or drop file (CSV or XLSX)"
            className="mb-1"
            setData={setExcelData}
            setTitleExcel={setTitleExcel}
          />

          {titleExcel?.[0] && (
            <ConfirmField
              label="Confirm Field"
              tooltip="select the respective field"
              excelColumnName={titleExcel?.[0]}
              defaultValues={defaultValues}
              listColumnName={[...listColumnName, 'Not Known']}
            />
          )}

          <Stack className="mt-4" direction="horizontal" gap={3}>
            <p className="button-white" onClick={() => navigate('/orders')}>
              Cancel
            </p>
            <button className="button ms-auto">Preview</button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}

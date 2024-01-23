import { useNavigate } from 'react-router';
import { Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';

import cn from 'classnames';
import styles from './ImportOrder.module.sass';

import Table from './Table';
import {
  AsyncButton,
  Card,
  Icon,
  ModalWithoutPortal,
  Tooltip,
} from '../../../../components';

import { exportExcel } from '../../../../utils/helpers';

import useImportOrders from './useImportOrders';
import moment from 'moment';
import { useState } from 'react';

export default function PreviewData({ data, goPrevStep }) {
  const navigate = useNavigate();
  const { importOrdersMutation } = useImportOrders();

  const [failuresModal, setFailuresModal] = useState(false);
  const [failuresData, setFailuresData] = useState();

  const handleImport = () => {
    importOrdersMutation.mutate(
      data.map((item) => {
        return {
          ...item,
          amount: Number(item.amount),
          total_price: Number(item.total_price),
          transport_fee: Number(item.transport_fee),
          order_date: moment(item.order_date).format('YYYY-MM-DD'),
        };
      }),
      {
        onSuccess: (data) => {
          if (data.data.data.length !== 0) {
            setFailuresModal(true);
            setFailuresData(data.data.data);
          } else {
            navigate('/orders');
          }
        },
      },
    );
  };

  const handleDownloadFailureData = () => {
    exportExcel(failuresData, 'Failure Data Import Orders');
    toast.success('Download Success');
    navigate('/orders');
  };
  return (
    <>
      <ModalWithoutPortal visible={failuresModal}>
        <Card
          className={cn(styles.rounded)}
          title="Import Report"
          classTitle="title-red"
        >
          <div className={styles.newType}>
            <div className={styles.titleNewType}>
              Warning{' '}
              <Tooltip
                className={styles.tooltip}
                title="Download failures data"
                icon="info"
                place="right"
              />
            </div>
            <div className={styles.warningContent}>
              <p>
                <i>Import successfully</i>
              </p>
              <i>But there are some failures in the system</i>
            </div>
          </div>
          <Stack className="mt-4" direction="horizontal" gap={3}>
            <p
              className={cn('button-white ms-auto')}
              onClick={() => navigate('/orders')}
            >
              Cancel
            </p>
            <button className="button" onClick={handleDownloadFailureData}>
              Download file Excel
            </button>
          </Stack>
        </Card>
      </ModalWithoutPortal>
      <Stack className="mt-4" direction="horizontal" gap={3}>
        <p className={cn(styles.titleImport)}>{data?.length || 0} Orders</p>
        <p
          className={cn('button-white', styles.importBtn)}
          onClick={goPrevStep}
        >
          <Icon name="arrow-left" />
          Import other file
        </p>
      </Stack>

      <div className={cn(styles.row, { [styles.flex]: false })}>
        <Table className={styles.table} data={data} />
      </div>

      <Stack className="mt-4" direction="horizontal" gap={3}>
        <p className={cn('button-white')} onClick={goPrevStep}>
          <Icon name="arrow-left" />
          Back
        </p>
        <p
          className={cn('button-white ms-auto')}
          onClick={() => navigate('/orders')}
        >
          Cancel
        </p>
        <div>
          <AsyncButton
            className="m-0"
            value="Import"
            loading={importOrdersMutation.isLoading}
            onClick={handleImport}
          />
        </div>
      </Stack>
    </>
  );
}

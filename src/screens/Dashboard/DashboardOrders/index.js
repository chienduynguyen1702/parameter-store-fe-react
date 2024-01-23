import { useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useCallback } from 'react';

import cn from 'classnames';
import styles from './DashboardOrders.module.sass';

import {
  CardDashboardWithGranularity,
  MixBarChart,
  ButtonExport,
  NoData,
} from '../../../components';

import TextDateFilter from '../TextDateFilter';
import DashboardFilter from '../Filter';
import FormFilter from '../Filter/FormFilterOrders';
import DashboardOverview from './DashboardOverview';

import { useDashboardOrders } from '../../../hooks/Data';

import { handleDownloadPDF } from '../../../utils/helpers';

export default function DashboardOrders() {
  const { statisticOrders } = useDashboardOrders();
  const printOrderDashboard = useRef();
  const addLoadingChart = useCallback(
    (elm, disabled = false) => {
      if (disabled) {
        return (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              height: '300px',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <NoData />
          </div>
        );
      }
      return statisticOrders.isSuccess ? (
        elm
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <TailSpin
            className="justify-content-center"
            height="488"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      );
    },
    [statisticOrders.isSuccess],
  );

  return (
    <>
      <div className={cn(styles.container)}>
        <div className="d-flex justify-content-between mb-4 row">
          <div className="col-12 col-sm-auto">
            <div className={cn('h3', styles.title)}>Dashboard Order</div>
            <TextDateFilter />
          </div>
          <div className="d-flex mt-2 mt-sm-0 col-12 col-sm-auto">
            <div className="me-2">
              <DashboardFilter>
                <FormFilter />
              </DashboardFilter>
            </div>
            <div>
              {/* <ButtonExport
                handleClickExport={() =>
                  handleDownloadPDF(
                    printOrderDashboard.current.querySelectorAll(
                      'div .print-order-dashboard',
                    ),
                  )
                }
              /> */}
            </div>
          </div>
        </div>
        <div ref={printOrderDashboard}>
          <div className="print-order-dashboard">
            <DashboardOverview
              counters={
                statisticOrders.isSuccess
                  ? [
                      statisticOrders?.total?.activeKOC,
                      statisticOrders?.total?.order,
                      statisticOrders?.total?.revenue,
                      statisticOrders?.total?.averageValuePerOrder,
                      statisticOrders?.total?.averageProductPerOrder,
                    ]
                  : ['-', '-', '-', '-', '-']
              }
            />
            <div className="mt-4">
              <CardDashboardWithGranularity
                title={'GMV (Million Dong)'}
                classTitle={'title-red'}
                dates={statisticOrders?.rangeTime}
                data={[
                  statisticOrders?.revenueTikTokShop,
                  statisticOrders?.revenueEcomobi,
                ]}
              >
                {addLoadingChart(
                  <MixBarChart
                    count={`${statisticOrders?.total?.revenue?.toLocaleString(
                      'en-US',
                    )} Million Dong`}
                    name={'GMVOrderChart'}
                    legend
                    colors={['#CABDFF', '#B5E4CA']}
                    height={420}
                    displayBar
                  />,
                  true,
                )}
              </CardDashboardWithGranularity>
            </div>
            <div className="mt-4">
              <CardDashboardWithGranularity
                title={'Orders'}
                classTitle={'title-red'}
                dates={statisticOrders?.rangeTime}
                data={[
                  statisticOrders?.orderTikTokShop,
                  statisticOrders?.orderEcomobi,
                ]}
              >
                {addLoadingChart(
                  <MixBarChart
                    count={`${statisticOrders?.total?.order} Orders`}
                    name={'GMVOrderChart'}
                    colors={['#CABDFF', '#B5E4CA']}
                    height={420}
                  />,
                  true,
                )}
              </CardDashboardWithGranularity>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

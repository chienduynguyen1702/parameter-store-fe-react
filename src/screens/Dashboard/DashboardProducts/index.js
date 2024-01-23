import { useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useCallback } from 'react';

import cn from 'classnames';
import styles from './DashboardProducts.module.sass';

import {
  Card,
  CardDashboardWithGranularity,
  ClusteredLineChart,
  HorizontalBarChart,
  ButtonExport,
  NoData,
} from '../../../components';

import TextDateFilter from '../TextDateFilter';
import DashboardFilter from '../Filter';
import FormFilter from '../Filter/FormFilterProducts';
import DashboardOverview from './DashboardOverview';
import ProductsRanking from './ProductsRanking';

import { handleDownloadPDF } from '../../../utils/helpers';

import { useDashboardProducts } from '../../../hooks/Data';

export default function DashboardProducts() {
  const printProductDashboard = useRef();
  const { statisticsProducts } = useDashboardProducts();

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
      return statisticsProducts.isSuccess ? (
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
    [statisticsProducts.isSuccess],
  );
  return (
    <div className={cn(styles.container)}>
      <div className="d-flex justify-content-between mb-4 row">
        <div className="col-12 col-sm-auto">
          <div className={cn('h3', styles.title)}>Dashboard Product</div>
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
                  printProductDashboard.current.querySelectorAll(
                    'div .print-product-dashboard',
                  ),
                )
              }
            /> */}
          </div>
        </div>
      </div>
      <div ref={printProductDashboard}>
        <div className="print-product-dashboard">
          <DashboardOverview
            counters={[
              statisticsProducts?.total?.activeKOC,
              statisticsProducts?.total?.product,
              statisticsProducts?.total?.activeProductBySKU,
              statisticsProducts?.total?.productSold,
              statisticsProducts?.total?.category,
            ]}
          />
          <div className="mt-4">
            <CardDashboardWithGranularity
              title={'Products Sold'}
              classTitle={'title-red'}
              dates={statisticsProducts?.rangeTime}
              data={[
                statisticsProducts?.productSoldEcomobi,
                statisticsProducts?.productSoldTikTok,
              ]}
            >
              {addLoadingChart(
                <ClusteredLineChart
                  colors={['#CABDFF', '#B5E4CA']}
                  fields={['Ecomobi', 'TikTokShop']}
                />,
                true,
              )}
            </CardDashboardWithGranularity>
          </div>
          <div className="mt-4">
            <Card
              title={'Revenue distribution by category'}
              classTitle={'title-purple'}
            >
              {addLoadingChart(
                <HorizontalBarChart
                  data={statisticsProducts?.revenueByCategory}
                  color={'#B1E5FC'}
                  hoverColor={'#659EEA'}
                  name={'revenueProduct'}
                  field={'Revenue'}
                />,
                true,
              )}
            </Card>
          </div>
        </div>
        <div className="print-product-dashboard">
          <div className="mt-4">
            <Card title={'Products ranking'} classTitle={'title-purple'}>
              {addLoadingChart(<ProductsRanking />, true)}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

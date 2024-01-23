import { useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useCallback } from 'react';

import cn from 'classnames';
import styles from './DashboardContents.module.sass';

import TextDateFilter from '../TextDateFilter';
import DashboardFilter from '../Filter';
import FormFilter from '../Filter/FormFilterContents';

import DashboardOverview from './DashboardOverview';
import ContentDistributionByType from './ContentDistributionByType';

import {
  CardDashboardWithGranularity,
  SingleBarChart,
  SingleLineChart,
  ButtonExport,
  NoData,
} from '../../../components';
import DashboardContentByDate from './DashboardContentsByDate';
import DashboardContentByPlatform from './DashboardContentByPlatform';

import { handleDownloadPDF } from '../../../utils/helpers';

import {
  useDashboardOverview,
  useDashboardTimescale,
  useDashboardStatistic,
} from '../../../hooks/Data';

export default function DashboardContents() {
  const { summaryCardContents } = useDashboardOverview();
  const { statisticsTimescale } = useDashboardTimescale();
  const { statisticsContent } = useDashboardStatistic();
  const printRef = useRef();
  const addLoadingChart = useCallback(
    (elm, isSuccess, disabled = false) => {
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
      return isSuccess ? (
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
    [statisticsContent.isSuccess, statisticsTimescale.isSuccess],
  );
  return (
    <div className={cn(styles.container)}>
      <div className="d-flex justify-content-between mb-4 row">
        <div className="col-12 col-sm-auto">
          <div className={cn('h3', styles.title)}>Dashboard Content</div>
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
                  printRef.current.querySelectorAll(
                    'div .print-content-dashboard',
                  ),
                )
              }
            /> */}
          </div>
        </div>
      </div>
      <div ref={printRef}>
        <div className="print-content-dashboard">
          <DashboardOverview counters={summaryCardContents?.totals} />
          <DashboardContentByDate
            addLoadingChart={addLoadingChart}
            statisticsContent={statisticsContent}
          />
          {/* <DashboardContentByPlatform
            addLoadingChart={addLoadingChart}
            statisticsContent={statisticsContent}
          /> */}
        </div>
        <div className="print-content-dashboard">
          {/* <ContentDistributionByType addLoadingChart={addLoadingChart} /> */}
          <div className="mt-4">
            <CardDashboardWithGranularity
              classTitle="title-blue"
              title={'Views'}
              dates={statisticsTimescale?.rangeTime}
              data={[statisticsTimescale?.views]}
            >
              {addLoadingChart(
                <SingleBarChart
                  name={'ViewsChartContent'}
                  color={'#B1E5FC'}
                  hoverColor={'#659EEA'}
                  fieldY={'Views'}
                  count={`${summaryCardContents?.totals[4]?.toLocaleString(
                    'en-US',
                  )} Views`}
                  height={420}
                />,
                statisticsTimescale.isSuccess,
              )}
            </CardDashboardWithGranularity>
          </div>
          <div className="mt-4">
            <CardDashboardWithGranularity
              classTitle="title-red"
              title={'Likes'}
              dates={statisticsTimescale?.rangeTime}
              data={[statisticsTimescale?.likes]}
            >
              {addLoadingChart(
                <SingleLineChart
                  color={'#659EEA'}
                  fieldY={'Likes'}
                  count={`${summaryCardContents?.totals[5]?.toLocaleString(
                    'en-US',
                  )} Likes`}
                />,
                statisticsTimescale.isSuccess,
              )}
            </CardDashboardWithGranularity>
          </div>
        </div>
        <div className="print-content-dashboard">
          <div className="mt-4">
            <CardDashboardWithGranularity
              classTitle="title-red"
              title={'Comments'}
              dates={statisticsTimescale?.rangeTime}
              data={[statisticsTimescale?.comments]}
            >
              {addLoadingChart(
                <SingleLineChart
                  color={'#659EEA'}
                  fieldY={'Comments'}
                  count={`${summaryCardContents?.totals[6]?.toLocaleString(
                    'en-US',
                  )} Comments`}
                />,
                statisticsTimescale.isSuccess,
              )}
            </CardDashboardWithGranularity>
          </div>
          <div className="mt-4">
            <CardDashboardWithGranularity
              classTitle="title-red"
              title={'Shares'}
              dates={statisticsTimescale?.rangeTime}
              data={[statisticsTimescale?.shares]}
            >
              {addLoadingChart(
                <SingleLineChart
                  color={'#659EEA'}
                  fieldY={'Shares'}
                  count={`${summaryCardContents?.totals[7]?.toLocaleString(
                    'en-US',
                  )} Shares`}
                />,
                statisticsTimescale.isSuccess,
              )}
            </CardDashboardWithGranularity>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useCallback, useRef } from 'react';
import { TailSpin } from 'react-loader-spinner';

import cn from 'classnames';
import styles from './DashboardKOCs.module.sass';

import {
  Card,
  CardDashboardWithGranularity,
  CustomPieChart,
  MixSingleLineBarChart,
  SingleBarChart,
  SingleLineChart,
  ButtonExport,
  NoData,
} from '../../../components';

import DashboardFilter from '../Filter';
import FormFilter from '../Filter/FormFilterKOCs';
import DashboardOverview from './DashboardOverview';
import KOCsRanking from './KOCsRanking';
import TextDateFilter from '../TextDateFilter';

import { useDashboardKOCs } from '../../../hooks/Data';

import { handleDownloadPDF } from '../../../utils/helpers';

export default function DashboardKOCs() {
  const printKOCDashboard = useRef();

  const { statisticsKOCs, userTiers } = useDashboardKOCs();

  const age = ['< 18', '18-22', '22-25', '> 25'];
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const addLoadingChart = useCallback(
    (elm, height, disabled = false) => {
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
      return statisticsKOCs.isSuccess ? (
        elm
      ) : (
        <div className="w-100 d-flex justify-content-center">
          <TailSpin
            className="justify-content-center"
            height={height}
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
    [statisticsKOCs.isSuccess],
  );

  const handleTierSettings = (data) => {
    if (data) {
      const dataMap = {};
      for (const item of data) {
        dataMap[item?.name] = item?.count;
      }

      return userTiers.data?.map((tier) => ({
        bucket: tier?.name,
        delta: dataMap[tier?.name] || 0,
      }));
    }
  };

  return (
    <>
      <div className={cn(styles.container)}>
        <div className="d-flex justify-content-between mb-4 row">
          <div className="col-12 col-sm-auto">
            <div className={cn('h3', styles.title)}>Dashboard KOCs</div>
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
                    printKOCDashboard.current.querySelectorAll(
                      'div .print-koc-dashboard',
                    ),
                  )
                }
              /> */}
            </div>
          </div>
        </div>

        <div ref={printKOCDashboard}>
          <div className="print-koc-dashboard">
            <DashboardOverview counters={statisticsKOCs?.totals} />
            <div className="mt-4">
              <CardDashboardWithGranularity
                classTitle={'title-red'}
                title={'Revenue (Million Dong)'}
                // dates={statisticsKOCs?.rangeTime}
                // data={[statisticsKOCs?.revenue]}
              >
                {addLoadingChart(
                  <SingleLineChart
                    count={`${
                      statisticsKOCs?.totals
                        ? statisticsKOCs.totals[1].toLocaleString('en-US')
                        : 0
                    } ${'Million Dong'}`}
                    color={'#659EEA'}
                    fieldY="Revenue (Million Dong)"
                  />,
                  488,
                  true,
                )}
              </CardDashboardWithGranularity>
            </div>
            <div className="mt-4">
              <CardDashboardWithGranularity
                classTitle={'title-red'}
                title={'Product Sold (Unit)'}
                // dates={statisticsKOCs?.rangeTime}
                // data={[statisticsKOCs?.productSold]}
              >
                {addLoadingChart(
                  <SingleLineChart
                    count={`${
                      statisticsKOCs?.totals
                        ? statisticsKOCs.totals[2].toLocaleString('en-US')
                        : 0
                    } ${'Units'}`}
                    color={'#659EEA'}
                    fieldY="Product Sold (Unit)"
                  />,
                  488,
                  true,
                )}
              </CardDashboardWithGranularity>
            </div>
          </div>
          <div className="print-koc-dashboard">
            <div className="mt-4">
              <CardDashboardWithGranularity
                classTitle={'title-blue'}
                title={'Posts'}
                // dates={statisticsKOCs?.rangeTime}
                // data={[
                //   statisticsKOCs?.statisticPost,
                //   statisticsKOCs?.statisticsEngagement,
                // ]}
              >
                {addLoadingChart(
                  <MixSingleLineBarChart
                    name={'overLookChart'}
                    color={'#fbeadf'}
                    hoverColor={'#f9bb98'}
                    keyBarData="Post"
                    keyLineData="Engagement"
                  />,
                  488,
                  true,
                )}
              </CardDashboardWithGranularity>
            </div>
            {/* StatisticDistribution  */}
            <div className="row g-4 g-xl-2 mt-xl-4 mt-0">
              <div className="col-md-6 col-12">
                <Card title={'Age distribution'} classTitle={'title-blue'}>
                  {addLoadingChart(
                    <CustomPieChart
                      data={age?.map((item, index) => {
                        return {
                          bucket: item,
                          delta: statisticsKOCs?.ageDistribution?.[index],
                        };
                      })}
                      colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
                    />,
                    400,
                    true,
                  )}
                </Card>
              </div>
              <div className="col-md-6 col-12">
                <Card title={'Location distribution'} classTitle={'title-blue'}>
                  {addLoadingChart(
                    <CustomPieChart
                      data={statisticsKOCs?.locationDistribution?.map(
                        (item) => {
                          return {
                            bucket: item.city,
                            delta: item.user_count,
                          };
                        },
                      )}
                      colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
                    />,
                    400,
                    true,
                  )}
                </Card>
              </div>
              <div className="col-md-6 col-12">
                <Card title={'Platform distribution'} classTitle={'title-blue'}>
                  {addLoadingChart(
                    <CustomPieChart
                      data={statisticsKOCs?.platformDistribution?.map(
                        (item) => {
                          return {
                            bucket: item.name,
                            delta: item.count,
                          };
                        },
                      )}
                      colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
                    />,
                    400,
                    true,
                  )}
                </Card>
              </div>
              <div className="col-md-6 col-12">
                <Card title={'Tier distribution'} classTitle={'title-blue'}>
                  {addLoadingChart(
                    <CustomPieChart
                      data={handleTierSettings(
                        statisticsKOCs?.tierDistribution,
                      )}
                      colors={userTiers.data?.map((tier) => tier?.color)}
                    />,
                    400,
                    true,
                  )}
                </Card>
              </div>
            </div>
          </div>
          <div className="print-koc-dashboard">
            {/* Birthday and Agency */}
            <div className="mt-4">
              <Card title="KOCs by Birth Month" classTitle="title-blue">
                {addLoadingChart(
                  <SingleBarChart
                    name={'kocsBirthMonthChart'}
                    color="#B1E5FC"
                    hoverColor="#659EEA"
                    data={month?.map((item, index) => {
                      return {
                        bucket: item,
                        'Number of KOCs':
                          statisticsKOCs?.kocByBirthday?.delta?.[index],
                      };
                    })}
                    fieldY="Number of KOCs"
                    height={488}
                  />,
                  488,
                  true,
                )}
              </Card>
            </div>
            <div className="mt-4">
              <Card title="KOCs by Agency" classTitle="title-blue">
                {addLoadingChart(
                  <SingleBarChart
                    name={'kocsBirthMonthChart'}
                    color="#B1E5FC"
                    hoverColor="#659EEA"
                    data={statisticsKOCs?.kocByAgency?.delta?.map(
                      (item, index) => {
                        return {
                          bucket:
                            statisticsKOCs?.kocByAgency?.delta?.[index]
                              ?.agencyName,
                          'Number of KOCs':
                            statisticsKOCs?.kocByAgency?.delta?.[index]?.count,
                        };
                      },
                    )}
                    fieldY="Number of KOCs"
                    height={488}
                  />,
                  488,
                  true,
                )}
              </Card>
            </div>

            <div className="mt-4">
              <Card title={'Ranking'} classTitle={'title-purple'}>
                {addLoadingChart(<KOCsRanking />, 488)}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import {
  Card,
  CardDashboardWithGranularity,
  CustomPieChart,
  MixSingleLineBarChart,
  SingleBarChart,
  SingleLineChart,
} from '../../../../components';

import useDashboardKOCs from '../.././../../hooks/Dashboard/useDashboardKOCs';

export default function DashboardStatistic() {
  const { statisticsKOCs } = useDashboardKOCs();
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
  return (
    <>
      <div className="mt-4">
        <CardDashboardWithGranularity
          classTitle={'title-red'}
          title={'Revenue (Million Dong)'}
          dates={statisticsKOCs?.rangeTime}
          data={[statisticsKOCs?.revenue]}
        >
          <SingleLineChart
            count={`${
              statisticsKOCs?.totals
                ? statisticsKOCs.totals[1].toLocaleString('en-US')
                : 0
            } ${'Million Dong'}`}
            color={'#659EEA'}
            fieldY="Revenue (Million Dong)"
          />
        </CardDashboardWithGranularity>
      </div>
      <div className="mt-4">
        <CardDashboardWithGranularity
          classTitle={'title-red'}
          title={'Product Sold (Unit)'}
          dates={statisticsKOCs?.rangeTime}
          data={[statisticsKOCs?.productSold]}
        >
          <SingleLineChart
            count={`${
              statisticsKOCs?.totals
                ? statisticsKOCs.totals[2].toLocaleString('en-US')
                : 0
            } ${'Units'}`}
            color={'#659EEA'}
            fieldY="Product Sold (Unit)"
          />
        </CardDashboardWithGranularity>
      </div>
      <div className="mt-4">
        <CardDashboardWithGranularity
          classTitle={'title-blue'}
          title={'Post'}
          dates={statisticsKOCs?.rangeTime}
          data={[
            statisticsKOCs?.statisticPost,
            statisticsKOCs?.statisticsEngagement,
          ]}
        >
          <MixSingleLineBarChart
            name={'overLookChart'}
            color={'#fbeadf'}
            hoverColor={'#f9bb98'}
            keyBarData="Post"
            keyLineData="Engagement"
          />
        </CardDashboardWithGranularity>
      </div>

      {/* StatisticDistribution  */}
      <div className="row g-2 mt-4">
        <div className="col-md-6 col-12">
          <Card title={'Age distribution'} classTitle={'title-blue'}>
            <CustomPieChart
              data={age?.map((item, index) => {
                return {
                  bucket: item,
                  delta: statisticsKOCs?.ageDistribution?.[index],
                };
              })}
              colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
            />
          </Card>
        </div>
        <div className="col-md-6 col-12">
          <Card title={'Location distribution'} classTitle={'title-blue'}>
            <CustomPieChart
              data={statisticsKOCs?.locationDistribution?.map((item) => {
                return {
                  bucket: item.city,
                  delta: item.user_count,
                };
              })}
              colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
            />
          </Card>
        </div>
        <div className="col-md-6 col-12">
          <Card title={'Platform distribution'} classTitle={'title-blue'}>
            <CustomPieChart
              data={statisticsKOCs?.platformDistribution?.map((item) => {
                return {
                  bucket: item.name,
                  delta: item.count,
                };
              })}
              colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
            />
          </Card>
        </div>
        <div className="col-md-6 col-12">
          <Card title={'Tier distribution'} classTitle={'title-blue'}>
            <CustomPieChart
              data={statisticsKOCs?.tierDistribution?.map((item) => ({
                bucket: item.name,
                delta: item.count,
              }))}
              colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
            />
          </Card>
        </div>
      </div>

      {/* Birthday and Agency */}
      <div className="mt-4">
        <Card title="KOCs by Birth Month" classTitle="title-blue">
          <SingleBarChart
            name={'kocsBirthMonthChart'}
            color="#B1E5FC"
            hoverColor="#659EEA"
            data={month?.map((item, index) => {
              return {
                bucket: item,
                'Number of KOCs': statisticsKOCs?.kocByBirthday?.delta?.[index],
              };
            })}
            fieldY="Number of KOCs"
            height={488}
          />
        </Card>
      </div>

      <div className="mt-4">
        <Card title="KOCs by Agency" classTitle="title-blue">
          <SingleBarChart
            name={'kocsBirthMonthChart'}
            color="#B1E5FC"
            hoverColor="#659EEA"
            data={statisticsKOCs?.kocByAgency?.delta?.map((item, index) => {
              return {
                bucket: statisticsKOCs?.kocByAgency?.delta?.[index]?.agencyName,
                'Number of KOCs':
                  statisticsKOCs?.kocByAgency?.delta?.[index]?.count,
              };
            })}
            fieldY="Number of KOCs"
            height={488}
          />
        </Card>
      </div>
    </>
  );
}

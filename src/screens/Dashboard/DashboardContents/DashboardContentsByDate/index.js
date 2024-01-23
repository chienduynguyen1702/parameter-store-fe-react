import {
  CardDashboardWithGranularity,
  SingleBarChart,
} from '../../../../components';

export default function DashboardContentByDate({
  statisticsContent,
  addLoadingChart,
}) {
  return (
    <div className="mt-4">
      <CardDashboardWithGranularity
        title={'Contents by Date'}
        classTitle={'title-green'}
        dates={statisticsContent?.dates}
        data={[statisticsContent?.contentsAll]}
      >
        {addLoadingChart(
          <SingleBarChart
            count={`${
              statisticsContent?.totals
                ? statisticsContent?.totals?.total_contents
                : 0
            } Contents`}
            fieldY="Content"
            color={'#B5E4CA'}
            name={'kocsBirthMonthChart'}
            hoverColor={'#83BF6E'}
            height={420}
          />,
          statisticsContent.isSuccess,
        )}
      </CardDashboardWithGranularity>
    </div>
  );
}

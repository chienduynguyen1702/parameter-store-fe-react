import {
  CardDashboardWithGranularity,
  ClusteredLineChart,
} from '../../../../components';

export default function DashboardContentByPlatform({
  statisticsContent,
  addLoadingChart,
}) {
  return (
    <div className="mt-4">
      <CardDashboardWithGranularity
        title="Content distribution by platform"
        classTitle={'title-green'}
        dates={statisticsContent?.dates}
        data={[
          statisticsContent?.contentsFacebook,
          statisticsContent?.contentsInstagram,
          statisticsContent?.contentsYoutube,
          statisticsContent?.contentsTikTok,
        ]}
      >
        {addLoadingChart(
          <ClusteredLineChart
            colors={['#CABDFF', '#B1E5FC', '#B5E4CA', '#FFBC99']}
            fields={['Facebook', 'Instagram', 'TikTok', 'Youtube']}
          />,
          statisticsContent.isSuccess,
          true,
        )}
      </CardDashboardWithGranularity>
    </div>
  );
}

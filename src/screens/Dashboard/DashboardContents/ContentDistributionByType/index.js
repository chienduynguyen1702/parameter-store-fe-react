import { Card, CustomPieChart } from '../../../../components';

import { useDashboardOverview } from '../../../../hooks/Data';

export default function ContentDistributionByType({ addLoadingChart }) {
  // const { summaryCardContents } = useDashboardOverview();
  return (
    <div className="mt-4">
      <Card classTitle={'title-blue'} title={'Content distribution by type'}>
        {addLoadingChart(
          <CustomPieChart
            data={[]}
            // data={
            //   summaryCardContents
            //     ? [
            //         {
            //           bucket: 'Videos',
            //           delta: summaryCardContents?.totals[0],
            //         },
            //         {
            //           bucket: 'Livestreams',
            //           delta: summaryCardContents?.totals[1],
            //         },
            //         {
            //           bucket: 'Stories',
            //           delta: summaryCardContents?.totals[2],
            //         },
            //         {
            //           bucket: 'Posts',
            //           delta: summaryCardContents?.totals[3],
            //         },
            //       ]
            //     : []
            // }
            colors={['#B5E4CA', '#FF6A55', '#CABDFF', '#FFBC99']}
            height={512}
            innerRadius={130}
            outerRadius={160}
          />,
          // summaryCardContents.isSuccess,
          true,
          true,
        )}
      </Card>
    </div>
  );
}

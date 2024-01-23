import {
  CardDashboardWithGranularity,
  SingleBarChart,
  SingleLineChart,
} from '../../../../components';
import useDashboardOverview from '../../../../hooks/Dashboard/DashboardContent/useDashboardOverview';

import useDashboardTimescale from '../../../../hooks/Dashboard/DashboardContent/useDashboardTimescale';
import { handleLongNumber } from '../../../../utils/helpers';

export default function DashboardTimescale() {
  const { statisticsTimescale } = useDashboardTimescale();
  const { summaryCardContents } = useDashboardOverview();
  return (
    <>
      <div className="print-content-dashboard">
        <div className="mt-4">
          <CardDashboardWithGranularity
            classTitle="title-blue"
            title={'Views'}
            dates={statisticsTimescale?.rangeTime}
            data={[statisticsTimescale?.views]}
          >
            <SingleBarChart
              name={'ViewsChartContent'}
              color={'#B1E5FC'}
              hoverColor={'#659EEA'}
              fieldY={'Views'}
              count={`${handleLongNumber(
                summaryCardContents?.totals[4],
                0,
              )} Views`}
              height={420}
            />
          </CardDashboardWithGranularity>
        </div>
        <div className="mt-4">
          <CardDashboardWithGranularity
            classTitle="title-red"
            title={'Likes'}
            dates={statisticsTimescale?.rangeTime}
            data={[statisticsTimescale?.likes]}
          >
            <SingleLineChart
              color={'#659EEA'}
              fieldY={'Likes'}
              count={`${handleLongNumber(
                summaryCardContents?.totals[5],

                0,
              )} Likes`}
            ></SingleLineChart>
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
            <SingleLineChart
              color={'#659EEA'}
              fieldY={'Comments'}
              count={`${handleLongNumber(
                summaryCardContents?.totals[6],

                0,
              )} Comments`}
            ></SingleLineChart>
          </CardDashboardWithGranularity>
        </div>

        <div className="mt-4">
          <CardDashboardWithGranularity
            classTitle="title-red"
            title={'Shares'}
            dates={statisticsTimescale?.rangeTime}
            data={[statisticsTimescale?.shares]}
          >
            <SingleLineChart
              color={'#659EEA'}
              fieldY={'Shares'}
              count={`${handleLongNumber(
                summaryCardContents?.totals[7],

                0,
              )} Shares`}
            ></SingleLineChart>
          </CardDashboardWithGranularity>
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { CardDashboard, SingleBarChart } from '../../../../../../components';
import { useKOCProfileChartViews } from '../../../../../../hooks/Data';

const ChartViews = () => {
  const [granularity, setGranularity] = useState('day');
  const {
    data,
    // isLoading, isSuccess, isError
  } = useKOCProfileChartViews({
    granularity,
  });

  return (
    <CardDashboard
      className="mt-4"
      title="Views"
      classTitle="title-blue"
      granularity={granularity}
      handleChangeRangeTime={(value) => setGranularity(value)}
    >
      <SingleBarChart
        data={data}
        fieldY="Contents"
        color={'#B1E5FC'}
        hoverColor={'#659EEA'}
      />
    </CardDashboard>
  );
};

export default ChartViews;

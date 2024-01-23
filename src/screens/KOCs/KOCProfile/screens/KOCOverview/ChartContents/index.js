import { useState } from 'react';
import { CardDashboard, SingleBarChart } from '../../../../../../components';
import { useKOCProfileChartContents } from '../../../../../../hooks/Data';

const ChartContents = () => {
  const [granularity, setGranularity] = useState('day');
  const {
    data,
    // isLoading, isSuccess, isError
  } = useKOCProfileChartContents({
    granularity,
  });

  return (
    <CardDashboard
      className="mt-4"
      title="Contents"
      classTitle="title-green"
      granularity={granularity}
      handleChangeRangeTime={(value) => setGranularity(value)}
    >
      <SingleBarChart
        data={data}
        fieldY="Contents"
        color={'#B5E4CA'}
        hoverColor={'#83BF6E'}
      />
    </CardDashboard>
  );
};

export default ChartContents;

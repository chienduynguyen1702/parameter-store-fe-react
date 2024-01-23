import { useState } from 'react';
import { CardDashboard, SingleBarChart } from '../../../../../../components';
import { useKOCProfileChartRevenue } from '../../../../../../hooks/Data';

const ChartOrders = () => {
  const [granularity, setGranularity] = useState('day');
  const {
    data,
    // isLoading, isSuccess, isError
  } = useKOCProfileChartRevenue({
    granularity,
  });

  return (
    <CardDashboard
      className="mt-4"
      title="Revenue"
      classTitle="title-purple"
      granularity={granularity}
      handleChangeRangeTime={(value) => setGranularity(value)}
    >
      <SingleBarChart
        data={data}
        fieldY="Contents"
        color={'#CABDFF'}
        hoverColor={'#b4a3fb'}
      />
    </CardDashboard>
  );
};

export default ChartOrders;

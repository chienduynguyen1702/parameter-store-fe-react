import { useState } from 'react';
import { CardDashboard, SingleBarChart } from '../../../../../../components';
import { useKOCProfileChartProductsSold } from '../../../../../../hooks/Data';

const ChartProductsSold = () => {
  const [granularity, setGranularity] = useState('day');
  const {
    data,
    // isLoading, isSuccess, isError
  } = useKOCProfileChartProductsSold({
    granularity,
  });

  return (
    <CardDashboard
      className="mt-4"
      title="Products Sold"
      classTitle="title-red"
      granularity={granularity}
      handleChangeRangeTime={(value) => setGranularity(value)}
    >
      <SingleBarChart
        data={data}
        fieldY="Contents"
        color={'#FFBC99'}
        hoverColor={'#f38146'}
      />
    </CardDashboard>
  );
};

export default ChartProductsSold;

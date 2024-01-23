import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { TailSpin } from 'react-loader-spinner';

import GMV from './GMV';
import TrafficChannel from './TrafficChannel';
import ActiveCustomers from './ActiveCustomers';
import ProductSales from './ProductSales';

import { useProductOverviewBySKU } from '../../../../hooks/Data';
import { NoData } from '../../../../components';

export default function Overview() {
  // const navigate = useNavigate();
  const { id } = useParams();

  const { overview } = useProductOverviewBySKU(id);

  const addLoadingChart = useCallback(
    (elm, height = 488, disabled = false) => {
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
      return overview.isSuccess ? (
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
    [overview.isSuccess],
  );

  return (
    <>
      <GMV
        dates={overview?.rangeTime}
        data={overview.gmv}
        addLoadingChart={addLoadingChart}
      />
      <TrafficChannel
        dates={overview?.rangeTime}
        data={overview.contents}
        addLoadingChart={addLoadingChart}
      />
      <ActiveCustomers
        dates={overview?.rangeTime}
        data={overview.views}
        addLoadingChart={addLoadingChart}
      />
      <ProductSales
        dates={overview?.rangeTime}
        data={overview.sold}
        addLoadingChart={addLoadingChart}
      />
    </>
  );
}

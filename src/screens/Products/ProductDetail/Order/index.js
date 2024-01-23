import React from 'react';

import Table from './Table';
import Decentralization from '../../../../components/Decentralization';

export default function Order() {
  return (
    <Decentralization permissions={['product-orders']} exact>
      <div>
        <Table />
      </div>
    </Decentralization>
  );
}

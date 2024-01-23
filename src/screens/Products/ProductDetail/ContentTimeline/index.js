import React from 'react';

import Calendar from './Calendar';
import Decentralization from '../../../../components/Decentralization';

export default function ContentTimeline() {
  return (
    <Decentralization permissions={['product-tasks']} exact>
      <div>
        <Calendar />
      </div>
    </Decentralization>
  );
}

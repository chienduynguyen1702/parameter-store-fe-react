import React from 'react';

import cn from 'classnames';
import styles from './KOCs.module.sass';

import Table from './Table';
import Decentralization from '../../../../components/Decentralization';

export default function KOCs() {
  return (
    <Decentralization permissions={['product-kocs']} exact>
      <Table className={cn(styles.tableProKocs)} />
    </Decentralization>
  );
}

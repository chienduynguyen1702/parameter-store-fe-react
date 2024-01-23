import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import cn from 'classnames';
import styles from '../ImportFlow.module.sass';

import { AsyncButton, Card, Icon } from '../../';

export default function ImportStepTwo({
  data,
  title,
  importPath,
  mainPath,
  children,
  handleImport,
  isLoading,
}) {
  const [errorRowCount, setErrorRowCount] = useState(0);
  const navigate = useNavigate();

  return (
    <Card className={styles.rounded} title={title} classTitle="title-green">
      <Stack className="mt-4" direction="horizontal" gap={3}>
        <p
          className={cn('button-white', styles.importBtn)}
          onClick={() => navigate(importPath)}
        >
          <Icon name="arrow-left" />
          Import other file
        </p>

        <div className="d-flex align-items-center">
          <p className={cn(styles.titleImport)}>
            {data?.length || 0} {data?.length <= 0 ? 'row' : 'rows'}{' '}
          </p>
          <div className="ms-2">
            {errorRowCount > 0 && (
              <div className={cn(styles.errorProduct, 'fs-7')}>
                {errorRowCount} {errorRowCount <= 1 ? 'error' : 'errors'}
              </div>
            )}
          </div>
        </div>
      </Stack>

      <div className={cn(styles.row, { [styles.flex]: false })}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            data: data,
            className: styles.table,
            setErrorRowCount: setErrorRowCount,
          });
        })}
      </div>

      <Stack className="mt-4" direction="horizontal" gap={3}>
        <p
          className={cn('button-white ms-auto')}
          onClick={() => navigate(mainPath)}
        >
          Cancel
        </p>
        <AsyncButton
          loading={isLoading}
          // className={`button ${errorRowCount > 0 ? 'disabled' : ''}`}
          className={`button`}
          value="Import"
          onClick={handleImport}
          notMaxWidth
        />
      </Stack>
    </Card>
  );
}

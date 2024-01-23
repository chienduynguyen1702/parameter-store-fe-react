import React, { useState, useCallback } from 'react';

import cn from 'classnames';
import styles from './Settings.module.sass';

import FormSettings from './FormSetting';
import Icon from '../../../../../../components/Icon';

const Settings = ({
  className,
  userPlatforms,
  userType,
  addSettingMutation,
  editSettingMutation,
}) => {
  const [visible, setVisible] = useState(false);

  const invisible = useCallback((vis) => setVisible(vis), []);

  return (
    <div
      className={cn(styles.filters, className, { [styles.active]: visible })}
    >
      <button
        className={cn(
          styles.link,
          'button-small button-white-grey-border fw-bold',
        )}
        onClick={() => setVisible(true)}
      >
        <Icon name="setting" size="24" className={'me-1'} />
        Setting
      </button>

      <div className={styles.body}>
        <FormSettings
          parentFc={invisible}
          addSettingMutation={addSettingMutation}
          editSettingMutation={editSettingMutation}
          userPlatforms={userPlatforms}
          userType={userType}
        />
      </div>
      <div className={styles.overlay} onClick={() => setVisible(false)}></div>
    </div>
  );
};

export default Settings;

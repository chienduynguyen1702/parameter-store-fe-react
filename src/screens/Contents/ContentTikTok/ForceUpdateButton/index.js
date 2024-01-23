import { ProgressBar } from 'react-bootstrap';
import { BiRotateLeft } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';

import cn from 'classnames';
import styles from '../ContentTiktok.module.sass';
import { Icon } from '../../../../components';

const ForceUpdateButton = ({
  isUpdatingContent,
  progress,
  handleCancelForceUpdate,
  cancelForceUpdateContentOfBrandMutation,
  handleUpdate,
}) => {
  return (
    <>
      {isUpdatingContent ? (
        <div
          className={cn('button-small button-white-grey-border', styles.btn)}
        >
          <span className="me-2">
            Updating {progress ? `${progress}%` : ''}
          </span>
          <ProgressBar animated now={progress} className={styles.progress} />

          <button
            className={cn(styles.cancelBtn)}
            onClick={handleCancelForceUpdate}
            // disabled={
            //   typeof cancelForceUpdateContentOfBrandMutation === 'undefined' ||
            //   cancelForceUpdateContentOfBrandMutation.isLoading
            // }
          >
            {typeof cancelForceUpdateContentOfBrandMutation === 'undefined' ||
            cancelForceUpdateContentOfBrandMutation.isLoading ? (
              <Oval
                height={20}
                width={20}
                secondaryColor="#6F767E"
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : (
              <Icon name="close" className="me-0" size={20} />
            )}
          </button>
        </div>
      ) : (
        <button
          className={cn('button-small button-white-grey-border', styles.btn)}
          disabled={isUpdatingContent}
          onClick={handleUpdate}
        >
          <BiRotateLeft className="fs-5" /> Force Update
        </button>
      )}
    </>
  );
};

export default ForceUpdateButton;

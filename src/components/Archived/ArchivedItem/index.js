import React from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { AiOutlineReload } from 'react-icons/ai';
import { ThreeDots } from 'react-loader-spinner';

import cn from 'classnames';
import styles from './ArchivedItem.module.sass';
import Avatar from '../../Avatar';
import Popover from '../../Popover';
import moment from 'moment';

import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const ArchivedItem = ({
  item,
  havingImage = false,
  handleUnarchive,
  isLoading,
  unArchivePermission,
  className,
}) => {
  const { id } = useParams();
  const { me } = useContext(AuthContext);
  const roleRequired = 'Admin';

  console.log('roleRequired: ', roleRequired);
  console.log('me: ', me);

  const handleUnarchiveClick = () => {
    if (
      me.isOrganizationAdmin ||
      (Array.isArray(me.isAdminOfProjects) && me.isAdminOfProjects.includes(id))
    ) {
      handleUnarchive(item.id);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  return (
    <div className={cn(styles.item, className)}>
      <div className={styles.details}>
        {havingImage && (
          <div className={styles.avatar}>
            <Avatar image={item.image} />
          </div>
        )}
        <div>
          <div className={styles.user}>
            {item?.name?.length > 40
              ? item?.name.substring(0, 36) + '...'
              : item?.name}
          </div>
          <div className={styles.information}>{`Archived by ${
            item.archiver
          }, at ${moment
            .utc(item.archivedAt)
            .format('MMMM Do YYYY, hh:mm:ss A')}`}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <Popover
          contents={[
            {
              component: (
                <div>
                  {isLoading ? (
                    <div className={cn(styles.threeDots)}>
                      <ThreeDots width="40" height="20" radius="10" />
                    </div>
                  ) : (
                    <div onClick={handleUnarchiveClick}>
                      <AiOutlineReload size={18} />
                      <span className={cn(styles.font15, ' ms-3')}>
                        Unarchive
                      </span>
                    </div>
                  )}
                </div>
              ),
              sleepTime: '500',
            },
          ]}
        >
          <BsChevronDown />
        </Popover>
      </div>
    </div>
  );
};

export default ArchivedItem;

import React from 'react';
import moment from 'moment';

import { Icon } from '../../../../../../../components';

const Row = ({ item }) => {
  return (
    <>
      <div className="d-none d-lg-table-row tableRow g-0">
        {/* Username */}
        <p className="d-table-cell tableCell align-top py-4">
          {item?.username}
        </p>

        {/* Email */}
        <p className="d-table-cell tableCell align-top py-4">{item?.email}</p>

        {/* Platform */}
        <p className="d-table-cell tableCell align-top py-4">
          {item?.platforms?.find((platform) => platform === 'TikTok') ? (
            <Icon name="check" size="24" />
          ) : (
            ''
          )}
        </p>
        <p className="d-table-cell tableCell align-top py-4">
          {item?.platforms?.find((platform) => platform === 'Instagram') ? (
            <Icon name="check" size="24" />
          ) : (
            ''
          )}
        </p>
        <p className="d-table-cell tableCell align-top py-4">
          {item?.platforms?.find((platform) => platform === 'Facebook') ? (
            <Icon name="check" size="24" />
          ) : (
            ''
          )}
        </p>
        <p className="d-table-cell tableCell align-top py-4">
          {item?.platforms?.find((platform) => platform === 'Youtube') ? (
            <Icon name="check" size="24" />
          ) : (
            ''
          )}
        </p>

        {/* TikTok ID */}
        <p className="d-table-cell tableCell align-top py-4">
          {item?.tiktok_id}
        </p>

        {/* Instagram ID */}
        <p className="d-table-cell tableCell align-top py-4">
          {item?.instagram_id}
        </p>

        {/* Facebook ID */}
        {/* <p className="d-table-cell tableCell align-top py-4">
          {item?.facebook_id}
        </p> */}

        {/* Hashtag */}
        <p className="d-table-cell tableCell align-top py-4">
          {item?.tiktok_hashtags?.map((tag) => '#' + tag)?.join(',')}
        </p>

        {/* Address */}
        <p className="d-table-cell tableCell align-top py-4">{item?.address}</p>

        {/* Phone */}
        <p className="d-table-cell tableCell align-top py-4">{item?.phone}</p>

        {/* Category */}
        <div className="d-table-cell tableCell align-top py-4">
          <p
            className={'status-default text-white'}
            style={{
              backgroundColor: 'rgb(127, 211, 237)',
            }}
          >
            {item?.category}
          </p>
        </div>

        {/* Tier */}
        <div className="d-table-cell tableCell align-top py-4">
          <p
            className={'status-default text-white'}
            style={{
              backgroundColor: 'rgb(169, 101, 192)',
            }}
          >
            {item?.tier}
          </p>
        </div>

        {/* Date of birth */}
        <p className="d-table-cell tableCell align-top py-4">
          {item?.date_of_birth}
        </p>

        <p className="d-table-cell tableCell align-top py-4 fs-7 text-danger roundedRight">
          {item?.failed_message}
        </p>
      </div>
    </>
  );
};

export default Row;

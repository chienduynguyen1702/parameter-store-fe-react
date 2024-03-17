import React, { useState } from 'react';
import styles from './Row.module.sass';
import ModalProduct from '../../../../../../components/ModalProduct';

const API_ENDPOINT_SCREEN_INCLUDE = {
  login: 'Login',
  logout: 'Logout',
  refreshToken: 'Refresh Token',
  forgotPassword: 'Forgot Password',
  updatePassword: 'Update Password',
  campaigns: 'Campaigns',
  settings: 'Settings',
  suggest: 'KEYWORD LABBELING',
  'input-file': 'QUEUE',
};

const API_ENDPOINT_SCREEN_EQUALS = {
  'voice-to-text': 'EXTRACT DATA - DETECT VOICE',
  'crawl/tiktok': 'EXTRACT DATA',
  'crawl/tiktok/hashtag-posts': 'KEYWORD EXPLORE',
  'crawl/tiktok/hashtag-id': 'KEYWORD EXPLORE',
  'crawl/tiktok/user-info': 'CHANNEL EXPLORE',
  'crawl/tiktok/user-posts': 'CHANNEL EXPLORE',
  'crawl/tiktok/post-comments': 'EXTRACT DATA - COMMENT',
  'crawl/tiktok/post-comment-replies': 'EXTRACT DATA - COMMENT',
  'crawl/tiktok/search/post': 'KEYWORD EXPLORE',
  'crawl/youtube': 'EXTRACT DATA',
  'crawl/youtube/video-url': 'EXTRACT DATA - VOICE DETECT',
  'crawl/youtube/channel-posts': 'CHANNEL EXPLORE',
  'crawl/youtube/post-comments': 'EXTRACT DATA - COMMENT',
  'crawl/youtube/channel-all-posts': 'CHANNEL EXPLORE',
  'crawl/youtube/search/posts': 'KEYWORD EXPLORE',
  'crawl/youtube/info': 'CHANNEL EXPLORE, KEYWORD EXPLORE',
  'crawl/youtube/channel-id': 'CHANNEL EXPLORE',
  'crawl/tiktok-internal/search/posts': '',
  'crawl/shopee/vn/search-keyword-volume': 'KEYWORD SEARCH TRACKER',
  'crawl/shopee/vn/keyword-suggestion': 'KEYWORD SEARCH TRACKER',
  'crawl/shopee/th/search-keyword-volume': 'KEYWORD SEARCH TRACKER',
  'crawl/shopee/th/keyword-suggestion': 'KEYWORD SEARCH TRACKER',
  'crawl/instagram': 'EXTRACT DATA',
  'crawl/instagram/search/posts': 'KEYWORD EXPLORE',
  'crawl/instagram/user-posts': 'CHANNEL EXPLORE',
  'crawl/instagram/user-info': 'CHANNEL EXPLORE',
  'crawl/instagram/noCORs': 'CHANNEL EXPLORE, KEYWORD EXPLORE, EXTRACT DATA',
  'crawl/lazada/vn/search-keyword-volume': 'KEYWORD SEARCH TRACKER',
  'crawl/lazada/th/search-keyword-volume': 'KEYWORD SEARCH TRACKER',
  'crawl/youtube/v3/channel-videos': '',
  'crawl/google/vn/search-keyword-volume': 'KEYWORD SEARCH TRACKER',
  'crawl/google/th/search-keyword-volume': 'KEYWORD SEARCH TRACKER',
  'crawl/google/vn/tracking-keyword-volume': '',
};

const colorForStatus = (status) => {
  if (Number(status) >= 200 && Number(status) <= 299) return '#83BF6E';
  else return '#FF6A55';
};

const compactString = (str) => {
  const MAX_LENGTH = 50;
  if (str.length <= MAX_LENGTH) {
    return str;
  }
  return str.slice(0, MAX_LENGTH) + '...';
};

const updateScreenName = (endpoint) => {
  if (!endpoint) {
    return 'NOT FOUND';
  }
  // check if endpoint include string in API_ENDPOINT_SCREEN_INCLUDE key
  for (const key in API_ENDPOINT_SCREEN_INCLUDE) {
    if (endpoint.includes(key)) {
      return API_ENDPOINT_SCREEN_INCLUDE[key];
    }
  }

  // check if endpoint equals string in API_ENDPOINT_SCREEN_EQUALS key
  const endpointSplit = endpoint.split('/api/v1/');
  const endpointEquals = endpointSplit[1];
  if (API_ENDPOINT_SCREEN_EQUALS[endpointEquals]) {
    if (API_ENDPOINT_SCREEN_EQUALS[endpointEquals] === '') {
      return 'UPDATING...';
    }
    return API_ENDPOINT_SCREEN_EQUALS[endpointEquals];
  } else {
    return 'UPDATING...';
  }
};

const Row = ({ item }) => {
  const [visibleActions, setVisibleActions] = useState(false);
  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  return (
    <>
      <div className={styles.row} onMouseLeave={() => setVisibleActions(false)}>
        <div className={styles.col}>{item?.time}</div>
        <div className={styles.col}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <img
                src={
                  item?.users
                    ? item?.users?.avatar_url
                    : 'images/content/avatar-1.jpg'
                }
                alt="Avatar"
              />
            </div>
            {item?.users ? item?.users?.username : 'Anonymous'}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Screen</div>
          <div className={styles.number}>
            {updateScreenName(item?.endpoint)}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Endpoint</div>
          <div className={styles.endpoint}>
            <u></u>
            {compactString(item?.endpoint)}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Method</div>
          <div className={styles.box}>
            <div className={styles.number}>{item?.method}</div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Response Status</div>
          <div className={styles.box_response}>
            <div
              className={styles.response_color}
              style={{ backgroundColor: colorForStatus(item?.response_status) }}
            ></div>
            {item.response_status}
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.label}>Latency</div>
          {item.latency}ms
        </div>
      </div>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default Row;

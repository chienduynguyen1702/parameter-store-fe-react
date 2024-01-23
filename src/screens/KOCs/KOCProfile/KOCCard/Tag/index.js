import ReactTooltip from 'react-tooltip';
import { useMemo } from 'react';

import cn from 'classnames';
import styles from './Tag.module.sass';

import { ImageCustom } from '../../../../../components';

import {
  facebookUserLink,
  instagramUserLink,
  tikTokUserLink,
  youtubeUserLink,
} from '../../../../../utils/helpers';

export default function Tag({ data }) {
  const socials = useMemo(() => {
    return [
      {
        title: 'facebook',
        url: facebookUserLink(data.facebook_metadata?.rapid_api?.username),
        img_url: '/images/content/facebook-logo.png',
        username: data.tiktok_metadata?.rapid_api?.username,
      },
      {
        title: 'tiktok',
        url: tikTokUserLink(data.tiktok_metadata?.rapid_api?.username),
        img_url: '/images/content/tiktok-logo.png',
        username: data.tiktok_metadata?.rapid_api?.username,
      },
      {
        title: 'instagram',
        url: instagramUserLink(data.instagram_metadata?.rapid_api?.username),
        img_url: '/images/content/instagram-logo.png',
        username: data.instagram_metadata?.rapid_api?.username,
      },
      {
        title: 'youtube',
        url: youtubeUserLink(data.youtube_metadata?.rapid_api?.username),
        img_url: '/images/content/youtube-logo.png',
        username: data.youtube_metadata?.rapid_api?.username,
      },
    ];
  }, [data]);

  const result = socials.filter((item) => item.username !== undefined);

  return (
    <>
      <div
        className={cn(styles.contacts, 'col-12 col-sm-4 col-lg-7 col-xxl-6')}
      >
        <div className={cn(styles.socials, 'justify-content-end')}>
          {result.map((item, index) => {
            return (
              <div
                className={cn('', styles.socialBox)}
                key={index}
                data-tip={item.username}
                data-place={'top'}
              >
                <a
                  className={cn(styles.social)}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.icon}>
                    <ImageCustom className={'w-100 h-100'} src={item.img_url} />
                  </div>
                  <div className={cn('d-none d-xl-block', styles.socialName)}>
                    {item.username}
                  </div>
                </a>
                <ReactTooltip />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

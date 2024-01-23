import { ImageCustom } from '../../../../components';

import cn from 'classnames';
import styles from './Image.module.sass';

export default function Image({
  src,
  videoDuration,
  platform = 'TikTok',
  onClick,
  alt,
  className,
}) {
  const imageOnError = [
    {
      platform: 'TikTok',
      srcOnError: '/images/platforms/tiktok.png',
      styleName: styles.tiktok,
    },
    {
      platform: 'Facebook',
      srcOnError: '/images/platforms/facebook.png',
      styleName: styles.facebook,
    },
    {
      platform: 'Instagram',
      srcOnError: '/images/platforms/instagram.png',
      styleName: styles.instagram,
    },
    {
      platform: 'Youtube',
      srcOnError: '/images/platforms/youtube.png',
      styleName: styles.youtube,
    },
    {
      platform: 'Evidence',
      srcOnError: '/images/platforms/not-found-image.jpg',
      styleName: styles.otherContent,
    },
  ];
  return (
    <div className={styles.container}>
      <ImageCustom
        onClick={onClick}
        src={src}
        srcOnError={
          imageOnError.find((item) => item.platform === platform).srcOnError
        }
        className={cn(
          styles.image,
          className,
          imageOnError.find((item) => item.platform === platform).styleName,
        )}
        alt={alt}
      />
      {videoDuration && <p className={styles.duration}>{videoDuration}</p>}
    </div>
  );
}

import Image from './Image';

import cn from 'classnames';
import styles from './ContentInfo.module.sass';

export default function ContentInfo({
  item,
  openPreviewModal,
  navigateToKOCProfile,
  platform = 'TikTok',
}) {
  return (
    <div className="d-block d-sm-table-cell tableCell py-sm-3 ps-sm-3 roundedLeft">
      <div className="d-flex align-items-center pb-3 pb-sm-0">
        <Image
          videoDuration={item?.videoDuration}
          src={item?.coverImageUrl}
          platform={platform}
          onClick={openPreviewModal}
        />
        <div className="d-flex flex-column justify-content-between">
          <div className={styles.title} onClick={openPreviewModal}>
            {item?.title}
          </div>
          <div className="cursor-pointer" onClick={navigateToKOCProfile}>
            {item?.ownerUserName}
          </div>
          {item?.timeToNow && (
            <div className="d-flex">
              <div className="fs-7 color4">{item?.timeToNow} ・</div>
              <a
                href={item?.embedLink || item?.evidenceUrl}
                target="_blank"
                rel="noreferrer"
              >
                <div className={cn('fs-7 color4 ms-1', styles.scaleHover)}>
                  View on {platform}
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

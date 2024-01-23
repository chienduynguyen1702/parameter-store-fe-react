import { useMemo } from 'react';

import { useMatch } from 'react-router';
import {
  facebookHashTagLink,
  instagramHashTagLink,
  tikTokHashTagLink,
  youtubeHashTagLink,
} from '../../../../../utils/helpers';

export default function Hashtag({ data }) {
  const tiktokKocMatch = useMatch('/koc-profile/:id/tiktok');

  const isTiktokMode = useMemo(() => {
    return Boolean(tiktokKocMatch);
  }, [tiktokKocMatch]);

  const facebookKocMatch = useMatch('/koc-profile/:id/facebook');

  const isFacebookMode = useMemo(() => {
    return Boolean(facebookKocMatch);
  }, [facebookKocMatch]);

  const youtubeKocMatch = useMatch('/koc-profile/:id/youtube');

  const isYoutubeMode = useMemo(() => {
    return Boolean(youtubeKocMatch);
  }, [youtubeKocMatch]);

  const instagramKocMatch = useMatch('/koc-profile/:id/instagram');

  const isInstagramMode = useMemo(() => {
    return Boolean(instagramKocMatch);
  }, [instagramKocMatch]);

  return (
    <div className="d-flex">
      {isTiktokMode &&
        data?.tiktok_metadata?.hashtags?.map((hashtag, index) => (
          <div key={index} className="status status-default me-2">
            <a className="text-dark" href={tikTokHashTagLink(hashtag)}>
              {hashtag}
            </a>
          </div>
        ))}
      {isYoutubeMode &&
        data?.youtube_metadata?.hashtags?.map((hashtag, index) => (
          <div key={index} className="status status-default me-2">
            <a className="text-dark" href={youtubeHashTagLink(hashtag)}>
              {hashtag}
            </a>
          </div>
        ))}
      {isFacebookMode &&
        data?.facebook_metadata?.hashtags?.map((hashtag, index) => (
          <div key={index} className="status status-default me-2">
            <a className="text-dark" href={facebookHashTagLink(hashtag)}>
              {hashtag}
            </a>
          </div>
        ))}
      {isInstagramMode &&
        data?.instagram_metadata?.hashtags?.map((hashtag, index) => (
          <div key={index} className="status status-default me-2">
            <a className="text-dark" href={instagramHashTagLink(hashtag)}>
              {hashtag}
            </a>
          </div>
        ))}
    </div>
  );
}

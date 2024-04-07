import { Avatar } from '../../../../../../../components';
import { Link } from 'react-router-dom';

export default function AvatarAndInfo({ itemId, avatarUrl, username, phone }) {
  return (
    <div className="d-flex align-items-center cursor-pointer">
      <Link to={`/koc-profile/${itemId}`} target="_blank" className="avatar">
        <Avatar image={avatarUrl} className="imgCover" />
      </Link>
      <div>
        <Link
          to={`/koc-profile/${itemId}`}
          target="_blank"
          className={'mb-1 text-dark d-block'}
        >
          {username}
        </Link>
        <a className="colorN4 font13" href={`tel:+${phone}`}>
          {phone}
        </a>
      </div>
    </div>
  );
}

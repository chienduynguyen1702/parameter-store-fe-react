import moment from 'moment';
import useQueryString from '../../../hooks/useQueryString';

export default function TextDateFilter() {
  const { queryString } = useQueryString();
  const { from, to } = queryString;
  return (
    <div className="text-light-gray">
      {moment(from).format('DD/MM/YYYY')} - {moment(to).format('DD/MM/YYYY')}
    </div>
  );
}

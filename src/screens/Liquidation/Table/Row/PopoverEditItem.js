import { useNavigate } from 'react-router';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal, HiOutlineDuplicate } from 'react-icons/hi';

import { Decentralization, Popover } from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';

export default function PopoverEditItem({
  setIsArchiveMode,
  setIsDuplicateMode,
  id,
}) {
  const navigate = useNavigate();
  const { queryString, parseQueryString } = useQueryString();

  return (
    <Popover
      contents={[
        {
          component: (
            <Decentralization permissions={['liquidation-update']} exact>
              <span>
                <AiFillEdit size={20} />
                <span className={'font15 ms-3'}>Edit</span>
              </span>
            </Decentralization>
          ),
          onClick: () =>
            navigate({
              pathname: `/liquidation/edit-liquidation/${id}`,
              search: `?${parseQueryString(queryString)}`,
            }),
        },
        {
          component: (
            <Decentralization permissions={['liquidation-archivist-archive']}>
              <span>
                <BiArchiveIn size={20} />
                <span className="font15 ms-3">Archive</span>
              </span>
            </Decentralization>
          ),
          onClick: () => {
            setIsArchiveMode(true);
          },
        },
        {
          component: (
            <Decentralization permissions={['liquidation-create']}>
              <span>
                <HiOutlineDuplicate size={20} />
                <span className="font15 ms-3">Duplicate</span>
              </span>
            </Decentralization>
          ),
          onClick: () => {
            setIsDuplicateMode(true);
          },
        },
      ]}
    >
      <HiDotsHorizontal />
    </Popover>
  );
}

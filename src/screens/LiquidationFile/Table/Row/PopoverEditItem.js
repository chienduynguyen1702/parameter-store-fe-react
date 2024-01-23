import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal, HiOutlineDuplicate } from 'react-icons/hi';

import { Decentralization, Popover } from '../../../../components';

export default function PopoverEditItem({
  setIsArchiveMode,
  setIsDuplicateMode,
  navigateEdit,
  navigateView,
  id,
}) {
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
          onClick: () => navigateEdit(id),
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
        {
          component: (
            <Decentralization permissions={['liquidation-update']} exact>
              <span>
                <AiFillEye size={18} />
                <span className={'font15 ms-3'}>View detail</span>
              </span>
            </Decentralization>
          ),
          onClick: () => navigateView(id),
        },
      ]}
    >
      <HiDotsHorizontal />
    </Popover>
  );
}

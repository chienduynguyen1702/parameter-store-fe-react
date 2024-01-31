import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal } from 'react-icons/hi';

import {
  ConfirmContent,
  Decentralization,
  Modal,
  Popover,
} from '../../../../../../components';

export default function PopoverEditUser({
  itemId,
  archiveUserMutation = () => {},
}) {
  return (
    <>
      <Modal visible={false} onClose={() => {}}>
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to archive this user?"
          contentBtnSubmit="Archive"
          contentBtnCancel="Cancel"
          isLoading={archiveUserMutation.isLoading}
          onClose={() => {}}
          handleSubmit={() => archiveUserMutation.mutate(itemId)}
        />
      </Modal>
      <Popover
        contents={[
          {
            component: (
              <Decentralization permissions={['user-update']} exact>
                <span>
                  <AiFillEdit size={18} />
                  <span className={'font15 ms-3'}>Edit</span>
                </span>
              </Decentralization>
            ),
            onClick: () => {},
          },
          {
            component: (
              <Decentralization permissions={['user-archivist-archive']}>
                <span>
                  <BiArchiveIn size={18} />
                  <span className="font15 ms-3">Archive</span>
                </span>
              </Decentralization>
            ),
            onClick: () => {},
          },
        ]}
      >
        <HiDotsHorizontal />
      </Popover>
    </>
  );
}

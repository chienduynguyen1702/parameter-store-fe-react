import { AiFillEdit } from 'react-icons/ai';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiArchiveIn } from 'react-icons/bi';
import { useState } from 'react';

import { ConfirmContent, Modal, Popover } from '../../../../../../components';

export default function PopoverEditRole({
  itemId,
  archiveRoleMutation = () => {},
}) {
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  return (
    <>
      <Modal visible={isConfirmMode} onClose={() => setIsConfirmMode(false)}>
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to archive this role?"
          contentBtnSubmit="Archive"
          contentBtnCancel="Cancel"
          isLoading={archiveRoleMutation.isLoading}
          onClose={() => setIsConfirmMode(false)}
          handleSubmit={() => archiveRoleMutation.mutate(itemId)}
        />
      </Modal>
      <Popover
        contents={[
          {
            component: (
              <div>
                <AiFillEdit size={18} />
                <span className="font15 ms-3">View</span>
              </div>
            ),
            onClick: () => {},
          },
          // {
          //   component: (
          //     <div onClick={() => setIsConfirmMode(true)}>
          //       <>
          //         <BiArchiveIn size={18} />
          //         <span className="font15 ms-3">Archive</span>
          //       </>
          //     </div>
          //   ),
          //   onClick: () => {
          //     setIsConfirmMode(true);
          //   },
          // },
        ]}
      >
        <HiDotsHorizontal />
      </Popover>
    </>
  );
}

import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal } from 'react-icons/hi';

import { useState } from 'react';
import Modal from '../Modal';
import ConfirmContent from '../ConfirmContent';
import Popover from '../Popover';
import { set } from 'react-hook-form';

const PopoverEditAndArchive = ({
  itemId,
  name = '',
  archiveMutation,
  setEditedItemId,
}) => {
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  return (
    <>
      {isArchiveMode && (
        <Modal visible={true} onClose={() => setIsArchiveMode(false)}>
          <ConfirmContent
            title="Confirm"
            content={`Are you sure you want to archive this ${name}?`}
            contentBtnSubmit="Archive"
            contentBtnCancel="Cancel"
            isLoading={archiveMutation.isLoading}
            onClose={() => setIsArchiveMode(false)}
            handleSubmit={() => archiveMutation.mutate(itemId)}
          />
        </Modal>
      )}
      <Popover
        contents={[
          {
            component: (
              <span>
                <AiFillEdit size={18} />
                <span className={'font15 ms-3'}>Edit</span>
              </span>
            ),
            onClick: () => setEditedItemId(itemId),
          },
          {
            component: (
              <span>
                <BiArchiveIn size={18} />
                <span className="font15 ms-3">Archive</span>
              </span>
            ),
            onClick: () => setIsArchiveMode(true),
          },
        ]}
      >
        <HiDotsHorizontal />
      </Popover>
    </>
  );
};

export default PopoverEditAndArchive;

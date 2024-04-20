import { AiFillEdit } from 'react-icons/ai';
import { BiRemoveIn } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';

import { useState } from 'react';
import Modal from '../Modal';
import ConfirmContent from '../ConfirmContent';
import Popover from '../Popover';

const PopoverEditAndRemove = ({
  itemId,
  name = '',
  setEditedItemId,
  handleRemove,
}) => {
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  return (
    <>
      {isRemoveMode && (
        <Modal visible={true} onClose={() => setIsRemoveMode(false)}>
          <ConfirmContent
            title="Confirm"
            content={`Are you sure you want to remove this ${name}?`}
            contentBtnSubmit="Remove"
            contentBtnCancel="Cancel"
            // isLoading={removeMutation.isLoading}
            onClose={() => {}}
            handleSubmit={() => handleRemove(itemId)}
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
                <BsFillTrashFill size={18} />
                <span className="font15 ms-3">Remove</span>
              </span>
            ),
            onClick: () => setIsRemoveMode(true),
          },
        ]}
      >
        <HiDotsHorizontal />
      </Popover>
    </>
  );
};

export default PopoverEditAndRemove;

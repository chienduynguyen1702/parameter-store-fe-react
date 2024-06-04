import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { HiDotsHorizontal } from 'react-icons/hi';

import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import Modal from '../Modal';
import ConfirmContent from '../ConfirmContent';
import Popover from '../Popover';

const PopoverEditAndRemove = ({
  itemId,
  name = '',
  setEditedItemId,
  handleRemove,
  roleRequired,
}) => {
  const { id } = useParams();
  const { me } = useContext(AuthContext);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  // console.log('roleRequired: ', roleRequired);
  // console.log('me: ', me);

  const handleEditClick = () => {
    if (
      (roleRequired === 'Organization Admin' && me.isOrganizationAdmin) ||
      (roleRequired === 'Admin' &&
        Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(Number(id)))
    ) {
      setEditedItemId(itemId);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  const handleRemoveClick = () => {
    if (
      (roleRequired === 'Organization Admin' && me.isOrganizationAdmin) ||
      (roleRequired === 'Admin' &&
        Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(Number(id)))
    ) {
      setIsRemoveMode(true);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
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
            onClick: handleEditClick,
          },
          {
            component: (
              <span>
                <BsFillTrashFill size={18} />
                <span className="font15 ms-3">Remove</span>
              </span>
            ),
            onClick: handleRemoveClick,
          },
        ]}
      >
        <HiDotsHorizontal />
      </Popover>
    </>
  );
};

export default PopoverEditAndRemove;

import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { useState } from 'react';
import Modal from '../Modal';
import ConfirmContent from '../ConfirmContent';
import Popover from '../Popover';
import { set } from 'react-hook-form';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const PopoverEditAndArchive = ({
  itemId,
  name = '',
  archiveMutation,
  setEditedItemId,
  isArchivedSuccess,
  roleRequired,
}) => {
  const { id } = useParams();
  const { me } = useContext(AuthContext);
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  const handleEditClick = () => {
    if (
      (roleRequired === 'Organization Admin' && me.isOrganizationAdmin) ||
      (roleRequired === 'Admin' &&
        Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(id))
    ) {
      setEditedItemId(itemId);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  const handleArchiveClick = () => {
    if (
      (roleRequired === 'Organization Admin' && me.isOrganizationAdmin) ||
      (roleRequired === 'Admin' &&
        Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(id))
    ) {
      setIsArchiveMode(true);
    } else {
      toast.error('You are not authorized to perform this action');
    }
  };
  return (
    <>
      {isArchiveMode && !isArchivedSuccess && (
        <Modal visible={true} onClose={() => setIsArchiveMode(false)}>
          <ConfirmContent
            title="Confirm"
            content={`Are you sure you want to archive this ${name}?`}
            contentBtnSubmit="Archive"
            contentBtnCancel="Cancel"
            isLoading={archiveMutation.isLoading}
            onClose={() => {
              // console.log('isArchivedSuccess: ', isArchivedSuccess);
              setIsArchiveMode(false);
            }}
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
            onClick: handleEditClick,
          },
          {
            component: (
              <span>
                <BiArchiveIn size={18} />
                <span className="font15 ms-3">Archive</span>
              </span>
            ),
            onClick: handleArchiveClick,
          },
        ]}
      >
        <HiDotsHorizontal />
      </Popover>
    </>
  );
};

export default PopoverEditAndArchive;

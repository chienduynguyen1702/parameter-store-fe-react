import { useNavigate } from 'react-router';
import { AiFillEdit } from 'react-icons/ai';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiArchiveIn } from 'react-icons/bi';
import { useCallback, useState } from 'react';

import {
  ConfirmContent,
  Decentralization,
  Modal,
  Popover,
} from '../../../../../../components';

import useQueryString from '../../../../../../hooks/useQueryString';

export default function PopoverEditRole({ itemId, archiveRoleMutation }) {
  const navigate = useNavigate();
  const { queryString, parseQueryString } = useQueryString();

  const [isConfirmMode, setIsConfirmMode] = useState(false);

  const openEditRoleForm = useCallback(
    (id) => {
      navigate({
        pathname: `/user-setting/roles/edit-role/${id}`,
        search: `?${parseQueryString(queryString)}`,
      });
    },
    [navigate, parseQueryString, queryString],
  );

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
              <Decentralization permissions={['role-update']}>
                <div>
                  <AiFillEdit size={18} />
                  <span className="font15 ms-3">Edit</span>
                </div>
              </Decentralization>
            ),
            onClick: () => openEditRoleForm(itemId),
          },
          {
            component: (
              <Decentralization permissions={['role-archivist-archive']}>
                <div onClick={() => setIsConfirmMode(true)}>
                  <>
                    <BiArchiveIn size={18} />
                    <span className="font15 ms-3">Archive</span>
                  </>
                </div>
              </Decentralization>
            ),
            onClick: () => {
              setIsConfirmMode(true);
            },
          },
        ]}
      >
        <HiDotsHorizontal />
      </Popover>
    </>
  );
}

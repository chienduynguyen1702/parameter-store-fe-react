import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal } from 'react-icons/hi';

import {
  ConfirmContent,
  Decentralization,
  Modal,
  Popover,
} from '../../../../../../components';

import useQueryString from '../../../../../../hooks/useQueryString';

export default function PopoverEditUser({ itemId, archiveUserMutation }) {
  const navigate = useNavigate();
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  const { queryString, parseQueryString } = useQueryString();

  const goToEditUser = useCallback(
    (id) => {
      navigate({
        pathname: `/user-setting/users/edit-user/${id}`,
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
          content="Are you sure you want to archive this user?"
          contentBtnSubmit="Archive"
          contentBtnCancel="Cancel"
          isLoading={archiveUserMutation.isLoading}
          onClose={() => setIsConfirmMode(false)}
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
            onClick: () => goToEditUser(itemId),
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

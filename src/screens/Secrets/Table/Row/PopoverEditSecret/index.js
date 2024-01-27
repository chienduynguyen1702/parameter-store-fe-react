import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal } from 'react-icons/hi';

import {
  ConfirmContent,
  Modal,
  ModalWithoutPortal,
  Popover,
} from '../../../../../components';

import EditSecretForm from '../../../EditSecretForm';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSecretById } from '../../../../../services/api';
import { toast } from 'react-toastify';

export default function PopoverEditSecret({ item }) {
  const DEFAULT_VALUE_FORM = {
    name: item.name,
    description: item.description,
    value: item.value,
    project_id: item.projectId,
  };
  const queryClient = useQueryClient();

  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const deleteSecretMutation = useMutation(
    async (id) => {
      return deleteSecretById(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('secrets');
        setIsConfirmMode(false);
        toast.success('Delete secret successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    },
  );

  return (
    <>
      <Modal visible={isConfirmMode} onClose={() => setIsConfirmMode(false)}>
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to delete this secret?"
          contentBtnSubmit="Delete"
          contentBtnCancel="Cancel"
          isLoading={deleteSecretMutation.isLoading}
          onClose={() => setIsConfirmMode(false)}
          handleSubmit={() => deleteSecretMutation.mutate(item.id)}
        />
      </Modal>
      <ModalWithoutPortal
        outerClassName={'outerModal'}
        visible={isEditMode}
        onClose={() => setIsEditMode(false)}
      >
        <EditSecretForm
          itemId={item.id}
          defaultValues={DEFAULT_VALUE_FORM}
          onClose={() => setIsEditMode(false)}
        />
      </ModalWithoutPortal>
      <Popover
        contents={[
          {
            component: (
              <span>
                <AiFillEdit size={18} />
                <span className={'font15 ms-3'}>Edit</span>
              </span>
            ),
            onClick: () => setIsEditMode(true),
          },
          {
            component: (
              <span>
                <BiArchiveIn size={18} />
                <span className="font15 ms-3">Delete</span>
              </span>
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

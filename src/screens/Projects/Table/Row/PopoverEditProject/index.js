import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { toast } from 'react-toastify';

import {
  ConfirmContent,
  Modal,
  ModalWithoutPortal,
  Popover,
} from '../../../../../components';

import EditProjectForm from '../../../EditProjectForm';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProjectById } from '../../../../../services/api';

export default function PopoverEditProject({ item }) {
  const DEFAULT_VALUE_FORM = {
    name: item.name,
    description: item.description,
  };
  const queryClient = useQueryClient();

  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const deleteProjectMutation = useMutation(
    async (id) => {
      return deleteProjectById(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Projects');
        setIsConfirmMode(false);
        toast.success('Delete Project successfully');
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
          content="Are you sure you want to delete this project?"
          contentBtnSubmit="Delete"
          contentBtnCancel="Cancel"
          isLoading={deleteProjectMutation.isLoading}
          onClose={() => setIsConfirmMode(false)}
          handleSubmit={() => deleteProjectMutation.mutate(item.id)}
        />
      </Modal>
      <ModalWithoutPortal
        outerClassName={'outerModal'}
        visible={isEditMode}
        onClose={() => setIsEditMode(false)}
      >
        <EditProjectForm
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

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';

import { Col, Row } from 'react-bootstrap';
import {
  AsyncButton,
  RHFDropdown,
  Item,
  RHFTextInput,
  SettingItem,
} from '../../../../../components';
import NotAppliedParamTable from './NotAppliedParamTable/Table';
import { useListProjects } from '../../../../../hooks/data';
import { toast } from 'react-toastify';
function UpdateForm({ title = 'Apply Parameters', onClose, listParameters }) {
  const queryClient = useQueryClient();
  const { applyParametersMutation } = useListProjects();
  // Handle id and current data of form in setting item
  const [id, setId] = useState(0);
  const [modalTitle, setModalTitle] = useState('Add New Tier');

  // Handle modal add and edit setting
  const [typeAdd, setTypeAdd] = useState('none');
  const [typeEdit, setTypeEdit] = useState('none');

  const handleCloseModal = () => {
    setTypeAdd('none');
    setTypeEdit('none');
  };
  const { id: project_id } = useParams();
  // console.log('listParameters', listParameters);
  const listNotAppliedParameters = listParameters.filter(
    (item) => item.isApplied === false,
  );
  const method = useForm({});

  const handleSubmit = (data) => {
    const req = {
      data: data,
      project_id: project_id,
    };
    applyParametersMutation.mutate(req.project_id, {
      onSuccess: () => {
        // toast.success('Apply Parameters Success, waiting for agent pull');
        onClose();
      },
      onError: (error) => {
        console.error('Error applying parameter:', error);
      },
    });
  };

  // const handleSubmit = (data) => {
  //   if (typeAdd !== 'none') {
  //     const body = {
  //       color: data.color,
  //       type: typeAdd,
  //       name: data.name,
  //     };
  //     return addSettingMutation.mutate(body, {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(typeAdd);
  //         toast.success(`${modalTitle} Success`);
  //         handleCloseModal();
  //       },
  //     });
  //   }
  //   const body = {
  //     color: data.color,
  //     type: typeEdit,
  //     name: data.name,
  //   };
  //   return editSettingMutation.mutate(
  //     { id, data: body },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries(typeEdit);
  //         toast.success(`${modalTitle} Success`);
  //         handleCloseModal();
  //       },
  //     },
  //   );
  // };

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={title}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <p>This project auto update mode is not set.</p>
          <p>
            These parameters below was updated, but was not applied by agent
            pull. Confirm to apply
          </p>
          <div></div>
          <br></br>
          {/* <RHFTextInput
            name="name"
            label="Parameter name"
            type="text"
            placeholder="Enter Parameter name"
            tooltip="Parameter name is required"
          />
          <RHFTextInput
            name="value"
            label="Value"
            type="text"
            placeholder="Enter value"
            tooltip="Parameter value is required"
          /> */}

          <NotAppliedParamTable
            listNotAppliedParameters={listNotAppliedParameters}
          />
        </Item>

        <div className="pt-5 d-flex justify-content-end align-items-center">
          <div>
            <p onClick={onClose} className="button-white me-2">
              Cancel
            </p>
          </div>
          <div>
            <AsyncButton
              threeDotsWidth="20"
              threeDotsHeight="20"
              type="submit"
              className="button px-4"
              value="Confirm"
              notMaxWidth
              loading={false}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default UpdateForm;

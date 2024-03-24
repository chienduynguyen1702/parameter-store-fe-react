import React from 'react';
import { FormProvider } from 'react-hook-form';

import Item from '../../../../components/Item';

import { RHFTextInput, AsyncButton } from '../../../../components';

const Form = ({ title = '', method, handleSubmit, onLoading, onClose }) => {
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={title}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <RHFTextInput
            name="project-name"
            label="Project name"
            type="text"
            placeholder="Enter project name"
            tooltip="Project name is required"
          />
          <RHFTextInput
            name="description"
            label="Description"
            type="text"
            placeholder="Enter description"
            // tooltip="Please enter correct email format"
          />
          <RHFTextInput
            label="Address"
            name="address"
            type="text"
            placeholder="Enter address"
            tooltip="Phone number is required"
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
              value="Save"
              notMaxWidth
              loading={false}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import {
  RHFTextInput,
  AsyncButton,
  RHFDropdown,
  Item,
} from '../../../../../../components';

const Form = ({ title = '', method, handleSubmit, onLoading, onClose }) => {
  // //parse stages to get only name
  // const stagesName = stages.map((item) => item.name);
  // console.log('stagesName', stagesName);
  // //parse environments to get only name
  // const environmentsName = environments.map((item) => item.name);
  // console.log('environmentsName', environmentsName);
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={title}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <RHFTextInput
            name="name"
            label="Stage name"
            type="text"
            placeholder="Enter stage name"
            tooltip="Stage name is required"
          />
          <RHFTextInput
            name="description"
            label="Description"
            type="text"
            placeholder="Enter describtion"
            tooltip="Please enter correct describtion format"
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
              value="Done"
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

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import {
  RHFTextInput,
  AsyncButton,
  RHFDropdown,
  Item,
} from '../../../../../components';

const Form = ({ title = '', method, handleSubmit, onLoading, onClose, parameterInfo, stages, environments}) => {


 //parse stages to get only name
  const stagesName = stages.map((item) => item.name);
  console.log('stagesName', stagesName);
  //parse environments to get only name
  const environmentsName = environments.map((item) => item.name);
  console.log('environmentsName', environmentsName);
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
          />
          <RHFTextInput
            label="Description"
            name="description"
            type="text"
            placeholder="Enter description"
            // tooltip="Description is required"
          />
          <Row>
            <Col sm={12} md={6}>
              <RHFDropdown
                name="stage"
                data={stagesName}
                label="Stage"
                tooltip="Stage is required"
                // defaultValue={parameterInfo.stage}
              />
            </Col>
            <Col sm={12} md={6}>
              <RHFDropdown
                name="environment"
                data={environmentsName}
                label="Environment"
                tooltip="Environment is required"
              />
            </Col>
          </Row>
          {/* <Row>
            <Col sm={12} md={6}>
              <RHFDropdown
                name="expiration"
                data={['7 days', '14 days', '30 days', '60 days', '90 days', "No expiration"]}
                defaultValue="Select expiration"
                label="Expiration"
                tooltip="After this time, the parameter will be expired"
              />
            </Col>
          </Row> */}
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

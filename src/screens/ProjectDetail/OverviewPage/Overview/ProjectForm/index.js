import React from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { FormProvider } from 'react-hook-form';
import moment from 'moment';

import Item from '../../../../../components/Item';

import { RHFTextInput, AsyncButton } from '../../../../../components';

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
            name="name"
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
          />
          <RHFTextInput
            name="repo_url"
            label="Repository URL"
            type="text"
            placeholder="Enter Repository URL"
          />
          <RHFTextInput
            name="repo_api_token"
            label="Repository URL"
            type="text"
            placeholder="Enter Repository URL"
          />
        </Item>

        <Row className="borderBottom py-2 mb-2">
          <Col xs={12} md={{ span: 6, offset: 0 }}>
            <RHFTextInput
              name="current_sprint"
              label="Current sprint no"
              type="text"
              placeholder="Enter current sprint no"
            />
            <RHFTextInput
              name="status"
              label="Status"
              type="text"
              placeholder="Enter status"
            />
          </Col>
          <Col xs={12} md={{ span: 6, offset: 0 }}>
            <RHFTextInput
              name="start_at"
              label="Start date"
              type="text"
              placeholder="Enter start date"
            />
            <RHFTextInput
              name="address"
              label="Address"
              type="text"
              placeholder="Enter address"
            />
          </Col>
        </Row>

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

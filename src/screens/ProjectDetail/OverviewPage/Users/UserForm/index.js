import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Item from '../../../../../components/Item';

import { RHFTextInput, AsyncButton, RHFDropdown, RHFInputSelect } from '../../../../../components';

const UserForm = ({ title = '',listUsers, method, handleSubmit, onLoading, onClose }) => {
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={title}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <Row>
            <Col sm={12} md={6}>
              <RHFInputSelect
                name="username"
                label="Select username"
                tooltip="Username is required"
              />
            </Col>
            <Col sm={12} md={6}>
              <RHFDropdown
                name="role"
                data={['Project Admin', 'Developer']}
                defaultValue="Select role"
                label="Role"
                tooltip="Role is required"
              />
            </Col>
          </Row>
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

export default UserForm;

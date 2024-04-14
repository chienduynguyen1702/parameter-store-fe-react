import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import Item from '../../../../components/Item';

import { RHFTextInput, AsyncButton } from '../../../../components';

const UserForm = ({ title = '', method, handleSubmit, onLoading, onClose, userInfo }) => {
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={title}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <RHFTextInput
            name="username"
            label="Username"
            type="text"
            placeholder="Enter username"
            tooltip="Username is required"
            defaultValue={userInfo ? userInfo.username : ''}
          />
          <RHFTextInput
            name="email"
            label="Email"
            type="text"
            placeholder="Enter email"
            tooltip="Please enter correct email format"
            defaultValue={userInfo ? userInfo.email : ''}
          />
          <RHFTextInput
            name="phone"
            label="Phone"
            type="phone"
            placeholder="Enter phone number"
            tooltip="Phone number is required"
            defaultValue={userInfo ? userInfo.phone : ''}
          />
          <Row>
          </Row>
        </Item>
        <Item
          title="Update Password"
          className="py-4 borderBottom"
          classTitle="title-purple"
        >
          <Row>
            <Col sm={12} md={6}>
              <RHFTextInput
                tooltip="New password is required"
                label="New password"
                name="new_password"
                placeholder="Enter new password"
                type="password"
              />
            </Col>
            <Col sm={12} md={6}>
              <RHFTextInput
                tooltip="Confirm new password is required"
                label="Confirm new password"
                name="confirm_password"
                placeholder="Enter confirm new password"
                type="password"
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

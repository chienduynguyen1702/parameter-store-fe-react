import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

import {
  RHFTextInput,
  AsyncButton,
  RHFDropdown,
  Item,
  RHFDateInput,
} from '../../../components';

const OrganizationForm = ({ orgData, title = '', method, handleSubmit, onLoading, onClose }) => {
  // console.log('OrganizationForm orgData',orgData);
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
            label="Organization name"
            type="text"
            defaultValue="Tnter organization name"
            // default={orgData?.name}
            placeholder="Enter organization name"
            tooltip="Organization name is required"
          />
          <RHFTextInput
            name="alias_name"
            label="Alias name"
            type="text"
            defaultValue="Enter alias name"
            // value={orgData?.alias_name}
            placeholder="Enter organization name"
            tooltip="Organization name is required"
          />
          <RHFTextInput
            name="description"
            label="Description"
            type="text"
            defaultValue="Enter description"
            // value={orgData?.description}
            placeholder="Enter description"
            // tooltip="Please enter correct description format"
          />
          <RHFTextInput
            name="address"
            label="Address"
            type="text"
            defaultValue="Enter address"
            // value={orgData?.address}
            placeholder="Enter address"
            // tooltip="Enter address"
          />
          <RHFTextInput
            name="establishment_date"
            label="Establishment date"
            type="text"
            tooltip="Enter establishment date with format DD-MM-YYYY"
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

export default OrganizationForm;

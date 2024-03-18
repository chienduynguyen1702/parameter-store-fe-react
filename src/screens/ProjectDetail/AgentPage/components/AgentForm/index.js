import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import {
  RHFTextInput,
  AsyncButton,
  RHFDropdown,
  Item,
} from '../../../../../components';

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
            name="agent-name"
            label="Agent name"
            type="text"
            placeholder="Enter agent name"
            tooltip="Agent name is required"
          />
          <RHFTextInput
            name="Describtion"
            label="describtion"
            type="text"
            placeholder="Enter describtion"
            tooltip="Please enter correct describtion format"
          />
          <Row>
            <Col sm={12} md={6}>
              <RHFDropdown
                name="stage"
                data={['Build', 'Test', 'Deploy']}
                defaultValue="Select stage"
                label="Stage"
                tooltip="stage is required"
              />
            </Col>
            <Col sm={12} md={6}>
              <RHFDropdown
                name="Environment"
                data={['Dev/Test', 'Staging', 'Production']}
                defaultValue="Select environment"
                label="Environment"
                tooltip="Environment is required"
              />
            </Col>
          </Row>
        </Item>
        <Item
          title="Repository link"
          className="py-4 borderBottom"
          classTitle="title-purple"
        >
          <Row>
            <Col sm={12} md={6}>
              <RHFTextInput
                label="Repository name"
                name="repositoryName"
                placeholder="Enter repository name"
                type="text"
                tooltip="Repository name is required"
              />
            </Col>
            <Col sm={12} md={6}>
              <RHFTextInput
                label="Repository API Token"
                name="repositoryAPIToken"
                placeholder="Enter API Token"
                type="password"
                tooltip="API token only have access to workflow of repository. Doc: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <RHFTextInput
                label="Workflow name"
                name="workflowName"
                placeholder="Enter workflow name"
                type="text"
                tooltip="Workflow name is required"
              />
            </Col>
            <Col sm={12} md={6}>
              <RHFDropdown
                name="platform"
                data={['Github Actions', 'Gitlab Runner', 'Jenkins', 'CircleCI']}
                defaultValue="Select platform"
                label="Platform"
                tooltip="Platform is required"
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

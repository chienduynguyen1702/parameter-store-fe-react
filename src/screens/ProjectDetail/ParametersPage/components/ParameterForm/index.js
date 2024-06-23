import React, { useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';

import {
  RHFTextInput,
  AsyncButton,
  RHFDropdown,
  Item,
  RHFLabel,
} from '../../../../../components';
import { useParams } from 'react-router';
import { checkParamUsingInRepo } from '../../../../../services/api';
import { toast } from 'react-toastify';

const Form = ({
  title = '',
  method,
  handleSubmit,
  onLoading,
  onClose,
  parameterInfo,
  stages,
  environments,
}) => {
  const { id } = useParams();
  console.log('parameterInfo in form', parameterInfo);
  const [isUsingAtFileArrayState, setIsUsingAtFileArrayState] = useState([]);

  useEffect(() => {
    if (title === 'Edit Parameter') {
      setIsUsingAtFileArrayState(parameterInfo?.is_using_at_file_array || []);
    }
  }, [title, parameterInfo]);

  // console.log('isUsingAtFileArrayState', isUsingAtFileArrayState);
  //parse stages to get only name
  const stagesName = stages.map((item) => item.name);
  // console.log('stagesName', stagesName);
  //parse environments to get only name
  const environmentsName = environments.map((item) => item.name);
  // console.log('environmentsName', environmentsName);
  // Function to parse is_using_at_file into an array of objects
  const parseStringToArray = (string) => {
    try {
      // Check if the string is a valid JSON
      return JSON.parse(string);
    } catch (error) {
      // If the string is not a valid JSON, handle the error appropriately
      console.error('Failed to parse string to array:', error);
      return [];
    }
  };
  const handleClickCheck = async () => {
    // log parameter name in form
    const paramName = method.watch('name');
    if (!paramName) {
      toast.error('Please enter parameter name');
      return;
    }
    console.log('parameter name:', paramName);
    try {
      const data = {
        parameter_name: paramName,
      };
      console.log('data', data);
      const response = await checkParamUsingInRepo(id, data);
      // console.log('response', response?.data?.is_using_at_file);
      // Check if the string is a valid JSON
      const isUsingAtFileArray = parseStringToArray(
        response?.data?.is_using_at_file,
      );
      // console.log('isUsingAtFileArray', isUsingAtFileArray);
      setIsUsingAtFileArrayState(isUsingAtFileArray);
    } catch (error) {
      toast.error('Error checking parameter using');
      console.log('Error', error);
    }
  };
  // Since parameterInfo.is_using_at_file_array is already an array, use it directly
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
            <RHFLabel
              label="Is Using At File:"
              // className=""
              tooltip="File and line number where the parameter is used at. Auto update."
            />
            <div label="">
              <ul>
                {isUsingAtFileArrayState?.map((file, index) => (
                  <li key={index}>
                    File :{' '}
                    <a
                      href={`${file.file_html_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.file_name}
                    </a>
                    : [{''}
                    {file.line_number.join(', ')}]
                  </li>
                ))}
              </ul>
            </div>
          </Row>
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
            <p className="button-white me-2" onClick={handleClickCheck}>
              Check Parameter using
            </p>
          </div>
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

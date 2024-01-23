import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'react-bootstrap';

import cn from 'classnames';
import styles from './UserForm.module.sass';

import cities from '../../../../utils/json/cities.json';

import Item from '../../../../components/Item';

import {
  RHFTextInput,
  RHFTagInput,
  AsyncButton,
  RHFDropdown,
  Tooltip,
  Decentralization,
  RHFDateInput,
  RHFImage,
  RHFInputSelect,
} from '../../../../components';

import useUserForm from '../../../../hooks/Form/useUserForm';

import { onInvalidSubmit } from '../../../../utils/helpers';

const UserForm = ({ title = '' }) => {
  // Props from Outlet
  const { onClose } = useOutletContext();
  const [active, setActive] = useState();
  const transformedArray = cities?.city.map((city, _) => {
    return { value: `${city}`, label: city };
  });

  const handleTriggerDropdown = useCallback((value) => {
    if (value === 'KOC') {
      setActive(true);
    } else setActive(false);
  }, []);

  // ------------------------------ Query Data ------------------------------
  const {
    rolesQuery,
    listAgency,
    tiersQuery,
    categoriesQuery,
    platformsQuery,
    userQuery,
    defaultForm,
    addUsersMutation,
    editUsersMutation,
    uploadImageMutation,
    schema,
    handleSubmit,
  } = useUserForm();
  // ------------------------------ Handle form ---------------------------
  const [defaultAva, setDefaultAva] = useState(userQuery?.data?.avatar);
  const method = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultForm,
  });

  useEffect(() => {
    if (userQuery?.isSuccess) {
      setActive(userQuery?.data?.isKOC);
      method.reset(userQuery.data);
    }
  }, [method, userQuery.isSuccess]);

  // ------------------------------ Render --------------------------------
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit, onInvalidSubmit)}>
        <Item
          title={title}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <RHFImage
            name="avatar"
            setDefaultAva={setDefaultAva}
            defaultValue={defaultAva || null}
          />
          <div>
            <RHFTextInput
              name="username"
              label="Username"
              type="text"
              placeholder="Enter username"
              tooltip="Username is required"
            />
            <RHFDateInput
              name="birthday"
              label="Date of Birth"
              placeholderText="DD/MM/YYYY"
              tooltip="Date of Birth is required"
            />
            <RHFTextInput
              name="email"
              label="Email"
              type="text"
              placeholder="Enter email"
              tooltip="Please enter correct email format"
            />
            <RHFTextInput
              label="Phone"
              name="phone"
              type="phone"
              placeholder="Enter phone number"
              tooltip="Phone number is required"
            />
            <div className="d-flex row pe-0 pe-lg-auto">
              <div className="pe-lg-2 pe-auto col-lg-5 col-12">
                <RHFTextInput
                  label="Address"
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  tooltip="Address is required"
                />
              </div>
              <div className="col-12 col-lg-7 row pe-0 gx-lg-2 gx-auto">
                <div className="px-lg-2 px-auto col-lg-7 col-12 pe-0">
                  <RHFInputSelect
                    name="city"
                    label="Province"
                    tooltip="Province is required"
                    defaultValue={userQuery?.data?.city || null}
                    suggestions={transformedArray}
                  />
                </div>
                <div className="col-lg-5 col-12 pe-0">
                  <RHFDropdown
                    name="country"
                    data={['Việt Nam']}
                    defaultValue="Country"
                    label="Country"
                    tooltip="Country is required"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex row">
              <div className={styles.dropdownUserType}>
                <RHFDropdown
                  name="userType"
                  data={['KOC', 'Agency', 'Other']}
                  defaultValue="Select type"
                  label="User Type"
                  tooltip="User type is required"
                  onChangeData={handleTriggerDropdown}
                />
              </div>
              <div
                className={cn(
                  {
                    [styles.dropdownActive]: active,
                  },
                  {
                    [styles.dropdownAgency]: !active,
                  },
                )}
              >
                <RHFDropdown
                  name="agency"
                  data={listAgency?.isSuccess ? listAgency?.data : []}
                  defaultValue="Select Agency"
                  label="Agency"
                  tooltip="Agency is required"
                  active={active}
                />
              </div>
              <div className="flex-fill col-12">
                {rolesQuery?.data && (
                  <RHFTagInput
                    label="Roles"
                    name="roles"
                    placeholder=" Press enter to add new role"
                    tooltip="Role is required"
                    suggestions={rolesQuery.data}
                  />
                )}
              </div>
            </div>

            <RHFTextInput
              label="Bio"
              name="bio"
              type="text"
              placeholder="Enter bio"
              tooltip="Write the Bio"
            />
          </div>
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
                name="newPassword"
                placeholder="Enter new password"
                type="password"
              />
            </Col>
            <Col sm={12} md={6}>
              <RHFTextInput
                tooltip="Confirm new password is required"
                label="Confirm new password"
                name="confirmNewPassword"
                placeholder="Enter confirm new password"
                type="password"
              />
            </Col>
          </Row>
        </Item>
        <Item
          title="KOC Information"
          className="py-4 borderBottom"
          classTitle="title-purple"
        >
          <Row className="mb-2">
            <Col className="mt-2" sm={12} md={6}>
              <RHFTextInput label="TikTok username" name="tikTokId" />
            </Col>
            <Col className="mt-2" sm={12} md={6}>
              <RHFTextInput label="Instagram username" name="instagramId" />
            </Col>
            <Col className="mt-2" sm={12} md={6}>
              <RHFTextInput label="ID Facebook" name="facebookId" />
            </Col>
            <Col className="mt-2" sm={12} md={6}>
              <RHFTextInput label="Youtube channel" name="youtubeId" />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <RHFTagInput
                label="TikTok Hashtags"
                name="tiktokHashtags"
                placeholder=" Press enter to add new hashtag"
                notRequiredInSuggestions
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <RHFTagInput
                label="Instagram Hashtags"
                name="instagramHashtags"
                placeholder=" Press enter to add new hashtag"
                notRequiredInSuggestions
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <RHFTagInput
                label="Youtube Hashtags"
                name="youtubeHashtags"
                placeholder=" Press enter to add new hashtag"
                notRequiredInSuggestions
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <RHFTagInput
                label="Facebook Hashtags"
                name="facebookHashtags"
                placeholder=" Press enter to add new hashtag"
                notRequiredInSuggestions
              />
            </Col>
          </Row>
          <div className="mb-2">
            Category and Tier
            <Tooltip
              className={styles.tooltip}
              title={'Select Category and Tier'}
              icon="info"
              place={'right'}
            />
          </div>

          <Row className="mb-2">
            <Col sm={6}>
              <RHFDropdown
                name="category"
                data={categoriesQuery.isSuccess ? categoriesQuery.data : []}
                defaultValue="Select Category"
                tooltip="Tooltip text"
              />
            </Col>
            <Col sm={6}>
              <RHFDropdown
                name="tier"
                data={tiersQuery.isSuccess ? tiersQuery.data : []}
                defaultValue="Select Tier"
                tooltip="Tooltip text"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {platformsQuery?.data && (
                <RHFTagInput
                  label="Platforms"
                  name="platforms"
                  placeholder=" Press enter to add new platform"
                  tooltip="Platform is required"
                  suggestions={platformsQuery.data}
                />
              )}
            </Col>
          </Row>
        </Item>

        <div className="pt-5 d-flex justify-content-end align-items-center">
          <div>
            <p
              onClick={onClose}
              className={cn('button-white me-2', styles.btnCancel)}
            >
              Cancel
            </p>
          </div>
          <Decentralization permissions={['user-update', 'user-create']}>
            <div>
              <AsyncButton
                threeDotsWidth="20"
                threeDotsHeight="20"
                type="submit"
                className="button px-4"
                value="Save"
                notMaxWidth
                loading={
                  addUsersMutation.isLoading ||
                  editUsersMutation.isLoading ||
                  uploadImageMutation.isLoading
                }
              />
            </div>
          </Decentralization>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserForm;

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import styles from './OtherContentView.module.sass';
import cn from 'classnames';

import {
  RHFTextInput,
  RHFDropdown,
  RHFFile,
  AsyncButton,
} from '../../../../../../components';
import useSettingsOtherContent from '../../../../../../hooks/Setting/useSettingsOtherContent';
import {
  addOtherContents,
  createMyOtherContent,
  editOtherContents,
  extractDataImage,
  getOtherContentsById,
  uploadImage,
} from '../../../../../../services/api';
import { AddOtherContentSchema } from '../../../../../../utils/ValidateSchema';

const OtherContent = ({
  visibleOtherContent,
  setVisibleOtherContentView,
  id = '',
  KOCId,
}) => {
  const [image, setImage] = useState(null);

  const { otherContentPostTypes, otherContentPlatforms } =
    useSettingsOtherContent();

  const queryClient = useQueryClient();

  const defaultValues = useMemo(() => {
    return {
      title: '',
      description: '',
      likeCount: '',
      commentCount: '',
      shareCount: '',
      viewCount: '',
      evidenceUrl: '',
      type: '',
      platform: '',
    };
  }, []);

  // ------------------------------ Handle mode -----------------------------
  const isAddMode = useMemo(() => {
    return !id;
  }, [id]);
  // ------------------------------ Handle form -----------------------------
  const method = useForm({
    resolver: yupResolver(AddOtherContentSchema),
    defaultValues: defaultValues,
  });

  // ------------------------------ Add OtherContent -----------------------------

  const addOtherContentMutation = useMutation(({ KOCId, data }) => {
    if (KOCId === 'me') {
      return createMyOtherContent(data);
    }
    return addOtherContents(parseInt(KOCId), data);
  });

  // ------------------------------ Edit OtherContent -----------------------------
  const parseData = useCallback(
    (data) => {
      return {
        ...defaultValues,
        // if field is null, set default value
        title: data?.title,
        description: data?.description,
        likeCount: data?.like_count,
        commentCount: data?.comment_count,
        shareCount: data?.share_count,
        viewCount: data?.view_count,
        type: data?.type?.name,
        platform: data?.platform?.name,
        createTime: data?.create_time,
        evidenceUrl: data?.evidence_url,
      };
    },
    [defaultValues],
  );
  // get user data
  const otherContentQuery = useQuery({
    queryKey: ['otherContent', id],
    queryFn: () => getOtherContentsById(id),
    enabled: !isAddMode && !!id,
    select: (data) => parseData(data.data.data),
    onSuccess: (data) => {
      method.reset(data);
    },
  });

  const editOtherContentMutation = useMutation(({ id, data }) => {
    return editOtherContents(id, data);
  });

  // ------------------------------ Handle submit ------------------------------
  useEffect(() => {
    if (otherContentQuery.isSuccess && otherContentQuery?.data?.evidenceUrl) {
      setImage(otherContentQuery?.data?.evidenceUrl);
    }
  }, [otherContentQuery?.data?.evidenceUrl, otherContentQuery.isSuccess]);

  const uploadImageMutation = useMutation((data) => {
    return uploadImage(data);
  });

  const handleSubmit = useCallback(
    async (data) => {
      let evidenceUrl = image || '';
      if (
        !!evidenceUrl &&
        evidenceUrl !== otherContentQuery.data?.evidenceUrl
      ) {
        const uploadImageResponse = await uploadImageMutation.mutateAsync({
          file: data.evidenceUrl,
        });
        evidenceUrl = uploadImageResponse.data.data;
      }
      const body = {
        title: data?.title,
        description: data?.description,
        like_count: parseInt(data?.likeCount) || 0,
        comment_count: parseInt(data?.commentCount) || 0,
        share_count: parseInt(data?.shareCount) || 0,
        view_count: parseInt(data?.viewCount) || 0,
        save_count: parseInt(data?.saveCount) || 0,
        setting_type: data?.type,
        create_time: new Date().getTime(),
        setting_platform: data?.platform,
        evidence_url: evidenceUrl,
      };
      if (isAddMode) {
        return addOtherContentMutation.mutate(
          { KOCId, data: body },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['otherContents'],
              });
              setVisibleOtherContentView(false);
              toast.success('Add other content successfully');
            },
            onError: (error) => {
              toast.error(error.response.data.message, {
                autoClose: 5000,
              });
            },
          },
        );
      }

      return editOtherContentMutation.mutate(
        { id, data: body },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['otherContents'],
            });
            setVisibleOtherContentView(false);
            toast.success('Edit other content successfully');
          },
          onError: (error) => {
            toast.error(error.response.data.message, {
              autoClose: 5000,
            });
          },
        },
      );
    },
    [
      image,
      otherContentQuery.data?.evidenceUrl,
      isAddMode,
      editOtherContentMutation,
      id,
      uploadImageMutation,
      addOtherContentMutation,
      KOCId,
      queryClient,
      setVisibleOtherContentView,
    ],
  );

  const extractDataByImageMutation = useMutation(
    (data) => {
      return extractDataImage({ file: data });
    },
    {
      onSuccess: (data) => {
        const currentData = method.getValues();
        const formdata = {
          ...currentData,
          likeCount: data?.data?.data?.like_count || 0,
          commentCount: data?.data?.data?.comment_count || 0,
          shareCount: data?.data?.data?.share_count || 0,
          viewCount: data?.data?.data?.view_count || 0,
        };
        method.reset(formdata);
      },
    },
  );

  return (
    <div className={cn(styles.form, { [styles.active]: visibleOtherContent })}>
      <div className={cn('title-red', styles.title)}>Add Evidence</div>
      <div className={cn('mt-3 pt-3 border-top')}>
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(handleSubmit)}>
            <RHFFile
              name="evidenceUrl"
              label="Upload Evidence"
              tooltip="Upload Evidence or Paste URL is required"
              className="mb-1"
              title="Browse from your device"
              imgUrl={image}
              setImage={setImage}
              onChange={(data) => extractDataByImageMutation.mutate(data)}
            />
            <RHFDropdown
              name="platform"
              label="Platform"
              defaultValue="Select platform"
              classDropdownBody={styles.dropdownBody}
              data={otherContentPlatforms?.data?.map((item) => item.name)}
              tooltip="Platform is required"
            />
            <RHFDropdown
              name="type"
              label="Type"
              defaultValue="Select type"
              classDropdownBody={styles.dropdownBody}
              data={otherContentPostTypes?.data?.map((item) => item.name)}
              tooltip="Type is required"
            />
            <RHFTextInput
              name="title"
              label="Title"
              placeholder="Enter title"
              tooltip="Title is required"
            />
            <RHFTextInput
              name="description"
              label="Description"
              placeholder="Enter description"
              tooltip="Description"
            />
            <div className="d-flex row">
              <div className="col-6">
                <RHFTextInput
                  name="viewCount"
                  label="View count"
                  type="number"
                  placeholder="Enter view count"
                  tooltip="View count"
                  disabled
                />
              </div>
              <div className="col-6">
                <RHFTextInput
                  name="likeCount"
                  label="Like count"
                  type="number"
                  placeholder="Enter like count"
                  tooltip="Like count"
                  disabled
                />
              </div>
              <div className="col-6">
                <RHFTextInput
                  name="commentCount"
                  label="Comment count"
                  type="number"
                  placeholder="Enter comment count"
                  tooltip="Comment count"
                  disabled
                />
              </div>
              <div className="col-6">
                <RHFTextInput
                  name="shareCount"
                  label="Share count"
                  type="number"
                  placeholder="Enter share count"
                  tooltip="Share count"
                  disabled
                />
              </div>
            </div>
            <div className={styles.footer}>
              <p
                onClick={() => {
                  setVisibleOtherContentView(false);
                }}
                className={cn('button-stroke me-3', styles.button)}
              >
                Cancel
              </p>
              <AsyncButton
                threeDotsWidth="20"
                threeDotsHeight="20"
                type="submit"
                className={cn('button')}
                value="Save"
                notMaxWidth
                loading={
                  addOtherContentMutation.isLoading ||
                  editOtherContentMutation.isLoading ||
                  uploadImageMutation.isLoading
                }
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default OtherContent;

import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import cn from 'classnames';
import styles from './EvidenceForm.module.sass';

import {
  AsyncButton,
  RHFDropdown,
  Item,
  // RHFFile,
} from '../../../../components';

import RHFDropdownCustom from './RHFDropdownCustom';

import {
  getTikTokContentsByIdKOC,
  getInstagramContentsByIdKOC,
  getYoutubeContentsByIdKOC,
  getFacebookContentsByIdKOC,
  uploadContentEvidence,
  getOtherContentsByKOC,
} from '../../../../services/api';

import { UploadEvidenceSchema } from '../../../../utils/ValidateSchema';
import { toast } from 'react-toastify';
import { fromNow } from '../../../../utils/helpers';
import { filterHashTags } from '../../../../utils/helpers';

const EvidenceForm = ({ path }) => {
  // Props from Outlet
  const { onClose } = useOutletContext();

  // get id from url
  const { id } = useParams();
  const taskId = id.split('_')[0];
  const kocId = id.split('_')[1];
  const platform = id.split('_')[2];
  const type = id.split('_')[3];
  const evidenceId = id.split('_')[4];

  const parseData = useCallback((data) => {
    const contents = data.map((item) => {
      return {
        // avatarUrl: item.avatar_url,
        // onPlatformId: item.on_platform_id,
        ownerId: item.owner_id,
        title: filterHashTags(item.title),
        description: filterHashTags(item.description),
        coverImageUrl: item.cover_image_url,
        likeCount: item.like_count,
        commentCount: item.comment_count,
        shareCount: item.share_count,
        viewCount: item.view_count,
        saveCount: item.save_count,
        embedHtml: item?.embed_html,
        embedLink: item?.embed_link,
        createTime: item?.created_at,
        timeToNow:
          item?.platform === 'facebook'
            ? fromNow(Number(item.created_at))
            : fromNow(Number(item.created_at) * 1000),
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        id: item.id,
      };
    });
    return contents;
  }, []);

  // ------------------------------ Query data -----------------------------

  const [evidence, setEvidence] = useState([]);
  const [otherContent, setOtherContent] = useState([]);

  useQuery({
    queryKey: ['evidenceTiktok', kocId],
    queryFn: () => getTikTokContentsByIdKOC(kocId, { page: 1, limit: 100 }),
    enabled: platform === 'TikTok',
    select: (data) =>
      data.data.data.contents.map((item) => {
        return { ...item, evidence_type: 'contents' };
      }),
    onSuccess: (data) => setEvidence(data),
  });

  useQuery({
    queryKey: ['evidenceInstagram', kocId],
    queryFn: () => getInstagramContentsByIdKOC(kocId, { page: 1, limit: 100 }),
    enabled: platform === 'Instagram',
    select: (data) =>
      data.data.data.contents.map((item) => {
        return { ...item, evidence_type: 'contents' };
      }),
    onSuccess: (data) => setEvidence(data),
  });

  useQuery({
    queryKey: ['evidenceYoutube', kocId],
    queryFn: () => getYoutubeContentsByIdKOC(kocId, { page: 1, limit: 100 }),
    enabled: platform === 'Youtube',
    select: (data) =>
      data.data.data.contents.map((item) => {
        return { ...item, evidence_type: 'contents' };
      }),
    onSuccess: (data) => setEvidence(data),
  });

  useQuery({
    queryKey: ['evidenceFacebook', kocId],
    queryFn: () => getFacebookContentsByIdKOC(kocId, { page: 1, limit: 100 }),
    enabled: platform === 'Facebook',
    select: (data) =>
      data.data.data.contents.map((item) => {
        return { ...item, evidence_type: 'contents' };
      }),
    onSuccess: (data) => setEvidence(data),
  });

  useQuery({
    queryKey: ['evidenceOther'],
    queryFn: () =>
      getOtherContentsByKOC({
        ownerId: kocId,
        page: 1,
        limit: 100,
      }),
    select: (data) =>
      data.data.data.otherContents.map((item) => {
        return { ...item, evidence_type: 'other_contents' };
      }),
    onSuccess: (data) => setOtherContent(data),
  });

  // ------------------------------ Default form -----------------------------

  const defaultForm = {
    platform: platform,
    type: type,
  };

  // ------------------------------ Handle form -----------------------------

  const method = useForm({
    resolver: yupResolver(UploadEvidenceSchema),
    defaultValues: defaultForm,
  });

  useEffect(() => {
    method.reset({
      platform: platform,
      type: type,
      evidence: evidence.find((item) => item.id === evidenceId),
    });
  }, [evidence, otherContent, evidenceId, method, platform, type]);

  const queryClient = useQueryClient();

  const addUploadContentEvidenceMutation = useMutation(
    ({ id, contentId, evidenceType }) => {
      return uploadContentEvidence(id, contentId, evidenceType);
    },
  );

  const handleSubmit = (data) => {
    return addUploadContentEvidenceMutation.mutate(
      {
        id: taskId,
        contentId: data.evidence.id,
        evidenceType: data.evidence.evidence_type,
      },
      {
        onSuccess: () => {
          toast.success('Upload Evidence Success');
          onClose();
          queryClient.invalidateQueries('tasks');
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      },
    );
  };

  return (
    <div className={styles.list}>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          <Item title={'Select Evidence'} classTitle="title-red">
            <RHFDropdown
              name="platform"
              label="Platform"
              defaultValue="Select Platform"
              tooltip="Platform is required"
              disabled
            />
            <RHFDropdown
              name="type"
              label="Type"
              defaultValue="Select Type"
              tooltip="Type is required"
              disabled
            />
            <RHFDropdownCustom
              name="evidence"
              label="Select Evidence"
              defaultValue="Select Evidence"
              data={[...evidence, ...otherContent]}
              tooltip="Evidence is required"
              classDropdownBody={styles.dropdownBody}
            />
            {/* <RHFFile
              className={styles.field}
              name="evidence"
              title="Browser from your device"
              label="Upload Evidence"
              tooltip="Upload Evidence is required"
            /> */}
          </Item>
          <div className={styles.footer}>
            <p onClick={onClose} className={cn('button-white me-3')}>
              Reset
            </p>
            <AsyncButton
              threeDotsWidth="20"
              threeDotsHeight="20"
              type="submit"
              className={cn('button', styles.btnSubmit)}
              value="Save"
              // loading={
              // }
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EvidenceForm;

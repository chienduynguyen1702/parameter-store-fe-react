import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import cn from 'classnames';
import styles from './EvidenceForm.module.sass';

import {
  AsyncButton,
  Item,
  RHFFile,
  // RHFFile,
} from '../../../../components';

import {
  editPampering,
  getPampering,
  uploadImage,
} from '../../../../services/api';

import { toast } from 'react-toastify';

const PamperingEvidenceForm = ({ path }) => {
  // Props from Outlet
  const { onClose } = useOutletContext();
  const [image, setImage] = useState(null);

  const defaultForm = {
    evidence: null,
  };
  // get id from url
  const { id } = useParams();

  // ------------------------------ Query data -----------------------------

  const pamperingQuery = useQuery({
    queryKey: ['pampering', id],
    queryFn: () => getPampering(id),
    select: (data) => data.data.data,
    onSuccess: (data) => {
      method.reset({ evidence: data.evidence_url });
      setImage(data.evidence_url);
    },
  });

  // ------------------------------ Handle form -----------------------------
  const method = useForm({
    // resolver: yupResolver(UploadEvidenceSchema),
    defaultValues: defaultForm,
  });

  const queryClient = useQueryClient();

  const addUploadPamperingEvidenceMutation = useMutation(({ id, data }) => {
    return editPampering(id, data);
  });

  // ------------------------------ Upload image ------------------------------
  const uploadImageMutation = useMutation((data) => {
    return uploadImage(data);
  });

  const handleSubmit = async (data) => {
    if (
      !!data.evidence &&
      data.evidence !== pamperingQuery.data?.evidence_url
    ) {
      const uploadImageResponse = await uploadImageMutation.mutateAsync({
        file: data.evidence,
      });
      data.evidence = uploadImageResponse.data.data || '';
    }
    return addUploadPamperingEvidenceMutation.mutate(
      {
        id: pamperingQuery.data.id,
        data: {
          name: pamperingQuery.data.name,
          date: pamperingQuery.data.date,
          cost: pamperingQuery.data.cost,
          evidence_url: data.evidence,
          pic: pamperingQuery?.data?.pic?.name,
          category: pamperingQuery?.data?.category?.name,
          status: pamperingQuery?.data?.status?.name,
        },
      },
      {
        onSuccess: () => {
          toast.success('Upload Evidence Success');
          onClose();
          queryClient.invalidateQueries('pampering');
          queryClient.invalidateQueries('pamperings');
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      },
    );
  };

  return (
    <Item title="Upload Evidence" classTitle="title-red">
      <div className={styles.list}>
        <FormProvider {...method}>
          <form onSubmit={method.handleSubmit(handleSubmit)}>
            <RHFFile
              title="Browse from your device"
              name="evidence"
              tooltip="Upload OtherContent is required"
              className="mb-1"
              imgUrl={image}
              setImage={setImage}
            />
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
    </Item>
  );
};

export default PamperingEvidenceForm;

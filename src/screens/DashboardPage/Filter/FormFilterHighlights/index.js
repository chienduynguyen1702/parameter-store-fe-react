import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';
import { toast } from 'react-toastify';

import cn from 'classnames';

import {
  BorderBottomOuter,
  RHFCheckbox,
  RHFDate,
  RHFLabel,
} from '../../../../../components';

import useQueryString from '../../../../../hooks/useQueryString';

import { dateToUrl } from '../../../../../utils/helpers';

export default function FormFilter({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();
  const defaultValues = useMemo(() => {
    const now = new Date();

    return {
      from: new Date(now.getFullYear(), 0, 1),
      to: new Date(),
      facebook: queryString?.settings?.includes('facebook') || false,
      instagram: queryString?.settings?.includes('instagram') || false,
      youtube: queryString?.settings?.includes('youtube') || false,
      tiktok: queryString?.settings?.includes('tiktok') || false,
    };
  }, [queryString]);

  const method = useForm({ defaultValues });

  const onClose = () => {
    method.reset();
    const params = { ...queryString };
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }
    if (!!params.settings) {
      delete params.settings;
    }
    setQueryString(params);
    parentFc(false);
  };

  const handleSubmit = (data) => {
    if (data.from && data.to && data.from > data.to) {
      toast.error(`Please select the date again.`);
      return;
    }

    const params = { ...queryString };
    if (data.from) {
      delete params.from;
      params.from = dateToUrl(data.from);
    }
    if (data.to) {
      delete params.to;
      params.to = dateToUrl(data.to);
    }
    if (!!params.settings) {
      delete params.settings;
    }
    const platform = Object.keys(data)
      .filter((key) => key !== 'from' && key !== 'to')
      .filter((key) => data[key]);
    if (platform.length > 0) {
      params.settings = platform;
    }
    setQueryString(params);
    parentFc(false);
  };

  const platforms = [
    { content: 'Facebook', name: 'facebook' },
    { content: 'Instagram', name: 'instagram' },
    { content: 'Youtube', name: 'youtube' },
    { content: 'TikTok', name: 'tiktok' },
  ];

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <BorderBottomOuter>
          <RHFLabel label="Platform" tooltip="Search and filter by Platform" />
          {platforms.map((platform, index) => (
            <RHFCheckbox
              key={index}
              name={platform.name}
              content={platform.content}
            />
          ))}
        </BorderBottomOuter>
        <BorderBottomOuter>
          <RHFDate
            nameDate="from"
            label="From"
            tooltip="Select the starting date"
          />
          <RHFDate nameDate="to" label="To" tooltip="Select the ending date" />
        </BorderBottomOuter>
        <Stack direction="horizontal" className="mt-4">
          <p onClick={onClose} className={cn('button-white ms-auto')}>
            Reset
          </p>
          <button className={cn('button ms-3')}>Apply</button>
        </Stack>
      </form>
    </FormProvider>
  );
}

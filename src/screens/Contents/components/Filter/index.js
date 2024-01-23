import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';

import { RHFTagInput, RHFDate } from '../../../../components';

import useQueryString from '../../../../hooks/useQueryString';
import useListKOCs from '../../../../hooks/Suggestion/useListKOCs';
import useListHashtags from '../../../../hooks/Suggestion/useListHashtags';

export default function Filter({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();

  const defaultValues = useMemo(() => {
    return {
      from: queryString?.from ? moment(queryString?.from).toDate() : null,
      to: queryString?.to ? moment(queryString?.to).toDate() : null,
      kocs:
        typeof queryString?.kocs === 'string'
          ? [
              {
                id: '0',
                text: queryString?.kocs,
              },
            ]
          : queryString?.kocs?.map?.((item, index) => {
              return {
                id: index + '',
                text: item,
              };
            }),
      hashtags:
        typeof queryString?.hashtag === 'string'
          ? [
              {
                id: '0',
                text: queryString?.hashtag,
              },
            ]
          : queryString?.hashtag?.map?.((item, index) => {
              return {
                id: index + '',
                text: item,
              };
            }),
    };
  }, [queryString]);

  const method = useForm({ defaultValues });

  const handleApply = (data) => {
    // Delete all params if have
    const params = { ...queryString };
    if (!!params.kocs) {
      delete params.kocs;
    }
    if (!!params.hashtag) {
      delete params.hashtag;
    }
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }

    // Set new params from form data
    if (data.from && data.to && data.from > data.to) {
      toast.error(`Date from must be less than date to.`);
      return;
    }
    if (data.from) {
      params.from = moment(data.from).format('YYYY-MM-DD');
    }
    if (data.to) {
      params.to = moment(data.to).format('YYYY-MM-DD');
    }
    const kocs = data.kocs?.map((item) => item.text);
    if (kocs?.length) {
      params.kocs = kocs;
    }
    const hashtags = data.hashtags?.map((item) => item.text);
    if (hashtags?.length) {
      params.hashtag = hashtags;
    }
    setQueryString(params);
    parentFc(false);
  };

  const handleReset = () => {
    // Reset form
    method.reset();

    // Delete all params if have
    const params = { ...queryString };
    if (!!params.kocs) {
      delete params.kocs;
    }
    if (!!params.hashtag) {
      delete params.hashtag;
    }
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }

    // Set new params to url
    setQueryString(params);

    // Close filter
    parentFc(false);
  };

  const { listKOCs } = useListKOCs();
  const { listHashtags } = useListHashtags();

  return (
    <>
      <FormProvider {...method}>
        <form className="mt-4" onSubmit={method.handleSubmit(handleApply)}>
          <div className="borderTop borderBottom mb-4 pt-4">
            {listKOCs && (
              <RHFTagInput
                label="KOC"
                name="kocs"
                placeholder=" Press enter to add new koc"
                tooltip="KOC Name"
                suggestions={listKOCs?.data?.map((item) => {
                  return {
                    id: item.id,
                    text: item.name,
                  };
                })}
              />
            )}
          </div>
          <div className="borderBottom mb-4">
            {listHashtags && (
              <RHFTagInput
                label="Hashtag"
                name="hashtags"
                placeholder=" Press enter to add new hashtag"
                tooltip="Hashtag content"
                suggestions={listHashtags?.data}
              />
            )}
          </div>
          <div className="borderBottom mb-4">
            <RHFDate label="From" nameDate="from" />
          </div>
          <div className="borderBottom mb-4">
            <RHFDate label="To" nameDate="to" />
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <p className="button-stroke" onClick={handleReset}>
              Reset
            </p>
            <button className="button">Apply</button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

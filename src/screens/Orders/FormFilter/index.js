import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from 'react-bootstrap';

import cn from 'classnames';
import styles from './FormFilter.module.sass';

import {
  RHFCheckbox,
  RHFTagInput,
  RHFDate,
  RHFLabel,
} from '../../../components';
import { useQueryString } from '../../../hooks';

import { dateToUrl } from '../../../utils/helpers';
import { useListFilterOrders } from '../../../hooks/Data';

export default function FormFilter({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  const { listOrdersCode, listOrdersCity, listOrdersKOC, isSuccess } =
    useListFilterOrders();

  // get code from URL params
  const code = useMemo(() => {
    if (!queryString.code) {
      return [];
    }
    if (!Array.isArray(queryString.code)) {
      return [{ id: 0, text: queryString.code }];
    }
    return queryString.code.map((item, index) => {
      return { id: index, text: item };
    });
  }, [queryString.code]);
  // get city from URL params
  const city = useMemo(() => {
    if (!queryString.city) {
      return [];
    }
    if (!Array.isArray(queryString.city)) {
      return [{ id: 0, text: queryString.city }];
    }
    return queryString.city.map((item, index) => {
      return { id: index, text: item };
    });
  }, [queryString.city]);

  // get koc from URL params
  const koc = useMemo(() => {
    if (!queryString.koc) {
      return [];
    }

    if (!Array.isArray(queryString.koc)) {
      return [{ id: 0, text: queryString.koc }];
    }

    return queryString.koc.map((item, index) => {
      return { id: index, text: item };
    });
  }, [queryString.koc]);

  // get from date from URL params
  const from = useMemo(() => {
    if (!queryString.from) {
      return null;
    }
    return new Date(queryString.from);
  }, [queryString.from]);
  // get to date to URL params
  const to = useMemo(() => {
    if (!queryString.to) {
      return null;
    }
    return new Date(queryString.to);
  }, [queryString.to]);

  const platform = useMemo(() => {
    if (!queryString.platform) {
      return [];
    }

    if (!Array.isArray(queryString.platform)) {
      return [queryString.platform];
    }

    return [...queryString.platform];
  }, [queryString.platform]);

  const defaultValues = useMemo(() => {
    const defaultValues = {};
    platform.forEach((setting) => {
      defaultValues[setting] = true;
    });

    defaultValues['koc'] = koc;
    defaultValues['code'] = code;
    defaultValues['city'] = city;
    defaultValues['from'] = from;
    defaultValues['to'] = to;

    return defaultValues;
  }, [platform, koc, code, city, from, to]);

  const method = useForm({ defaultValues });
  const onClose = () => {
    method.reset();
    const params = { ...queryString };

    // Remove option search from URL params
    if (!!params.platform) {
      delete params.platform;
    }
    if (!!params.koc) {
      delete params.koc;
    }
    if (!!params.code) {
      delete params.code;
    }
    if (!!params.city) {
      delete params.city;
    }
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }
    setQueryString(params);
    parentFc(false);
  };
  const handleSubmit = (data) => {
    const params = {
      ...queryString,
    };

    if (!!params.platform) {
      delete params.platform;
    }
    if (params.koc) {
      delete params.koc;
    }
    if (params.city) {
      delete params.city;
    }
    if (params.code) {
      delete params.code;
    }

    let koc = [];
    let code = [];
    let city = [];

    data.koc.forEach((value) => {
      koc.push(value.text);
    });
    data.code.forEach((value) => {
      code.push(value.text);
    });
    data.city.forEach((value) => {
      city.push(value.text);
    });
    if (koc.length > 0) {
      params.koc = koc;
    }
    if (city.length > 0) {
      params.city = city;
    }
    if (code.length > 0) {
      params.code = code;
    }
    if (data.from) {
      params.from = dateToUrl(data.from);
    }
    if (data.to) {
      params.to = dateToUrl(data.to);
    }
    params.page = 1;
    setQueryString(params);
    parentFc(false);

    if (!!params.platform) {
      delete params.platform;
    }
    // set params for platform
    const platform = Object.keys(data)
      .filter(
        (key) =>
          key !== 'from' &&
          key !== 'to' &&
          key !== 'koc' &&
          key !== 'code' &&
          key !== 'city',
      )
      .filter((key) => data[key]);

    if (platform.length > 0) {
      params.platform = platform;
    }
    params.page = 1;
    setQueryString(params);
    parentFc(false);
  };
  return (
    <div className={cn(styles.list, 'borderTop pt-3')}>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(handleSubmit)}>
          {isSuccess && (
            <>
              <RHFTagInput
                label="Delivery Code"
                name="code"
                placeholder=" Select more"
                tooltip="Search and filter by Delivery Code"
                suggestions={listOrdersCode}
              />
              <RHFTagInput
                label="KOC"
                name="koc"
                placeholder=" Select more"
                tooltip="Search and filter by KOCs"
                suggestions={listOrdersKOC}
              />
              <RHFTagInput
                label="City"
                name="city"
                placeholder=" Select more"
                tooltip="Search and filter by City"
                suggestions={listOrdersCity}
              />
            </>
          )}

          <RHFDate
            label="From"
            tooltip="Select the starting date"
            className="borderBottom borderTop pt-3"
            nameDate="from"
          />
          <RHFDate
            label="To"
            tooltip="Select the ending date"
            className="borderBottom mt-3"
            nameDate="to"
          />
          <div className={cn(styles.item)}>
            <div className={styles.checkboxBorder}>
              <RHFLabel
                label="Platform"
                tooltip="Search and filter by Platform"
              />
              <RHFCheckbox
                name={'TikTokShop'}
                content={'TikTokShop'}
                className={styles.colorText}
              />
              <RHFCheckbox
                name={'Ecomobi'}
                content={'Ecomobi'}
                className={styles.colorText}
              />
            </div>
          </div>
          <Stack direction="horizontal">
            <p onClick={onClose} className={cn('button-white', styles.btn)}>
              Reset
            </p>
            <button className={cn('button ms-auto', styles.btn)}>Apply</button>
          </Stack>
        </form>
      </FormProvider>
    </div>
  );
}

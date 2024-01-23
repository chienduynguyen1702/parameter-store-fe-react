import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import useQueryString from '../../../../../../hooks/useQueryString';

import {
  getListProducts,
  getTaskSettings,
} from '../../../../../../services/api';
import moment from 'moment';
import { toast } from 'react-toastify';

export default function useFormFilter({ parentFc }) {
  // use QueryString to get URL params and set URL params
  const { queryString, setQueryString } = useQueryString();

  const platformsQuery = useQuery({
    queryKey: ['user-platform'],
    queryFn: () => getTaskSettings({ type: 'user-platform' }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const typesQuery = useQuery({
    queryKey: ['task-type'],
    queryFn: () => getTaskSettings({ type: 'task-type' }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const statusQuery = useQuery({
    queryKey: ['task-status'],
    queryFn: () => getTaskSettings({ type: 'task-status' }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          color: item.color,
          type: item.type,
        };
      }),
  });

  const productsQuery = useQuery({
    queryKey: ['total-products'],
    queryFn: () => getListProducts({ page: 1, limit: 1000 }),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.products.map((item) => {
        return {
          id: item.id,
          text: item.title,
        };
      }),
  });

  // get settings from URL params
  const settings = useMemo(() => {
    if (!queryString.settings) {
      return [];
    }
    if (!Array.isArray(queryString.settings)) {
      return [queryString.settings];
    }
    return [...queryString.settings];
  }, [queryString.settings]);

  // get hashtags from URL params
  const hashtags = useMemo(() => {
    if (!queryString.hashtags) {
      return [];
    }

    if (!Array.isArray(queryString.hashtags)) {
      return [{ id: 0, text: queryString.hashtags }];
    }

    return queryString.hashtags.map((item, index) => {
      return { id: index, text: item };
    });
  }, [queryString.hashtags]);

  // get  affiliate platform from URL params
  const affiliatePlatform = useMemo(() => {
    if (!queryString.affiliatePlatform) {
      return null;
    }
    return queryString.affiliatePlatform;
  }, [queryString.affiliatePlatform]);

  // get products from URL params
  const products = useMemo(() => {
    if (!queryString.products) {
      return [];
    }
    return productsQuery?.data?.filter((product) =>
      queryString.products.includes(product.id),
    );
  }, [queryString.products, productsQuery?.data]);

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

  // set default values for filter
  const defaultValues = useMemo(() => {
    const defaultValues = {};

    // Handle default settings
    const idSettings = [7, 8, 9, 10, 13, 16, 18, 19, 20, 21, 22];
    idSettings.forEach((setting) => {
      defaultValues[setting] = false;
    });
    settings.forEach((setting) => {
      defaultValues[setting] = true;
    });

    defaultValues['hashtags'] = hashtags;
    defaultValues['affiliatePlatform'] = affiliatePlatform;
    defaultValues['products'] = productsQuery?.data?.filter((product) =>
      products.includes(product.id),
    );
    defaultValues['from'] = from;
    defaultValues['to'] = to;
    return defaultValues;
  }, [
    settings,
    hashtags,
    from,
    to,
    affiliatePlatform,
    productsQuery.data,
    products,
  ]);

  const onClose = () => {
    const params = { ...queryString };
    if (!!params.settings) {
      delete params.settings;
    }
    if (!!params.hashtags) {
      delete params.hashtags;
    }
    if (!!params.affiliatePlatform) {
      delete params.affiliatePlatform;
    }
    if (!!params.products) {
      delete params.products;
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
    if (data.from && data.to && data.from > data.to) {
      toast.error(`Please select the date again.`);
      return;
    }
    const params = { ...queryString };
    if (!!params.settings) {
      delete params.settings;
    }

    // Set params for hashtag
    if (data.hashtags) {
      const hashtags = data.hashtags.map((hashtag) => hashtag.text);
      params.hashtags = hashtags;
    }

    // Set params for affiliate platform
    if (data.affiliatePlatform) {
      params.affiliatePlatform = data.affiliatePlatform;
    }

    // Set params for products
    if (data.products) {
      const products = data.products.map((product) => product.id);
      params.products = products;
    }

    // Set params for date from
    if (data.from) {
      params.from = moment(data.from).format('YYYY-MM-DD');
    }

    // Set params for date to
    if (data.to) {
      params.to = moment(data.to).format('YYYY-MM-DD');
    }

    // set params for settings
    const settings = Object.keys(data)
      .filter(
        (key) =>
          key !== 'from' &&
          key !== 'to' &&
          key !== 'hashtags' &&
          key !== 'affiliatePlatform' &&
          key !== 'products',
      )
      .filter((key) => data[key]);

    if (settings.length > 0) {
      params.settings = settings;
    }

    params.page = 1;
    setQueryString(params);
    parentFc(false);
  };

  return {
    platformsQuery,
    typesQuery,
    statusQuery,
    productsQuery,
    handleSubmit,
    defaultValues,
    onClose,
  };
}

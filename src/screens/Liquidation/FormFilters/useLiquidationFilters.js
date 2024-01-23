import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import moment from 'moment';

import useQueryString from '../../../hooks/useQueryString';
import { scrollToTop } from '../../../utils/helpers';
import { getListAgency, getListSettings } from '../../../services/api';

export default function useLiquidationSettings({ parentFc }) {
  const { queryString, setQueryString } = useQueryString();

  // parse settings data to match with RHFCheckbox
  const parseData = useCallback((data) => {
    const settings = data.map((item) => {
      return {
        id: item.id,
        name: item.name,
      };
    });
    return settings;
  }, []);

  // Get liquidation category settings
  const liquidationCategory = useQuery({
    queryKey: ['liquidation-category'],
    queryFn: () => getListSettings({ type: 'liquidation-category' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  // Get list receivers
  const listReceivers = useQuery({
    queryKey: ['list-receivers'],
    queryFn: () => getListAgency(),
    staleTime: 10 * 1000,
    select: (data) =>
      data.data.data.map((item) => {
        return {
          id: item.id,
          text: item.username,
        };
      }),
  });

  // Get liquidation P.I.C settings
  const liquidationPIC = useQuery({
    queryKey: ['liquidation-pic'],
    queryFn: () => getListSettings({ type: 'liquidation-pic' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  // Get liquidation status settings
  const liquidationStatus = useQuery({
    queryKey: ['liquidation-status'],
    queryFn: () => getListSettings({ type: 'liquidation-status' }),
    staleTime: 10 * 1000,
    select: (data) => parseData(data.data.data),
  });

  // get Settings from URL params
  const settings = useMemo(() => {
    if (!queryString.settings) {
      return [];
    }
    if (!Array.isArray(queryString.settings)) {
      return [queryString.settings];
    }
    return [...queryString.settings];
  }, [queryString.settings]);

  // get Receivers from URL params
  const receivers = useMemo(() => {
    if (!queryString.agency) {
      return [];
    }
    if (!Array.isArray(queryString.agency)) {
      return [{ id: '0', text: queryString.agency }];
    }
    return queryString.agency.map((item, index) => {
      return {
        id: index + '',
        text: item,
      };
    });
  }, [queryString.agency]);

  // get from and to from URL params
  const from = useMemo(() => {
    if (!queryString.from) {
      return '';
    }
    return queryString.from;
  }, [queryString.from]);

  const to = useMemo(() => {
    if (!queryString.to) {
      return '';
    }
    return queryString.to;
  }, [queryString.to]);

  const defaultValues = useMemo(() => {
    const defaultValues = {};

    if (receivers.length > 0) {
      defaultValues.receivers = receivers;
    }

    if (from !== '') {
      defaultValues.from = from;
    }

    if (to !== '') {
      defaultValues.to = to;
    }

    settings.forEach((setting) => {
      defaultValues[setting] = true;
    });

    return defaultValues;
  }, [settings, receivers, from, to]);

  const onClose = () => {
    const params = { ...queryString };
    if (!!params.settings) {
      delete params.settings;
    }
    if (!!params.agency) {
      delete params.agency;
    }
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }
    params.page = 1;
    setQueryString(params);
    parentFc(false);
    scrollToTop();
  };

  const handleSubmit = (data) => {
    const params = { ...queryString };
    // Clear all params in query string
    if (!!params.settings) {
      delete params.settings;
    }
    if (!!params.agency) {
      delete params.agency;
    }
    if (!!params.from) {
      delete params.from;
    }
    if (!!params.to) {
      delete params.to;
    }

    // Set new params to query string
    if (data.receivers && data.receivers.length > 0) {
      params.agency = data.receivers.map((item) => item.text);
    }

    if (data.from) {
      params.from = moment(data.from).format('YYYY-MM-DD');
    }

    if (data.to) {
      params.to = moment(data.to).format('YYYY-MM-DD');
    }

    const settings = Object.keys(data)
      .filter((key) => key !== 'from' && key !== 'to' && key !== 'receivers')
      .filter((key) => data[key]);
    if (settings.length > 0) {
      params.settings = settings;
    }

    params.page = 1;
    setQueryString(params);
    parentFc(false);
    scrollToTop();
  };
  return {
    liquidationCategory,
    listReceivers,
    liquidationPIC,
    liquidationStatus,
    handleSubmit,
    defaultValues,
    onClose,
  };
}

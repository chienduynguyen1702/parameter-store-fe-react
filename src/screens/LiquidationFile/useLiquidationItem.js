import { useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router';

import useQueryString from '../../hooks/useQueryString';

export default function useLiquidationItem() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  //------Handle model add or edit liquidation or setting or edit liquidation file--------------
  const addLiquidationItemMatch = useMatch(
    '/liquidation-file/add-liquidation-item',
  );
  const isAddMode = useMemo(
    () => addLiquidationItemMatch !== null,
    [addLiquidationItemMatch],
  );

  const editLiquidationItemMatch = useMatch(
    '/liquidation-file/edit-liquidation-item/:id',
  );
  const isEditMode = useMemo(
    () => editLiquidationItemMatch !== null,
    [editLiquidationItemMatch],
  );

  const viewLiquidationItemMatch = useMatch(
    '/liquidation-file/view-liquidation-item/:id',
  );
  const isViewMode = useMemo(
    () => viewLiquidationItemMatch !== null,
    [viewLiquidationItemMatch],
  );

  const settingMatch = useMatch('/liquidation-file/settings');
  const isSettingMode = useMemo(() => settingMatch !== null, [settingMatch]);

  const editLiquidationFileMode = useMatch(
    '/liquidation-file/edit-liquidation-file/:id',
  );
  const isEditFileMode = useMemo(
    () => editLiquidationFileMode !== null,
    [editLiquidationFileMode],
  );

  //------------------Handle close modal----------------------------------
  const handleCloseModal = () => {
    navigate({
      pathname: '/liquidation-file',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  //------------------Handle navigate create----------------------------------
  const navigateCreate = () => {
    navigate({
      pathname: '/liquidation-file/add-liquidation-item',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  //------------------Handle navigate setting----------------------------------
  const navigateSetting = () => {
    navigate({
      pathname: '/liquidation-file/settings',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  return {
    isAddMode,
    isEditMode,
    isViewMode,
    isSettingMode,
    isEditFileMode,
    handleCloseModal,
    navigateCreate,
    navigateSetting,
  };
}

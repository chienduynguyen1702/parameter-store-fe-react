import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ConfirmContent,
  Modal,
  PopoverEditSetting,
} from '../../../../components';
import PopoverEditItem from './PopoverEditItem';

import { handleLongNumber } from '../../../../utils/helpers';

import { updateLiquidationItem } from '../../../../services/api';
import { useNavigate } from 'react-router';
import useQueryString from '../../../../hooks/useQueryString';

const Row = ({
  item,
  listCategory,
  listPIC,
  listStatus,
  archiveMutation,
  duplicateMutation,
}) => {
  // Handle Confirm Modal
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  const [isDuplicateMode, setIsDuplicateMode] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { queryString, parseQueryString } = useQueryString();

  const updateLiquidationMutation = useMutation(({ id, data }) => {
    return updateLiquidationItem(id, data);
  });

  const handleUpdateSetting = (newSetting, typeSetting) => {
    const body = {
      [typeSetting]: newSetting,
    };
    return updateLiquidationMutation.mutate(
      { id: item.id, data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('liquidations');
          toast.success('Edit Liquidation successfully');
        },
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
        },
      },
    );
  };

  const handleArchive = (id) => {
    archiveMutation.mutate(id, {
      onSuccess: () => {
        setIsArchiveMode(false);
      },
    });
  };

  const handleDuplicate = (id) => {
    duplicateMutation.mutate(id, {
      onSuccess: () => {
        setIsDuplicateMode(false);
      },
    });
  };

  const navigateEdit = (id) => {
    navigate({
      pathname: `/liquidation-file/edit-liquidation-item/${id}`,
      search: `?${parseQueryString(queryString)}`,
    });
  };

  const navigateView = (id) => {
    navigate({
      pathname: `/liquidation-file/view-liquidation-item/${id}`,
      search: `?${parseQueryString(queryString)}`,
    });
  };

  return (
    <>
      <Modal
        visible={isArchiveMode || isDuplicateMode}
        onClose={() => {
          setIsArchiveMode(false);
          setIsDuplicateMode(false);
        }}
      >
        {isArchiveMode && (
          <ConfirmContent
            title="Confirm"
            content="Are you sure you want to 
              archive
             this liquidation item?"
            contentBtnSubmit="Archive"
            contentBtnCancel="Cancel"
            isLoading={archiveMutation.isLoading}
            onClose={() => setIsArchiveMode(false)}
            handleSubmit={() => handleArchive(item.id)}
          />
        )}
        {isDuplicateMode && (
          <ConfirmContent
            title="Confirm"
            content="Are you sure you want to 
              duplicate this liquidation item?"
            contentBtnSubmit="Duplicate"
            contentBtnCancel="Cancel"
            isLoading={duplicateMutation.isLoading}
            onClose={() => setIsDuplicateMode(false)}
            handleSubmit={() => handleDuplicate(item.id)}
          />
        )}
      </Modal>
      <div className="desktop tableRow">
        {/* Name */}
        <p className="tableCell py-4 ps-2 roundedLeft">{item.name}</p>
        {/* Description */}
        <p className="tableCell fw-light">{item.description}</p>
        {/* Category */}
        <div className="tableCell">
          <PopoverEditSetting
            name={'category'}
            setting={item?.category}
            listSettings={listCategory}
            handleUpdate={handleUpdateSetting}
          />
        </div>
        {/* Total cost */}
        <p className="tableCell">{handleLongNumber(item.cost)}</p>
        {/* P.I.C */}
        <div className="tableCell">
          <PopoverEditSetting
            name={'pic'}
            setting={item?.pic}
            listSettings={listPIC}
            handleUpdate={handleUpdateSetting}
          />
        </div>
        {/* Receiver */}
        <div className="tableCell">
          <p
            className="status text-white"
            style={{
              backgroundColor: item.receiver?.color || '#666',
            }}
          >
            {item.receiver.name}
          </p>
        </div>
        {/* Status */}
        <div className="tableCell">
          <PopoverEditSetting
            name={'status'}
            setting={item?.status}
            listSettings={listStatus}
            handleUpdate={handleUpdateSetting}
          />
        </div>
        {/* Last updated */}
        <p className="tableCell colorN4">{item.lastUpdated}</p>
        {/* Three dots */}
        <div className="tableCell roundedRight">
          <PopoverEditItem
            setIsArchiveMode={setIsArchiveMode}
            setIsDuplicateMode={setIsDuplicateMode}
            navigateEdit={navigateEdit}
            navigateView={navigateView}
            id={item.id}
          />
        </div>
      </div>
      <div className="mobile">
        {/* Name  */}
        <div className="item">
          <p className="name">{item.name}</p>
          <PopoverEditItem
            setIsArchiveMode={setIsArchiveMode}
            setIsDuplicateMode={setIsDuplicateMode}
            id={item.id}
          />
        </div>
        {/* Status */}
        <div className="item pb-4">
          <PopoverEditSetting
            name="status"
            itemId={item.id}
            handleUpdate={handleUpdateSetting}
            setting={item?.status}
            listSettings={listStatus}
          />
          <p className="colorN4 fs-7">{item.lastUpdated}</p>
        </div>
        {/* Description */}
        <div className="item">
          <p className="color4">Description</p>
          <p className="fw-light">{item.description}</p>
        </div>
        {/* Category */}
        <div className="item">
          <p className="color4">Category</p>
          <PopoverEditSetting
            name="category"
            itemId={item.id}
            handleUpdate={handleUpdateSetting}
            setting={item?.category}
            listSettings={listCategory}
          />
        </div>
        {/* Total */}
        <div className="item">
          <p className="color4">Total</p>
          <p>{handleLongNumber(item.cost)} VND</p>
        </div>
        {/* PIC */}
        <div className="item">
          <p className="color4">P.I.C</p>
          <PopoverEditSetting
            name="pic"
            itemId={item.id}
            handleUpdate={handleUpdateSetting}
            setting={item?.pic}
            listSettings={listPIC}
          />
        </div>
        {/* Receiver */}
        <div className="item">
          <p className="color4">Receiver</p>
          <p
            className="status text-white"
            style={{
              backgroundColor: item.receiver?.color || '#666',
            }}
          >
            {item.receiver.name}
          </p>
        </div>
      </div>
    </>
  );
};

export default Row;

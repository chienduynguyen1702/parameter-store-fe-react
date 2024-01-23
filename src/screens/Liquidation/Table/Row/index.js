import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import cn from 'classnames';
import styles from './Row.module.sass';

import PopoverEditItem from './PopoverEditItem';
import {
  ConfirmContent,
  Modal,
  PopoverEditSetting,
} from '../../../../components';

import { handleLongNumber } from '../../../../utils/helpers';
import { updateLiquidation } from '../../../../services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Row = ({
  item,
  listCategory,
  listPIC,
  listStatus,
  archiveMutation,
  duplicateMutation,
}) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Handle Confirm Modal
  const [isArchiveMode, setIsArchiveMode] = useState(false);
  const [isDuplicateMode, setIsDuplicateMode] = useState(false);

  const handleArchive = (id) => {
    archiveMutation.mutate(id, {
      onSuccess: () => {
        setIsArchiveMode(false);
        toast.success('Liquidation archived successfully');
      },
    });
  };

  const handleDuplicate = (id) => {
    duplicateMutation.mutate(id, {
      onSuccess: () => {
        setIsDuplicateMode(false);
        toast.success('Liquidation duplicated successfully');
      },
    });
  };

  const handleNavigateLiquidationFile = () => {
    navigate(`/liquidation-file?fileId=${item.id}`);
  };

  const updateLiquidationMutation = useMutation(({ id, data }) => {
    return updateLiquidation(id, data);
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
           this liquidation?"
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
            duplicate this liquidation file?"
            contentBtnSubmit="Duplicate"
            contentBtnCancel="Cancel"
            isLoading={duplicateMutation.isLoading}
            onClose={() => setIsDuplicateMode(false)}
            handleSubmit={() => handleDuplicate(item.id)}
          />
        )}
      </Modal>
      {/* Desktop */}
      <div className="tableRow" key={`row-pc-${item.id}`}>
        {/* Name */}
        <p
          className="d-table-cell tableCell py-4 roundedLeft cursor-pointer"
          onClick={handleNavigateLiquidationFile}
        >
          {item.name}
        </p>
        {/* Category */}
        <div className="d-table-cell tableCell">
          <PopoverEditSetting
            itemId={item.id}
            handleUpdate={handleUpdateSetting}
            name="category"
            setting={item?.category}
            listSettings={listCategory}
          />
        </div>
        {/* Total cost */}
        <p className="d-table-cell tableCell">
          {handleLongNumber(item.cost)} VND
        </p>
        {/* P.I.C */}
        <div className="d-table-cell tableCell ">
          <PopoverEditSetting
            itemId={item.id}
            handleUpdate={handleUpdateSetting}
            name="pic"
            setting={item?.pic}
            listSettings={listPIC}
          />
        </div>
        {/* Receiver */}
        <div className="d-table-cell tableCell ">
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
        <div className="d-table-cell tableCell ">
          <PopoverEditSetting
            itemId={item.id}
            handleUpdate={handleUpdateSetting}
            name="status"
            setting={item?.status}
            listSettings={listStatus}
          />
        </div>
        {/* Last updated */}
        <p className="d-table-cell tableCell colorN4">{item.lastUpdated}</p>
        {/* Three dots */}
        <div className="d-table-cell tableCell roundedRight">
          <PopoverEditItem
            setIsArchiveMode={setIsArchiveMode}
            setIsDuplicateMode={setIsDuplicateMode}
            id={item.id}
          />
        </div>
      </div>
      {/* Mobile */}
      <div className="d-block d-sm-none pb-4 mt-3 borderBottom">
        <div>
          {/* Name  */}
          <div className="d-flex justify-content-between my-1 cursor-pointer">
            <p
              className={cn(
                'd-table-cell tableCell textOverFlow p-0',
                styles.nameCard,
              )}
              onClick={handleNavigateLiquidationFile}
            >
              {item.name}
            </p>
            <PopoverEditItem
              setIsArchiveMode={setIsArchiveMode}
              setIsDuplicateMode={setIsDuplicateMode}
              id={item.id}
            />
          </div>
          {/* Status */}
          <div className="d-flex justify-content-between my-1">
            <PopoverEditSetting
              name="status"
              itemId={item.id}
              handleUpdate={handleUpdateSetting}
              setting={item?.status}
              listSettings={listStatus}
            />
            <p className="colorN4 fs-7">{item.lastUpdated}</p>
          </div>
        </div>
        <div>
          {/* Category */}
          <div className="d-flex justify-content-between my-2">
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
          <div className="d-flex justify-content-between my-2">
            <p className="color4">Total</p>
            <div>{handleLongNumber(item.cost)} VND</div>
          </div>
          {/* PIC */}
          <div className="d-flex justify-content-between my-2">
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
          <div className="d-flex justify-content-between my-2">
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
      </div>
    </>
  );
};

export default Row;

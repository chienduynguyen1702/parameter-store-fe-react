import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';

import { Popover, OverlayTrigger } from 'react-bootstrap';

import styles from '.././Calendar.module.sass';
import '.././CalendarFork.sass';
import cn from 'classnames';

import { TextInput } from '../../../../../components';
import { handleLongNumber } from '../../../../../utils/helpers';

const Popup = ({
  target,
  content,
  id,
  archivePamperingMutation,
  editPampering,
  children,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen(false);

  // Handle archive pampering
  const handleArchivePampering = (id) => {
    archivePamperingMutation.mutate(id, {
      onSuccess: () => {
        togglePopover();
        toast.success('Pampering archived successfully');
      },
    });
  };

  const popover = (
    <Popover
      id={`popover-${id}`}
      onClick={() => {
        setPopoverOpen(true);
      }}
      className={cn(styles.popover)}
    >
      <Popover.Body className={cn(styles.popBody)}>
        <div className={cn(styles.titleArea)}>
          {/* Title Pampering */}
          <p className={cn(styles.titlePop)}>{content?.pamperingTitle}</p>
          <div className={cn(styles.iconArea)}>
            {/* Archive button  */}
            <BiArchiveIn
              size={18}
              className={cn(styles.iconArchive, styles.iconControl)}
              onClick={() => {
                handleArchivePampering(id);
              }}
            />
            {/* Edit button  */}
            <AiFillEdit
              size={18}
              className={cn(styles.iconControl)}
              onClick={(e) => {
                e.stopPropagation();
                togglePopover();
                editPampering(id);
              }}
            />
          </div>
        </div>
        <div className={cn(styles.popContent)}>
          <div>
            <b>P.I.C: </b>
            {content?.pic?.name}
          </div>
          <div>
            <b>Cost: </b>
            {parseInt(content?.cost).toLocaleString('en-US')}
          </div>
          <div>
            <b>Status: </b>
            {content?.status?.name}
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  if (!target) {
    return null;
  }
  return (
    <OutsideClickHandler onOutsideClick={() => togglePopover()}>
      <OverlayTrigger
        trigger="click"
        placement="auto"
        overlay={popover}
        show={popoverOpen}
        onToggle={setPopoverOpen}
        onHide={() => setPopoverOpen(false)}
      >
        {children}
      </OverlayTrigger>
    </OutsideClickHandler>
  );
};

export default Popup;

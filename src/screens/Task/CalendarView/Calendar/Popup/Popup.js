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

const Popup = ({
  target,
  content,
  id,
  archiveTaskMutation,
  editTask,
  children,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen(false);

  // Handle archive task
  const handleArchiveTask = (id) => {
    archiveTaskMutation.mutate(id, {
      onSuccess: () => {
        togglePopover();
        toast.success('Task archived successfully');
      },
    });
  };

  const popover = (
    <Popover
      id={`popover-${id}`}
      onClick={() => {
        setPopoverOpen(true);
      }}
    >
      <Popover.Body className={cn(styles.popBody)}>
        <div className={cn(styles.titleArea)}>
          {/* Title Task */}
          <p className={cn(styles.titlePop)}>
            {content?.deadline}: {content?.taskTitle}
          </p>
          <div className={cn(styles.iconArea)}>
            {/* Archive button  */}
            <BiArchiveIn
              size={18}
              className={cn(styles.iconArchive, styles.iconControl)}
              onClick={() => {
                handleArchiveTask(id);
              }}
            />
            {/* Edit button  */}
            <AiFillEdit
              size={18}
              className={cn(styles.iconControl)}
              onClick={(e) => {
                e.stopPropagation();
                togglePopover();
                editTask(id);
              }}
            />
          </div>
        </div>
        <div className={cn(styles.popContent)}>
          <div>
            <b>Name: </b>
            {content?.name}
          </div>
          <div>
            <b>Description: </b>
            {content?.description}
          </div>
          <div>
            <b>KOC: </b>
            {content?.koc}
          </div>
          <div>
            <b>Platform: </b>
            {content?.platform?.name}
          </div>
          <div>
            <b>Type: </b>
            {content?.type?.name}
          </div>
          <div>
            <b>Hashtag: </b>
            {content?.hashtag?.join(', ')}
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

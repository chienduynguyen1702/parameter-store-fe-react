import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';

import { Popover, OverlayTrigger } from 'react-bootstrap';

import styles from '.././Calendar.module.sass';
import '.././CalendarFork.sass';
import cn from 'classnames';

import { TextInput } from '../../../../../../components';

const Popup = ({ target, content, id, children }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => setPopoverOpen(false);

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
        </div>
        <div className={cn(styles.popContent)}>
          <TextInput
            label="Name"
            value={content?.name}
            disabled
            classLabel={styles.label}
            classInput={styles.input}
          />
          <TextInput
            label="Description"
            value={content?.description}
            disabled
            classLabel={styles.label}
            classInput={styles.input}
          />
          <TextInput
            label="KOC"
            value={content?.koc}
            disabled
            classLabel={styles.label}
            classInput={styles.input}
          />
          <TextInput
            label="Platform"
            value={content?.platform?.name}
            disabled
            classLabel={styles.label}
            classInput={styles.input}
          />
          <TextInput
            label="Type"
            value={content?.type?.name}
            disabled
            classLabel={styles.label}
            classInput={styles.input}
          />
          <TextInput
            label="Hashtag"
            value={content?.hashtag?.join(', ')}
            disabled
            classLabel={styles.label}
            classInput={styles.input}
          />
          <TextInput
            label="Status"
            value={content?.status?.name}
            disabled
            classLabel={styles.label}
            classInput={styles.input}
          />
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

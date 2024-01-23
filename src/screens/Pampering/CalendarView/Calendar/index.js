import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router';

import cn from 'classnames';
import styles from './Calendar.module.sass';
import './CalendarFork.sass';

import Popup from './Popup/Popup';

import { useListPamperingCalendar } from '../../../../hooks/Data';

import { useQueryString } from '../../../../hooks';

export default function Calendar() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  // Query String
  const { queryString, parseQueryString } = useQueryString();

  // List Pampering Calendar Query
  const { listEvents, handleDateChange, archivePamperingMutation } =
    useListPamperingCalendar();

  const editPampering = (id) => {
    navigate({
      pathname: `/pamperings/calendar-view/edit-pampering/${id}`,
      search: `?${parseQueryString(queryString)}`,
    });
  };

  // If params changed, update the calendar view with the new params
  useEffect(() => {
    if (queryString.from && queryString.to) {
      const startDate = moment(queryString.from); // Set your start date
      const endDate = moment(queryString.to); // Set your end date

      const targetDate = startDate
        .clone()
        .add(endDate.diff(startDate) / 2, 'milliseconds');

      calendarRef?.current?.getApi().gotoDate(targetDate.toDate());
    }
  }, [queryString?.from, queryString?.to, navigate]);

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        initialDate={new Date()}
        plugins={[dayGridPlugin]}
        events={listEvents ? listEvents : []}
        customButtons={{
          prev: {
            text: 'Previous',
            click: () => calendarRef.current.getApi().prev(),
          },
          next: {
            text: 'Next',
            click: () => calendarRef.current.getApi().next(),
          },
        }}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next',
          center: 'title',
          end: '',
        }}
        datesSet={(arg) => handleDateChange(arg.start, arg.end)}
        eventDidMount={(info) => {
          const event = (
            <>
              <Popup
                target={info?.el}
                content={info?.event?._def?.extendedProps}
                archivePamperingMutation={archivePamperingMutation}
                id={info?.event?.id}
                editPampering={editPampering}
              >
                <div
                  className={cn(styles.titleEvent)}
                  style={{
                    backgroundColor:
                      info?.event?._def?.extendedProps?.category?.color,
                  }}
                >
                  {info?.event?.title}
                </div>
              </Popup>
            </>
          );
          ReactDOM.render(event, info.el);
        }}
      />
    </div>
  );
}

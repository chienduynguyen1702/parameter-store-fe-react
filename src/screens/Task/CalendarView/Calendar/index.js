import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import cn from 'classnames';
import styles from './Calendar.module.sass';
import './CalendarFork.sass';

import Popup from './Popup/Popup';

import { useListTasksCalendar } from '../../../../hooks/Data';

import { useQueryString } from '../../../../hooks';
import moment from 'moment';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Calendar() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  // Query String
  const { queryString, parseQueryString } = useQueryString();

  // List Task Calendar Query
  const { listEvents, archiveTaskMutation, handleDateChange } =
    useListTasksCalendar();
  const editTask = (id) => {
    navigate({
      pathname: `/tasks/calendar-view/edit-task/${id}`,
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

  useEffect(() => {
    // Kiểm tra và cập nhật sự kiện trong FullCalendar
    if (calendarRef.current) {
      calendarRef.current.getApi().removeAllEvents();
      calendarRef.current.getApi().addEventSource(listEvents);
    }
  }, [listEvents]);

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
                archiveTaskMutation={archiveTaskMutation}
                id={info?.event?.id}
                editTask={editTask}
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

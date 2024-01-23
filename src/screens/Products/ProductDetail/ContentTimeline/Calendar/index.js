import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import cn from 'classnames';
import styles from './Calendar.module.sass';
import './CalendarFork.sass';

import Popup from './Popup/Popup';

import { useTasksBySKU } from '../../../../../hooks/Data';
import { useQueryString } from '../../../../../hooks';
import { dateToUrl } from '../../../../../utils/helpers';

export default function Calendar() {
  // Query String
  const { queryString, setQueryString } = useQueryString();

  const { id } = useParams();

  const calendarRef = React.createRef();
  const { from, to, jump } = queryString;

  useEffect(() => {
    jump && calendarRef.current.getApi().gotoDate(from);
  }, [from, to, jump]);

  // List Task Calendar Query
  const { listTasks } = useTasksBySKU(id);

  return (
    <div className={cn(styles.calendarOuter)}>
      <FullCalendar
        datesSet={(arg) => {
          const params = { ...queryString };
          if (!!params.jump) {
            delete params.jump;
          }
          params.from = dateToUrl(arg.start);
          params.to = dateToUrl(arg.end);
          setQueryString(params);
        }}
        plugins={[dayGridPlugin]}
        events={listTasks ? listTasks : []}
        // eventColor="#83BF6E"
        initialView="dayGridMonth"
        ref={calendarRef}
        headerToolbar={{
          start: 'prev,next',
          center: 'title',
          end: '',
        }}
        eventDidMount={(info) => {
          const event = (
            <>
              <Popup
                target={info?.el}
                content={info?.event?._def?.extendedProps}
                id={info?.event?.id}
              >
                <div
                  className={cn(styles.titleEvent, 'textOverFlow')}
                  style={{
                    backgroundColor:
                      info?.event?._def?.extendedProps?.status?.color,
                  }}
                >
                  {info?.event?._def?.extendedProps?.deadline}:{' '}
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

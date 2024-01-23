import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import './MonthYearDatePicker.scss';

function MonthYearDatePicker({ defaultForm, setDate, inline = true }) {
  const [showYearPicker, setShowYearPicker] = useState(false);

  const datePickerProps = {
    selected: new Date(defaultForm.year, defaultForm.month - 1),
    onChange: (date) => {
      if (date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        setDate({ year, month });
        setShowYearPicker(false);
      }
    },
    inline,
    renderCustomHeader: ({
      date,
      decreaseYear,
      increaseYear,
      prevYearButtonDisabled,
      nextYearButtonDisabled,
    }) => (
      <div>
        <button
          aria-label="Prev Year"
          onClick={decreaseYear}
          disabled={prevYearButtonDisabled}
          className="react-datepicker__navigation react-datepicker__navigation--previous"
        >
          <span
            className={
              'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
            }
          >
            {'<'}
          </span>
        </button>

        <span
          className="react-datepicker__current-month"
          style={{ cursor: 'pointer' }}
          onClick={() => setShowYearPicker(!showYearPicker)}
        >
          {date?.toLocaleString('en-US', {
            year: 'numeric',
          })}
        </span>

        <button
          aria-label="Next Year"
          disabled={nextYearButtonDisabled}
          className={
            'react-datepicker__navigation react-datepicker__navigation--next'
          }
          onClick={increaseYear}
        >
          <span
            className={
              'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
            }
          >
            {'>'}
          </span>
        </button>
      </div>
    ),
  };

  // Conditionally add attributes based on the showYearPicker state
  if (showYearPicker) {
    datePickerProps.dateFormat = 'yyyy';
    datePickerProps.showYearPicker = true;
  } else {
    datePickerProps.dateFormat = 'MM/yyyy';
    datePickerProps.showMonthYearPicker = true;
    datePickerProps.showFullMonthYearPicker = true;
  }

  return <DatePicker {...datePickerProps} showFourColumnYearPicker />;
}

MonthYearDatePicker.propTypes = {
  defaultForm: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
  }).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default MonthYearDatePicker;

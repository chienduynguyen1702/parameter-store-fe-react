import { useState, useEffect } from 'react';

import { useQueryString } from '../../../../hooks';

const ButtonSwitchContentsAndFailedContents = () => {
  const { queryString, setQueryString } = useQueryString();
  const { onlyFailed } = queryString;

  const [value, setValue] = useState('Contents');

  const handleSwitchKOCsType = (value) => {
    setValue(value);
    setQueryString({
      ...queryString,
      page: 1,
      limit: 10,
      onlyFailed: value === 'Failed Contents' ? true : false,
    });
  };

  useEffect(() => {
    if (onlyFailed === false || onlyFailed === 'false') {
      setValue('Contents');
    } else setValue('Failed Contents');
  }, [onlyFailed]);

  return (
    <div className="py-0 pb-4 py-sm-4">
      <button
        className={`allOrMeButton ${value === 'Contents' ? 'active' : ''}`}
        onClick={() => handleSwitchKOCsType('Contents')}
      >
        Contents
      </button>
      <button
        className={`allOrMeButton ${
          value === 'Failed Contents' ? 'active' : ''
        }`}
        onClick={() => handleSwitchKOCsType('Failed Contents')}
      >
        Failed Contents
      </button>
    </div>
  );
};

export default ButtonSwitchContentsAndFailedContents;

import React, { useState } from 'react';

import cn from 'classnames';
import styles from './FormSearch.module.sass';

import Icon from '../Icon';

import useQueryString from '../../hooks/useQueryString';

const FormSearch = ({
  className,
  placeholder,
  type = 'text',
  name = 'search',
  icon = 'search',
}) => {
  const { queryString, setQueryString } = useQueryString();

  const { search: searchQuery } = queryString;

  const [search, setSearch] = useState(searchQuery || '');

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const params = { ...queryString };
    const formatSearch = search.trim();
    if (params.search) {
      delete params.search;
    }
    if (!!formatSearch) {
      params.search = formatSearch;
    }
    params.page = 1;
    setQueryString(params);
  };

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmitSearch}>
      <input
        className={styles.input}
        type={type}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        name={name}
        placeholder={placeholder}
      />
      <button className={styles.icon}>
        <Icon name={icon} size="24" />
      </button>
    </form>
  );
};

export default FormSearch;

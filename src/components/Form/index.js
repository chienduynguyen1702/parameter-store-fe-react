import React from 'react';
import cn from 'classnames';
import styles from './Form.module.sass';
import Icon from '../Icon';

const Form = ({
  className,
  classNameInput,
  onSubmit,
  placeholder,
  value,
  setValue,
  type = 'text',
  name = 'search',
  icon = 'search',
}) => {
  return (
    <form className={cn(className, styles.form)} action="" onSubmit={onSubmit}>
      <input
        className={cn(styles.input, classNameInput)}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name={name}
        placeholder={placeholder}
      />
      <button className={styles.result}>
        <Icon name={icon} size="24" />
      </button>
    </form>
  );
};

export default Form;

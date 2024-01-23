import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import styles from './TagInput.module.sass';
import cn from 'classnames';

import { Tooltip } from '../../components';
import { WithContext as ReactTags } from 'react-tag-input';

function TagInput({
  value = [],
  title,
  setValue,
  onBlur,
  label,
  placeholder,
  tooltip,
  suggestions = [],
  subTitle,
  error,
  className,
  limit = 100,
  notRequiredInSuggestions,
  disabled = false,
  ...others
}) {
  const [tags, setTags] = useState([]);
  const handleDelete = (i) => {
    const newTags = tags.filter((tag, index) => index !== i);
    setTags(newTags);
    setValue(newTags);
  };

  const handleAddition = (tag) => {
    if (notRequiredInSuggestions) {
      const newTags = [...tags, tag];
      setTags(newTags);
      setValue(newTags);
      return;
    }

    if (
      suggestions.length &&
      suggestions.find((suggestion) => suggestion.text === tag.text)
    ) {
      if (tags.length >= limit) {
        toast.error(`Maximum ${limit} tags!`);
        return;
      }
      const newTags = [...tags, tag];
      setTags(newTags);
      setValue(newTags);
    } else {
      toast.error('Invalid tag!');
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
    setValue(newTags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTags(updatedTags);
    setValue(updatedTags);
  };

  useEffect(() => {
    if (value) {
      setTags(value);
    }
  }, [value]);

  return (
    <>
      <div className={cn(className, styles.head)}>
        <div className={styles.label}>
          {label}{' '}
          <Tooltip
            className={cn(error ? styles.tooltipError : styles.tooltip)}
            title={tooltip}
            icon="info"
            place="right"
            error={true}
          />
        </div>
        <div className={styles.counter}>
          <span>{tags.length === 0 ? 0 : tags.length}</span>{' '}
          {label.toLowerCase()}
          {tags.length > 1 && 's'}
        </div>
      </div>
      <div className={cn(styles.tags, 'alo')}>
        <ReactTags
          classNames={{
            tagInputField: styles.input,
          }}
          inputProps={{
            disabled: disabled,
            autocomplete: 'off',
          }}
          handleDelete={!disabled ? handleDelete : () => {}}
          handleAddition={!disabled ? handleAddition : () => {}}
          handleDrag={!disabled ? handleDrag : () => {}}
          handleTagClick={!disabled ? handleTagClick : () => {}}
          onTagUpdate={!disabled ? onTagUpdate : () => {}}
          suggestions={suggestions}
          placeholder={placeholder}
          minQueryLength={0}
          maxLength={20}
          autofocus={false}
          allowDeleteFromEmptyInput={!disabled && true}
          autocomplete={!disabled && true}
          readOnly={false}
          allowUnique={!disabled && true}
          allowDragDrop={!disabled && true}
          inline={!disabled && true}
          inputFieldPosition="inline"
          allowAdditionFromPaste={!disabled && true}
          editable={false}
          clearAll={false}
          tags={tags}
          {...others}
        />
      </div>
    </>
  );
}

export default TagInput;

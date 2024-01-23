import cn from 'classnames';
import styles from './RHFSelectVideos.module.sass';

import Tooltip from '../../Tooltip';
import Checkbox from '../../Checkbox';
import Icon from '../../Icon';
import { Controller, useFormContext } from 'react-hook-form';

export default function RHFSelectVideos({
  name,
  classError,
  label = 'Select Videos',
  title = 'Select Videos',
  icon = 'video-recorder',
  tooltip = 'This is tooltip',
  options = [],
  ...others
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          {label && (
            <div className={cn(styles.title)}>
              {label}{' '}
              {tooltip && (
                <Tooltip
                  className={error ? styles.tooltipError : styles.tooltip}
                  title={tooltip}
                  icon="info"
                  place="right"
                />
              )}
            </div>
          )}
          <div className={styles.body}>
            <div className={styles.label}>
              {icon && <Icon className="me-2" name={icon} size={20} />}
              {title}
            </div>
            <div className={styles.selection}>
              {options.length !== 0 ? (
                options?.map((selection, index) => {
                  return (
                    <div key={index}>
                      <Checkbox
                        id={selection?.id}
                        image={selection?.image}
                        content={selection?.name}
                        value={value?.includes?.(selection?.id)}
                        onChange={(e) => {
                          const id = selection?.id;
                          if (e.target.checked) {
                            onChange([...value, id]);
                          } else {
                            onChange(value.filter((item) => item !== id));
                          }
                        }}
                        {...others}
                      />
                    </div>
                  );
                })
              ) : (
                <p className="text-center py-2">No data to display</p>
              )}
            </div>
          </div>
          {error ? (
            <p className={cn(styles.redLine, classError)}>{error.message}</p>
          ) : (
            <p className={cn('invisible', styles.redLine, classError)}>.</p>
          )}
        </>
      )}
    />
  );
}

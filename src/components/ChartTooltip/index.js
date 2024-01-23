import styles from './ChartTooltip.module.sass';

const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.label}>{label}</p>
        <ul className={styles.itemList}>
          {payload.map((item, index) => {
            return (
              <li className={styles.item} key={index}>
                <span className={styles.name}>{item.name}</span>
                <div className={styles.inline}>
                  <div
                    className={styles.color}
                    style={{
                      backgroundColor: item.color ?? item.payload?.fill,
                    }}
                  ></div>
                  <span className="value">
                    {Number(item.value).toLocaleString('en-US')}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;

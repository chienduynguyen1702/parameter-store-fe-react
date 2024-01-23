import { handleLongNumber } from "../../../utils/helpers";

export default function Data({ item, summaryField }) {
  return (
    <>
      {summaryField?.map((value, index) => {
        return (
          <div
            key={index}
            className={`d-flex justify-content-between my-2 d-sm-table-cell my-0 tableCell align-middle ${
              index === summaryField.length - 1 && 'roundedRight'
            }`}
          >
            <div className="d-sm-none">{value.label}</div>
            <div
              style={{
                backgroundColor: value.color,
                borderRadius: '6px',
                padding: '0 8px',
                width: 'fit-content',
              }}
            >
              {handleLongNumber(item?.[value.name])}
            </div>
          </div>
        );
      })}
    </>
  );
}

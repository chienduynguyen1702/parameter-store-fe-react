import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { BiSortAlt2 } from 'react-icons/bi';

export default function TableHead({ summaryField, displayIcon, handleSort }) {
  return (
    <div className="tableHead">
      <div className="ps-3 pb-4 tableCell">Post</div>
      {summaryField.map((item, index) => {
        return (
          <div key={index} className="tableCell">
            <div
              className="d-flex cursor-pointer pb-4"
              onClick={() => {
                handleSort(item);
              }}
            >
              <p>{item}</p>
              <div className="ms-1">
                {displayIcon[index] === 'default' && <BiSortAlt2 />}
                {displayIcon[index] === 'DESC' && <AiOutlineArrowDown />}
                {displayIcon[index] === 'ASC' && <AiOutlineArrowUp />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

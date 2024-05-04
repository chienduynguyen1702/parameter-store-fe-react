import moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fromNow(date) {
  return moment(date).fromNow();
}

export function exportExcel(csvData, fileName) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(csvData);

  // Calculate the maximum length of title and data in each column
  const maxLengths = {};
  csvData.forEach((row) => {
    Object.keys(row).forEach((key) => {
      const value = row[key];
      const title = key;
      const currentLength = maxLengths[key] || 0;
      const valueLength = value ? value.toString().length : 0;
      const titleLength = title ? title.toString().length : 0;
      maxLengths[key] = Math.max(currentLength, valueLength, titleLength);
    });
  });

  // Set column widths based on maximum lengths and enable text wrapping
  Object.keys(maxLengths).forEach((key, index) => {
    let width = maxLengths[key] + 2; // Add some extra padding
    if (width > 50) {
      width = 50;
    }
    ws['!cols'] = ws['!cols'] || [];
    ws['!cols'][index] = { width, wpx: width * 8, wch: width };
  });

  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}

export function handleLongNumber(number, format = 2, isDecimal = false) {
  const convertedNumber = typeof number === 'number' ? number : Number(number);
  if (convertedNumber === 0) return (convertedNumber / 1).toFixed(0);
  if (convertedNumber < 1000) {
    return (convertedNumber / 1).toFixed(isDecimal ? format : 0);
  }
  let si = [
    { v: 1e3, s: 'K' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
    { v: 1e18, s: 'E' },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (convertedNumber >= si[index].v) {
      break;
    }
  }
  return (
    (convertedNumber / si[index].v)
      .toFixed(format ?? 0)
      .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s
  );
}

export function handleLongNumberToDuration (number ) {
  // default unit is ms
  const secondDuration = Math.floor(number / 1000);
  if (secondDuration < 60) {
    return `${secondDuration} s`;
  }
  return `${Math.floor(secondDuration / 60)} m ${secondDuration % 60} s`;
}

export const onInvalidSubmit = (data) => {
  let errorMessage = (
    <div>
      Errors: <br />
      {Object.keys(data).map((key) => (
        <div key={key}>- {data[key].message}</div>
      ))}
    </div>
  );

  toast.error(errorMessage, {
    position: toast.POSITION.UPPER_RIGHT,
  });
  scrollToTopModal();
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const scrollToTopModal = () => {
  const target = document.querySelector('#modal');
  target.scrollTop = 0;
};

export const onEnterPreventDefault = (e) => {
  if (e.code === 'Enter') {
    e.preventDefault();
  }
};
export function dateToUrl(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
  return formattedDate;
}

const handleMergeByTime = (chunk, granularity) => {
  const startDate = new Date(chunk[0].date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const endDate = new Date(chunk[chunk.length - 1].date).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
  );
  const time = `${startDate} - ${endDate}`;

  const sum = chunk.reduce((acc, obj) => {
    const total = acc.total + obj.total;
    const success = acc.success + obj.success;
    const error = acc.error + obj.error;

    return { total, success, error };
  });

  return { date: time, ...sum };
};

export const handleDataWithGranularity = (data, granularity) => {
  let result = [];

  switch (granularity) {
    case 'day':
      result = data;
      break;
    case 'week':
      for (let i = 0; i < data.length; i += 7) {
        const chunk = data.slice(i, i + 7);
        console.log('chunk', chunk);
        const sum = handleMergeByTime(chunk, granularity);
        console.log('sum', sum);
        result.push(sum);
      }
      break;
    case 'month':
      for (let i = 0; i < data.length; i += 30) {
        const chunk = data.slice(i, i + 30);
        const sum = handleMergeByTime(chunk, granularity);
        result.push(sum);
      }
      break;
    case 'quarter':
      for (let i = 0; i < data.length; i += 90) {
        const chunk = data.slice(i, i + 90);
        const sum = handleMergeByTime(chunk, granularity);
        result.push(sum);
      }
      break;
    case 'year':
      for (let i = 0; i < data.length; i += 365) {
        const chunk = data.slice(i, i + 365);
        const sum = handleMergeByTime(chunk, granularity);
        result.push(sum);
      }
      break;
    default:
      break;
  }

  return result;
};

export const handleObjectArrayToArrayObject = (objectArray) => {
  const result = [];

  const keys = Object.keys(objectArray.bucket);
  const length = objectArray.bucket[keys[0]].length;

  for (let i = 0; i < length; i++) {
    const obj = {};

    for (const key in objectArray) {
      const innerKey = Object.keys(objectArray[key])[0];
      obj[innerKey] = objectArray[key][innerKey][i];
    }

    result.push(obj);
  }
  return result;
};

export const changeArrayInt = (arr) => {
  return (arr = arr.map(function (element) {
    return parseInt(element);
  }));
};


export function filterHashTags(str) {
  const hashtags = str.match(/#\w+/g);
  const hashtagsString = hashtags?.join(' ');
  return hashtagsString;
}
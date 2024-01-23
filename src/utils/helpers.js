import moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function fromNow(date) {
  return moment(date).fromNow();
}

export function dateToHour(date) {
  const currentHour = date.getHours();
  let formattedHour = currentHour % 12;
  if (formattedHour === 0) {
    formattedHour = 12;
  }
  const amPm = currentHour >= 12 ? 'PM' : 'AM';
  const currentTime = formattedHour + amPm;
  return currentTime;
}

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

export function urlToDate(url) {
  const [year, month, day] = url.split('-');
  return `${day}/${month}/${year}`;
}

export function formatDateToISO(date) {
  const parts = date.split('/');
  return `${parts[1]}/${parts[0]}/${parts[2]}`;
}

export function formatDateFromData(date) {
  const dateFormat = new Date(date);
  const month = dateFormat.toLocaleString('default', { month: 'long' });
  const day = dateFormat.getDate();
  const year = dateFormat.getFullYear();
  return `${month} ${day} ${year}`;
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

function isMergedCell(worksheet, cellAddress) {
  const mergedCells = worksheet['!merges'];

  if (!mergedCells) {
    return false;
  }

  for (const mergedCell of mergedCells) {
    if (
      mergedCell.s.c <= cellAddress.c &&
      cellAddress.c <= mergedCell.e.c &&
      mergedCell.s.r <= cellAddress.r &&
      cellAddress.r <= mergedCell.e.r
    ) {
      return true;
    }
  }

  return false;
}

function detectHeaderLines(worksheet, range) {
  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      if (isMergedCell(worksheet, { r: row, c: col })) {
        return 2;
      }
    }
  }
  return 1;
}

export function ImportExcel(event, setData, setTitleExcel) {
  const file = event?.target?.files[0];

  if (!file) {
    setTitleExcel(null);
    setData([]);
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const range = XLSX.utils.decode_range(worksheet['!ref']); // Decode the range

      const headerLines = detectHeaderLines(worksheet, range);

      // Use slice to get the data part of the array you are interested in
      const filteredRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const dataRows = filteredRows.filter((row) => row.some((cell) => !!cell));
      const extractedHeaders = dataRows.slice(0, headerLines);
      const slicedDataRows = dataRows.slice(headerLines);

      setTitleExcel(extractedHeaders);
      setData(slicedDataRows);
    } catch (error) {
      console.log(error);
    }
  };

  reader.onerror = function (e) {
    toast.error('Error reading the file', {
      position: toast.POSITION.UPPER_RIGHT,
    });
    setTitleExcel(null);
    setData([]);
  };

  reader.readAsBinaryString(file);
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
export function tikTokHashTagLink(hashTag) {
  const baseHref = 'https://www.tiktok.com/tag/';
  return baseHref + hashTag.slice(1);
}

export function tikTokUserLink(username) {
  const baseHref = 'https://www.tiktok.com/@';
  return baseHref + username;
}

export function youtubeHashTagLink(hashTag) {
  const baseHref = 'https://www.youtube.com/hashtag/';
  return baseHref + hashTag.slice(1);
}

export function youtubeUserLink(username) {
  const baseHref = 'https://www.youtube.com/@';
  return baseHref + username;
}

export function facebookHashTagLink(hashTag) {
  const baseHref = 'https://www.facebook.com/hashtag/';
  return baseHref + hashTag.slice(1);
}

export function facebookUserLink(username) {
  const baseHref = 'https://www.facebook.com/@';
  return baseHref + username;
}

export function instagramHashTagLink(hashTag) {
  const baseHref = 'https://www.instagram.com/explore/tags/';
  return baseHref + hashTag.slice(1);
}

export function instagramUserLink(username) {
  const baseHref = 'https://www.instagram.com/';
  return baseHref + username;
}

export function filterHashTags(str) {
  const hashtags = str.match(/#\w+/g);
  const hashtagsString = hashtags?.join(' ');
  return hashtagsString;
}

export const handleDataWithGranularity = (
  granularity,
  dates,
  values = [],
  name = 'dates',
) => {
  const dataName = name;
  if (granularity === 'day') {
    if (name === 'dates')
      return {
        bucket: dates?.map((date) => {
          return moment(date).format('MMM DD YYYY');
        }),
      };
    return { [dataName]: values };
  } else {
    const result = {};
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const [year, month] = dates[i].split('-');
      let key =
        moment(date).startOf('isoWeek').format('MMM DD YYYY') +
        ' - ' +
        moment(date).endOf('isoWeek').format('MMM DD YYYY');
      if (granularity === 'month') {
        key = `${year}-${month}-01`;
        key = moment(key).format('MMM YYYY');
      } else if (granularity === 'quarter') {
        key = `${year}-${3 * Math.ceil(month / 3) - 2}-01`;
        key =
          moment(key).format('MMM YYYY') +
          ' - ' +
          moment(key).endOf('quarter').format('MMM YYYY');
      } else if (granularity === 'year') {
        key = `${year}-01-01`;
        key =
          moment(key).format('MMM DD YYYY') +
          ' - ' +
          (moment(key).endOf('year').format('MMM DD YYYY') < new Date()
            ? moment(key).endOf('year').format('MMM DD YYYY')
            : moment(new Date()).format('MMM DD YYYY'));
      }
      if (!result[key]) {
        result[key] = 0;
      }
      result[key] += parseInt(values[i]);
    }
    if (name === 'dates') return { bucket: Object.keys(result) };
    return { [name]: Object.values(result) };
  }
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

function toDataURL(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = reject;
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

export const handleDownloadPDF = async (printRef) => {
  const uids = ['dlsmtodsx', 'dchxzrrqo'];
  const elements = printRef;
  const pdf = new jsPDF();

  for (let i = 0; i < elements.length; i++) {
    const images = elements[i].getElementsByTagName('img');

    const canvas = await html2canvas(elements[i], {
      useCORS: true,
      allowTaint: false,
      onclone: async (document) => {
        const imageDataPromises = [];
        const images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
          const rand = Math.floor(Math.random() * 2);
          const id = uids[rand];
          images[i].src =
            `https://res.cloudinary.com/${id}/image/fetch/` + images[i].src;
          imageDataPromises.push(toDataURL(images[i].src));
        }
        await Promise.all(imageDataPromises);
      },
    });

    const imageData = canvas.toDataURL('image/jpeg');
    const img = new Image();
    img.src = imageData;
    if (i !== 0) {
      pdf.addPage();
    }
    const imageWidth = (elements[i].clientWidth / 96) * 15.4;
    const imageHeight =
      (elements[i].clientHeight / 96) * 15.4 < 279
        ? (elements[i].clientHeight / 96) * 15.4
        : 279;

    const pageWidth = pdf.internal.pageSize.getWidth();
    const positionX = (pageWidth - imageWidth) / 2;

    pdf.addImage(imageData, 'JPEG', positionX, 10, imageWidth, imageHeight);
  }

  pdf.save('document.pdf');
};

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

export const makeid = () => {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

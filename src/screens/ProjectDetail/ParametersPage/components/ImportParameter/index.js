import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';
import {
  downloadTemplateParam,
  uploadFileParam,
} from '../../../../../services/api';
import { AsyncButton, Item, Icon, FileUpload } from '../../../../../components';
import { toast } from 'react-toastify';

const ImportParameter = ({ title, onClose }) => {
  const { id } = useParams();

  const [file, setSelectedFile] = useState({});
  const handleUploadFile = (uploadedFile) => {
    setSelectedFile(uploadedFile);
    // console.log('Uploaded file:', uploadedFile);
  };
  const handleClickDownload = async () => {
    try {
      const response = await downloadTemplateParam(id);
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      // set user can choose folder, file name to save file
      // get file name
      const filename =
        response.headers['content-disposition'].split('filename=')[1];
      console.log(filename);
      link.setAttribute('download', filename); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleClickDone = async () => {
    if (file.name === undefined) {
      toast.error('Please select a file');
      return;
    }
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('uploadFile', file, file.name);

    // Details of the uploaded file
    // console.log(file);
    try {
      const response = await uploadFileParam(id, formData);
      toast.success(`Param imported successfully: ${response.data.message}`);
      onClose();
    } catch (error) {
      toast.error(`Error importing Param: ${error.response.data.error}`);
      // console.log('Error', error);
    }
  };
  return (
    <>
      <Item
        title={'Import Param'}
        className="pb-4 borderBottom"
        classTitle="title-green"
      ></Item>
      <div>
        Warning: Importing a Param will overwrite the existing Param with the
        {'\n\n\n'}
        same name and value.
        <br />
        Selected file: {file.name}
      </div>
      <div className="pt-5 d-flex justify-content-end align-items-center">
        <div>
          <p onClick={handleClickDownload} className="button-white me-2">
            <Icon name="download" size="24" />
            Download Template
          </p>
        </div>
        <div className="me-2">
          <FileUpload title={'Upload file'} setValue={handleUploadFile}>
            <div>
              <Icon name="upload" size="24" />
              {title}
            </div>
          </FileUpload>
        </div>
        <div className="me-2" onClick={handleClickDone}>
          <AsyncButton
            threeDotsWidth="20"
            threeDotsHeight="20"
            type="submit"
            className="button px-4"
            value="Done"
            notMaxWidth
            loading={false}
          />
        </div>
      </div>
    </>
  );
};

export default ImportParameter;

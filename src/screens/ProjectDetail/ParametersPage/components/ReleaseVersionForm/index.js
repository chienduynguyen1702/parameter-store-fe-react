import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { TiArrowRightThick } from 'react-icons/ti';

import { AsyncButton, Item, RHFTextInput } from '../../../../../components';
import NotAppliedParamTable from './NotAppliedParamTable/Table';
import { useListProjects } from '../../../../../hooks/data';

function UpdateForm({
  title = 'Release New Version of Parameters',
  onClose,
  listParameters,
  currentVersion,
}) {
  // currentVersion = '1.0.0'; // set default value
  const { releaseVersionParametersMutation } = useListProjects();
  // Handle id and current data of form in setting item
  // const [id, setId] = useState(0);
  // const [modalTitle, setModalTitle] = useState('Add New Tier');

  // Handle modal add and edit setting
  // const [typeAdd, setTypeAdd] = useState('none');
  // const [typeEdit, setTypeEdit] = useState('none');

  const { id: project_id } = useParams();
  const listNotAppliedParameters = listParameters;
  const method = useForm({});

  const handleSubmit = (data) => {
    const req = {
      project_id: project_id,
      body: {
        release_version: data.release_version,
      },
    };
    // console.log('req', req);
    releaseVersionParametersMutation.mutate(req, {
      onSuccess: () => {
        // toast.success('Apply Parameters Success, waiting for agent pull');
        onClose();
      },
      onError: (error) => {
        console.error('Error applying parameter:', error);
      },
    });
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Item
          title={title}
          className="pb-4 borderBottom"
          classTitle="title-green"
        >
          <p>All of these parameters gonna be release in new version.</p>
          <br></br>
          <>
            <Row>
              <Col>
                <RHFTextInput
                  name="current_version"
                  label="Current version Number"
                  defaultValue={currentVersion}
                />
              </Col>
              {/* <Col>
                <TiArrowRightThick />
              </Col> */}
              <Col>
                <RHFTextInput
                  name="release_version"
                  placeholder="Enter New Version Number with formart a.b.c"
                  label="Release Version Number"
                  tooltip="Release Version Number is required, format a.b.c"
                />
              </Col>
            </Row>
            <Row>
              <RHFTextInput
                name="description"
                label="Description"
                placeholder="Enter description for this release version"
              />
            </Row>
          </>

          <NotAppliedParamTable
            listNotAppliedParameters={listNotAppliedParameters}
          />
        </Item>

        <div className="pt-5 d-flex justify-content-end align-items-center">
          <div>
            <p onClick={onClose} className="button-white me-2">
              Cancel
            </p>
          </div>
          <div>
            <AsyncButton
              threeDotsWidth="20"
              threeDotsHeight="20"
              type="submit"
              className="button px-4"
              value="Confirm"
              notMaxWidth
              loading={false}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default UpdateForm;

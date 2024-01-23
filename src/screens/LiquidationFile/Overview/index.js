import { useNavigate } from 'react-router';
import { Col, Row, Stack } from 'react-bootstrap';
import { useCallback } from 'react';

import { Card, Icon } from '../../../components';

import useOverview from './useOverview';
import useQueryString from '../../../hooks/useQueryString';
import { handleLongNumber } from '../../../utils/helpers';

export default function Overview() {
  const navigate = useNavigate();

  const { liquidationOverview } = useOverview();

  const { queryString, parseQueryString } = useQueryString();

  const navigateEditLiquidationFile = useCallback(() => {
    navigate(
      `/liquidation-file/edit-liquidation-file/${
        liquidationOverview?.id
      }/?${parseQueryString(queryString)}`,
    );
  }, [queryString, parseQueryString, navigate, liquidationOverview?.id]);

  return (
    <Card
      className="mb-4 fs-5"
      title={liquidationOverview?.name}
      classTitle="title-purple"
      head={
        <div
          className="button-small button-white-grey-border ms-auto"
          onClick={() => navigateEditLiquidationFile()}
        >
          <Icon className="me-1" name="edit" size={18} />
          <span>Edit</span>
        </div>
      }
    >
      <Row className="borderBottom py-2 mb-2">
        <Col xs={12} md={5}>
          <Stack direction="horizontal" className="py-2">
            <p className="me-auto">PIC</p>
            <p
              className="status text-white"
              style={{
                backgroundColor: liquidationOverview?.pic?.color,
              }}
            >
              {liquidationOverview?.pic?.name}
            </p>
          </Stack>
          <Stack direction="horizontal" className="py-2">
            <p className="me-auto">Category</p>
            <p
              className="status text-white"
              style={{
                backgroundColor: liquidationOverview?.category?.color,
              }}
            >
              {liquidationOverview?.category?.name}
            </p>
          </Stack>
          <Stack direction="horizontal" className="py-2">
            <p className="me-auto">From</p>
            <p className="fs-6 colorN4">{liquidationOverview?.fromDate}</p>
          </Stack>
        </Col>
        <Col xs={12} md={{ span: 5, offset: 2 }}>
          <Stack direction="horizontal" className="py-2">
            <p className="me-auto">Receiver</p>
            <p
              className="status text-white"
              style={{
                backgroundColor: liquidationOverview?.receiver?.color,
              }}
            >
              {liquidationOverview?.receiver?.name}
            </p>
          </Stack>
          <Stack direction="horizontal" className="py-2">
            <p className="me-auto">Status</p>
            <p
              className="status text-white"
              style={{
                backgroundColor: liquidationOverview?.status?.color,
              }}
            >
              {liquidationOverview?.status?.name}
            </p>
          </Stack>
          <Stack direction="horizontal" className="py-2">
            <p className="me-auto">To</p>
            <p className="fs-6 colorN4">{liquidationOverview?.toDate}</p>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 7 }} className="mb-2">
          <Stack direction="horizontal">
            <p className="me-auto">Total (VND)</p>
            <p className="">
              {handleLongNumber(liquidationOverview?.total)} VND
            </p>
          </Stack>
        </Col>
      </Row>
    </Card>
  );
}

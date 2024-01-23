import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Container, Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import cn from 'classnames';
import styles from './Table.module.sass';

import { NoData } from '../../../../../components';
import Row from './Row';
import SkeletonTable from './Skeleton';

import { useListOrdersBySKU } from '../../../../../hooks/Data';

const Table = ({ className }) => {
  const [activeId, setActiveId] = useState(1);

  const { id } = useParams();

  const {
    listOrdersBySKU,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage,
    handlePageChange,
  } = useListOrdersBySKU(id);

  return (
    <div className={cn(className)}>
      <Container fluid className={cn(styles.table)}>
        <Brow className={cn(styles.row, styles.koc1)}>
          <Col xs={4} className={cn(styles.col)}>
            Name
          </Col>
          <Col xs={2} className={styles.col}>
            City
          </Col>
          <Col xs={2} className={cn(styles.col, styles.left)}>
            Amount
          </Col>
          <Col xs={1} className={cn(styles.col, styles.left)}>
            Price
          </Col>
          <Col xs={3} className={cn(styles.col, styles.left)}>
            KOC
          </Col>
        </Brow>
        {isLoading && <SkeletonTable limit={limit} />}
        {isSuccess &&
          listOrdersBySKU?.map((task) => (
            <Row
              key={task.id}
              item={task}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
      </Container>
      {isSuccess && listOrdersBySKU.length === 0 && <NoData />}
      <div className={cn(styles.swapPaginate)}>
        <ReactPaginate
          activeClassName={cn(styles.item, styles.active)}
          breakClassName={cn(styles.item)}
          breakLabel={'...'}
          marginPagesDisplayed={2}
          paddingPagesDisplayed={2}
          pageRangeDisplayed={2}
          containerClassName={cn(styles.pagination)}
          disabledClassName={cn(styles.item, styles.disabled)}
          nextClassName={cn(styles.item, styles.next)}
          nextLabel={<IoIosArrowForward />}
          onPageChange={handlePageChange}
          pageCount={totalPage || 1}
          forcePage={page - 1 || 0}
          pageClassName={cn(styles.item, 'pagination-page')}
          previousClassName={cn(styles.item, styles.previous)}
          previousLabel={<IoIosArrowBack />}
        />
      </div>
    </div>
  );
};
export default Table;

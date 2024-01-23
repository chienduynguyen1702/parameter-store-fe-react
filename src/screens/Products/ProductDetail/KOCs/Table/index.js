import React from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import cn from 'classnames';
import styles from './Table.module.sass';

import { Container, Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import Row from './Row';
import SkeletonTable from './Skeleton';

import { useKOCsBySKU } from '../../../../../hooks/Data';

const Table = ({ className }) => {
  const { id } = useParams();

  const {
    listKOCs,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage,
    handlePageChange,
  } = useKOCsBySKU(id);

  return (
    <div className={cn(className)}>
      <Container fluid className={cn(styles.table)}>
        <Brow className={cn(styles.row, styles.koc1)}>
          <Col xs={1} className={cn(styles.col)}></Col>
          <Col xs={4} className={cn(styles.col)}>
            KOCs
          </Col>
          <Col xs={2} className={cn(styles.col, styles.left)}>
            Tier
          </Col>
          <Col xs={2} className={cn(styles.col, styles.left)}>
            Platform
          </Col>
          <Col xs={3} className={styles.col}>
            Product Sold
          </Col>
        </Brow>
        {isLoading && <SkeletonTable limit={limit} />}
        {isSuccess &&
          listKOCs?.map((koc, index) => (
            <Row index={index} key={koc.id} item={koc} />
          ))}
      </Container>

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
          pageCount={totalPage || 5}
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

import React, { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Container, Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import cn from 'classnames';
import styles from './Table.module.sass';

import Row from './Row';
import SkeletonTable from './Skeleton';

const Table = ({ className, data, setErrorRowCount }) => {
  const [activeId, setActiveId] = useState(1);
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const isLoading = useMemo(() => {
    if (data) {
      return false;
    } else return true;
  }, [data]);

  const isSuccess = useMemo(() => {
    if (data) {
      setListProducts(data.slice((page - 1) * 5, page * 5));
      setTotalPage(Math.ceil(data?.length / 5));
      return true;
    } else return false;
  }, [data, page]);

  const handlePageChange = (event) => {
    setPage(event.selected + 1);
  };

  const handleErrorRow = (product) => {
    setErrorRowCount((prevCount) => prevCount + 1); // Increment the error count
  };

  return (
    <div className={cn(className)}>
      <Container fluid className={cn(styles.table)}>
        <Brow className={cn(styles.row, styles.koc1)}>
          <Col className={cn(styles.col)}>Name</Col>
          <Col className={styles.col}>Code</Col>
          <Col className={styles.col}>Category</Col>
          <Col className={cn(styles.col, styles.left)}>Type</Col>
          <Col className={cn(styles.col, styles.left)}>Full Price</Col>
          <Col className={styles.col}>Current Price</Col>
          <Col className={styles.col}>Discounted Rate</Col>
        </Brow>
        {isLoading && <SkeletonTable limit={5} />}
        {isSuccess &&
          listProducts?.map((product, index) => {
            return (
              <Row
                key={index}
                item={product}
                activeId={activeId}
                setActiveId={setActiveId}
                setRowIsError={() => handleErrorRow(product)}
              />
            );
          })}
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

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router';
import { Outlet } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

import cn from 'classnames';
import styles from './ProductDetail.module.sass';

import { Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import Filters from '../Table/Filters';
import Decentralization from '../../../components/Decentralization';

import { useSettingsMutation } from '../../../hooks/Setting';
import { useProductsBySKU } from '../../../hooks/Data';

import {
  Card,
  ModalWithoutPortal,
  RHFColorInput,
  RHFTextInput,
} from '../../../components';

import { AddSettingSchema } from '../../../utils/ValidateSchema';

function ProductDetail() {
  // get id
  const { id } = useParams();
  // Handle id and current data of form in setting item
  const [modalTitle] = useState('Add New Tier');
  const [viewOption, setViewOption] = useState('Overview');

  const navigate = useNavigate();

  // React Query with useListSetting hook
  const { addSettingMutation, editSettingMutation } = useSettingsMutation();

  const { listProducts, isSuccess } = useProductsBySKU(id);

  const queryClient = useQueryClient();

  // Handle modal add and edit setting
  const [typeAdd, setTypeAdd] = useState('none');
  const [typeEdit, setTypeEdit] = useState('none');

  const location = useLocation();
  useEffect(() => {
    const option = location.pathname.substring(
      location.pathname.lastIndexOf('/') + 1,
    );
    switch (option) {
      case 'overview':
        setViewOption('Overview');
        break;
      case 'tiktok':
        setViewOption('Tiktok');
        break;
      case 'youtube':
        setViewOption('Youtube');
        break;
      case 'facebook':
        setViewOption('Facebook');
        break;
      case 'instagram':
        setViewOption('Instagram');
        break;
      case 'kocs':
        setViewOption('KOCs');
        break;
      case 'content-timeline':
        setViewOption('Content Timeline');
        break;
      case 'order':
        setViewOption('Order');
        break;
      default:
        break;
    }
  }, []);

  const handleCloseModal = () => {
    setTypeAdd('none');
    setTypeEdit('none');
  };

  const method = useForm({
    resolver: yupResolver(AddSettingSchema),
  });

  const handleSubmit = (data) => {
    if (typeAdd !== 'none') {
      const body = {
        color: data.color,
        type: typeAdd,
        name: data.name,
      };
      return addSettingMutation.mutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries(typeAdd);
          toast.success(`${modalTitle} Success`);
          handleCloseModal();
        },
      });
    }

    const body = {
      color: data.color,
      type: typeEdit,
      name: data.name,
    };

    return editSettingMutation.mutate(
      { id, data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(typeEdit);
          toast.success(`${modalTitle} Success`);
          handleCloseModal();
        },
      },
    );
  };

  return (
    <div className={cn(styles.bgProDetail)}>
      <ModalWithoutPortal
        outerClassName={styles.outer}
        visible={typeAdd !== 'none' || typeEdit !== 'none'}
        onClose={handleCloseModal}
      >
        <Card
          className={cn(styles.rounded)}
          title={modalTitle}
          classTitle="title-red"
        >
          <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(handleSubmit)}>
              <RHFTextInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter name"
                tooltip="Name is required"
              />
              <RHFColorInput
                label="Color"
                name="color"
                tooltip="Color is required"
              />
              <Stack className="mt-4" direction="horizontal" gap={3}>
                <p className="button-white ms-auto">Reset</p>
                <button className="button">Apply</button>
              </Stack>
            </form>
          </FormProvider>
        </Card>
      </ModalWithoutPortal>
      <Card
        className={cn(styles.rounded)}
        title="Product Detail"
        classTitle="title-green"
      >
        {isSuccess ? (
          listProducts?.map((item) => (
            <div className={cn(styles.container, 'borderTop mt-2 pt-2')}>
              <div className={styles.imagePro}>
                <img
                  src={item?.imageUrl}
                  alt="Product"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/content/not-found-image.jpg';
                  }}
                />
              </div>
              <Brow className={styles.productInfo}>
                {/* Ava and Title */}
                <Col className={cn(styles.col, styles.user_col)}>
                  <div className={styles.item}>
                    <div
                      className={cn(styles.details, 'text-truncate fw-bold')}
                    >
                      {item?.title}
                    </div>
                  </div>
                </Col>
                {/* Code */}
                <Col className={cn(styles.col)}>
                  <div className={cn(styles.title)}>
                    Product Code: {item?.skuCode}
                  </div>
                </Col>
                {/* Category and Type */}
                <Col className={cn(styles.col)}>
                  <div className={cn(styles.left)}>
                    <div
                      className={cn(styles.text_white, styles.colKoc)}
                      style={{
                        backgroundColor:
                          item?.shop === 'TikTokShop' ? '#111315' : '#FF6A55',
                      }}
                    >
                      {item?.shop || 'Category'}
                    </div>
                  </div>
                  <div className={cn(styles.left)}>
                    <div
                      className={cn(styles.text_white, styles.colKoc)}
                      style={{
                        backgroundColor: item?.category?.color || '#666',
                      }}
                    >
                      {item?.category?.name || 'Category'}
                    </div>
                  </div>
                  <div className={cn(styles.left)}>
                    <div
                      className={cn(styles.text_white, styles.colKoc)}
                      style={{
                        backgroundColor: item?.tier?.color || '#666',
                      }}
                    >
                      {item?.tier?.name || 'Tier'}
                    </div>
                  </div>
                </Col>
                {/* Full price */}
                <Col className={cn(styles.col)}>
                  <div className={cn(styles.title)}>
                    Full price:{' '}
                    <span>{item.full_price?.toLocaleString('en-US')}</span>
                  </div>
                </Col>
                {/* Current Price */}
                <Col className={cn(styles.col)}>
                  <div className={cn(styles.title)}>
                    Current Price:{' '}
                    <span>{item.current_price?.toLocaleString('en-US')}</span>
                  </div>
                </Col>
                {/* Discounted Rate */}
                <Col className={cn(styles.col)}>
                  <div className={cn(styles.title)}>
                    Discounted Rate: <span>{item.discounted_rate}</span>
                  </div>
                </Col>
              </Brow>
            </div>
          ))
        ) : (
          <>
            <div className={cn('d-flex my-2', styles.skeleton)}>
              <div>
                <Skeleton count={1} width={105} height={157} />
              </div>
              <div className="ms-2 py-1 d-flex flex-column justify-content-between">
                <div>
                  <Skeleton count={1} width={100} height={24} />
                </div>
                <div>
                  <Skeleton count={1} width={100} height={24} />
                </div>
                <div>
                  <Skeleton count={1} width={100} height={24} />
                </div>
                <div>
                  <Skeleton count={1} width={100} height={24} />
                </div>
                <div>
                  <Skeleton count={1} width={100} height={24} />
                </div>
              </div>
            </div>
          </>
        )}

        <div className={styles.nav}>
          <Stack direction="horizontal" className={styles.overflowAuto}>
            {/* Overview  */}
            {/* <Decentralization permissions={['product-import']} exact> */}
            <button
              className={cn(styles.link, {
                [styles.active]: viewOption === 'Overview',
              })}
              onClick={() => {
                setViewOption('Overview');
                navigate(`/product-detail/${id}/overview`);
              }}
            >
              Overview
            </button>
            {/* </Decentralization> */}
            {/* Tiktok  */}
            <Decentralization
              permissions={['product-content-tiktok-list']}
              exact
            >
              <button
                className={cn(styles.link, {
                  [styles.active]: viewOption === 'Tiktok',
                })}
                onClick={() => {
                  setViewOption('Tiktok');
                  navigate(`/product-detail/${id}/tiktok`);
                }}
              >
                Tiktok
              </button>
            </Decentralization>
            {/* Youtube  */}
            <Decentralization
              permissions={['product-content-youtube-list']}
              exact
            >
              <button
                className={cn(styles.link, {
                  [styles.active]: viewOption === 'Youtube',
                })}
                onClick={() => {
                  setViewOption('Youtube');
                  navigate(`/product-detail/${id}/youtube`);
                }}
              >
                Youtube
              </button>
            </Decentralization>
            {/* Facebook  */}
            <Decentralization
              permissions={['product-content-instagram-list']}
              exact
            >
              <button
                className={cn(styles.link, {
                  [styles.active]: viewOption === 'Facebook',
                })}
                onClick={() => {
                  setViewOption('Facebook');
                  navigate(`/product-detail/${id}/facebook`);
                }}
              >
                Facebook
              </button>
            </Decentralization>
            {/* Instagram  */}
            <Decentralization
              permissions={['product-content-facebook-list']}
              exact
            >
              <button
                className={cn(styles.link, {
                  [styles.active]: viewOption === 'Instagram',
                })}
                onClick={() => {
                  setViewOption('Instagram');
                  navigate(`/product-detail/${id}/instagram`);
                }}
              >
                Instagram
              </button>
            </Decentralization>
            {/* KOCs  */}
            <Decentralization permissions={['product-kocs']} exact>
              <button
                className={cn(styles.link, {
                  [styles.active]: viewOption === 'KOCs',
                })}
                onClick={() => {
                  setViewOption('KOCs');
                  navigate(`/product-detail/${id}/kocs`);
                }}
              >
                KOCs
              </button>
            </Decentralization>
            {/* Content Timeline  */}
            <Decentralization permissions={['product-tasks']} exact>
              <button
                className={cn(styles.link, {
                  [styles.active]: viewOption === 'Content Timeline',
                })}
                onClick={() => {
                  setViewOption('Content Timeline');
                  navigate(`/product-detail/${id}/content-timeline`);
                }}
              >
                Content Timeline
              </button>
            </Decentralization>
            {/* Order  */}
            {/* <Decentralization permissions={['product-orders']} exact>
              <button
                className={cn(styles.link, {
                  [styles.active]: viewOption === 'Order',
                })}
                onClick={() => {
                  setViewOption('Order');
                  navigate(`/product-detail/${id}/order`);
                }}
              >
                Order
              </button>
            </Decentralization> */}
          </Stack>
          <Filters className={cn('mx-2', styles.filters)} title="Filter" />
        </div>
      </Card>
      <Outlet />
    </div>
  );
}

export default ProductDetail;

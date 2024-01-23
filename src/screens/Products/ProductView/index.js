import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useMemo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import styles from './ProductView.module.sass';
import cn from 'classnames';

import { RHFTextInput, RHFImage } from '../../../components';
import { useSettingsProduct } from '../../../hooks/Setting';
import {
  addProduct,
  editProduct,
  getProduct,
  uploadImage,
} from '../../../services/api';
import { AddProductSchema } from '../../../utils/ValidateSchema';
import RHFRadio from '../../../components/RHF/RHFRadio';
import SkeletonView from './Skeleton';

const ProductView = ({ visibleProduct, setVisibleProductView }) => {
  //list platform
  const platformProduct = [
    {
      value: 'TikTokShop',
      label: 'TikTokShop',
    },
    {
      value: 'Ecomobi',
      label: 'Ecomobi',
    },
  ];
  const { productCategories, productTypes } = useSettingsProduct();

  const queryClient = useQueryClient();

  const defaultValues = useMemo(() => {
    return {
      image: '',
      name: '',
      code: '',
      shop: '',
      category: {},
      type: {},
      fullPrice: '',
      currentPrice: '',
      discountedRate: '',
    };
  }, []);

  const [defaultImageProduct, setDefaultImageProduct] = useState(
    '/images/content/not-found-image.jpg',
  );

  //   // ------------------------------ Handle mode -----------------------------
  const isAddMode = useMemo(() => {
    return typeof visibleProduct === 'boolean';
  }, [visibleProduct]);
  //   // ------------------------------ Handle form -----------------------------
  const method = useForm({
    resolver: yupResolver(AddProductSchema),
    defaultValues: defaultValues,
  });

  //   // ------------------------------ Add Product -----------------------------

  const addProductMutation = useMutation((data) => {
    return addProduct(data);
  });

  //   // ------------------------------ Edit Product -----------------------------
  const parseData = useCallback(
    (data) => {
      return {
        ...defaultValues,
        // if field is null, set default value
        code: data?.sku_code,
        name: data?.title,
        image: data?.image_url,
        fullPrice: data?.full_price,
        currentPrice: data?.current_price,
        discountedRate: data?.discounted_rate,
        shop: {
          value: data?.shop,
          label: data?.shop,
        },
        category: {
          value:
            data?.settings.find((item) => item.type === 'product-category')
              ?.id || null,
          label:
            data?.settings.find((item) => item.type === 'product-category')
              ?.name || null,
          color:
            data?.settings.find((item) => item.type === 'product-category')
              ?.color || null,
          type:
            data?.settings.find((item) => item.type === 'product-category')
              ?.type || null,
        },
        type: {
          value:
            data?.settings.find((item) => item.type === 'product-type')?.id ||
            defaultValues.type,
          label:
            data?.settings.find((item) => item.type === 'product-type')?.name ||
            defaultValues.type,
          color:
            data?.settings.find((item) => item.type === 'product-type')
              ?.color || null,
          type:
            data?.settings.find((item) => item.type === 'product-type')?.type ||
            null,
        },
      };
    },
    [defaultValues],
  );
  //   // get user data
  const productQuery = useQuery({
    queryKey: ['productQuery', visibleProduct],
    queryFn: () => getProduct(visibleProduct),
    enabled: !isAddMode && !!visibleProduct,
    select: (data) => parseData(data.data.data[0]),
    onSuccess: (data) => {
      method.reset(data);
      if (data?.image) setDefaultImageProduct(data?.image);
    },
  });

  const editProductMutation = useMutation(({ id, data }) => {
    return editProduct(id, data);
  });

  // ------------------------------ Upload image ------------------------------
  const uploadImageMutation = useMutation((data) => {
    return uploadImage(data);
  });

  const handleSubmit = useCallback(async (data) => {
    if (!!data.image && data.image !== productQuery.data?.image) {
      const uploadImageResponse = await uploadImageMutation.mutateAsync({
        file: data.image,
      });
      data.image = uploadImageResponse.data.data || '';
    }
    data = {
      sku_code: data.code,
      full_price: data.fullPrice,
      current_price: data.currentPrice,
      discounted_rate: data.discountedRate,
      image_url: data.image,
      title: data.name,
      shop: data?.shop?.value,
      category: {
        id: Number(data.category.value),
        color: data.category.color,
        type: data.category.type,
        name: data.category.label,
      },
      type: {
        id: Number(data.type.value),
        color: data.type.color,
        type: data.type.type,
        name: data.type.label,
      },
    };
    if (isAddMode) {
      return addProductMutation.mutate(data, {
        onSuccess: () => {
          toast.success('Add product successfully!');
          setVisibleProductView(false);
          queryClient.invalidateQueries({
            queryKey: ['productQuery'],
          });
          queryClient.invalidateQueries({
            queryKey: ['list-products-sku'],
          });
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      });
    }
    editProductMutation.mutate(
      { id: visibleProduct, data: data },
      {
        onSuccess: () => {
          toast.success('Edit product successfully!');
          setVisibleProductView(false);
          queryClient.invalidateQueries({
            queryKey: ['productQuery'],
          });
          queryClient.invalidateQueries({
            queryKey: ['list-products-sku'],
          });
        },
        onError: (error) => {
          toast.error(error.response.data.message);
        },
      },
    );
  });

  return (
    <div className={cn(styles.form, { [styles.active]: visibleProduct })}>
      <div className={cn('title-red', styles.title)}>
        {isAddMode ? 'Add product' : 'Edit product'}
      </div>
      <div className={cn('mt-3 pt-3 border-top')}>
        {productQuery.isLoading && !isAddMode && <SkeletonView />}
        {(!productQuery.isLoading || isAddMode) && (
          <FormProvider {...method}>
            <form onSubmit={method.handleSubmit(handleSubmit)}>
              <div className="d-flex justify-content-between">
                <div>
                  <RHFImage
                    name="image"
                    setDefaultAva={setDefaultImageProduct}
                    defaultValue={defaultImageProduct}
                    className="rounded-0"
                  />
                </div>
              </div>
              <div>
                <RHFTextInput
                  name="name"
                  label="Name"
                  tooltip="Name of product"
                />
              </div>
              <div className="">
                <RHFTextInput
                  name="code"
                  label="Code"
                  tooltip="Code of product"
                />
              </div>
              <div className="mb-3 mt-2">
                <div className="color4 fs-7 mb-2">Platform</div>
                <RHFRadio name="shop" options={platformProduct} />
              </div>
              <div className="mb-3 mt-2">
                <div className="color4 fs-7 mb-2">Category</div>
                <RHFRadio
                  name="category"
                  options={productCategories?.data?.map((category) => ({
                    value: category.id,
                    label: category.name,
                    color: category.color,
                    type: category.type,
                  }))}
                />
              </div>
              <div className="my-3">
                <div className="color4 fs-7 mb-2">Type</div>
                <RHFRadio
                  name="type"
                  options={productTypes?.data?.map((type) => ({
                    value: type.id,
                    label: type.name,
                    color: type.color,
                    type: type.type,
                  }))}
                />
              </div>
              <div className="my-3">
                <RHFTextInput
                  name="fullPrice"
                  label="Full price"
                  type="number"
                  placeholder="Enter price"
                  tooltip="Full price of Product"
                />
              </div>
              <div className="my-3">
                <RHFTextInput
                  name="currentPrice"
                  label="Current price"
                  type="number"
                  placeholder="Enter price"
                  tooltip="Current price of Product"
                />
              </div>
              <div className="my-3">
                <RHFTextInput
                  name="discountedRate"
                  label="Discounted Rate"
                  type="number"
                  placeholder="Enter discounted rate"
                  tooltip="Discounted rate of Product"
                />
              </div>
              <div className="mt-2 pt-4 border-top d-flex justify-content-end">
                <div
                  className={cn('me-2 cursor-pointer', styles.btnCancel)}
                  onClick={() => setVisibleProductView(false)}
                >
                  Cancel
                </div>
                <div>
                  <button className={cn(styles.btnSave)}>Save</button>
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default ProductView;

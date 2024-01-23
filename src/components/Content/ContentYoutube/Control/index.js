import React, { useState } from 'react';
import styles from './Control.module.sass';

import cn from 'classnames';

import ModalProduct from '../../../ModalProduct';
import { AiTwotoneEye } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { handleLongNumber } from '../../../../utils/helpers';

const Control = ({ className, item }) => {
  const controlProduct = [
    {
      icon: 'view',
      action: () => console.log('edit'),
      icon_fas: <AiTwotoneEye />,
      viewCount: 0,
    },
    {
      icon: 'like',
      action: () => console.log('remove'),
      icon_fas: <AiFillHeart />,
      likeCount: 0,
    },
    {
      icon: 'comment',
      action: () => console.log('comment'),
      icon_fas: <BiCommentDetail />,
      commentCount: 0,
    },
  ];

  const [visibleModalProduct, setVisibleModalProduct] = useState(false);

  controlProduct.map((x, index) => {
    for (const prop in x) {
      if (item.hasOwnProperty(prop)) {
        x['count'] = item[prop];
      }
    }
  });

  return (
    <>
      <div className={cn(className, styles.control)}>
        {controlProduct.map((x, index) => (
          <div
            // style={styleControl}
            className={cn(
              'justify-content-center cursor-pointer align-items-center',
              styles.controlBox,
            )}
            key={index}
            onClick={x.action}
          >
            {x.icon_fas}
            <div className="mx-2">
              {handleLongNumber(x.count ? x.count : 0)}
            </div>
          </div>
        ))}
      </div>
      <ModalProduct
        visible={visibleModalProduct}
        onClose={() => setVisibleModalProduct(false)}
      />
    </>
  );
};

export default Control;

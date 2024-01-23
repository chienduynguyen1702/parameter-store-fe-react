import React from 'react';

import PopoverEditRole from './PopoverEditRole';

const PERMISSIONS_DISPLAY_COUNT_DESKTOP = 5;
const PERMISSIONS_DISPLAY_COUNT_MOBILE = 1;

const Row = ({ item, archiveRoleMutation }) => {
  return (
    <>
      <div className="d-sm-table-row d-none tableRow">
        <div className="d-table-cell tableCell py-3 roundedLeft">
          <div className="status-default">{item.name}</div>
        </div>
        <div className="d-table-cell tableCell">
          <div className="font14 colorN4">
            {item.role} {item.countUser} users
          </div>
        </div>

        <div className="d-table-cell tableCell">
          {item?.permissions
            .slice(0, PERMISSIONS_DISPLAY_COUNT_DESKTOP)
            ?.map((permission, index) => (
              <div key={index} className="role d-inline">
                {permission.description}
              </div>
            ))}
          {item?.permissions.length > PERMISSIONS_DISPLAY_COUNT_DESKTOP && (
            <div className="role d-inline">
              +{item?.permissions.length - PERMISSIONS_DISPLAY_COUNT_DESKTOP}
            </div>
          )}
        </div>

        <div className={'d-table-cell tableCell text-end roundedRight'}>
          <PopoverEditRole
            itemId={item.id}
            archiveRoleMutation={archiveRoleMutation}
          />
        </div>
      </div>
      <div className="d-block d-sm-none pb-4 mt-3 w-100 borderBottomCard">
        <div className="d-flex justify-content-between gap-1">
          <p className="status-default">{item.name}</p>
          <PopoverEditRole
            itemId={item.id}
            archiveRoleMutation={archiveRoleMutation}
          />
        </div>
        <div className="d-flex justify-content-between gap-1 my-2">
          <p className="color4 ms-1">Assign to</p>
          <p className="font14 colorN4">
            {item.role} {item.countUser} users
          </p>
        </div>
        <div className="d-flex justify-content-between gap-1 my-2">
          <p className="color4 ms-1">Permission</p>
          <div>
            {item?.permissions
              .slice(0, PERMISSIONS_DISPLAY_COUNT_MOBILE)
              ?.map((permission, index) => (
                <p key={index} className="role d-inline">
                  {permission.description}
                </p>
              ))}
            {item?.permissions.length > PERMISSIONS_DISPLAY_COUNT_MOBILE && (
              <p className="role d-inline">
                +{item?.permissions.length - PERMISSIONS_DISPLAY_COUNT_MOBILE}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;

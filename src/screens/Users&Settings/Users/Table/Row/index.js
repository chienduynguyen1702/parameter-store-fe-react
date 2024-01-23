import React from 'react';

import {} from '../../../../../components';
import AvatarAndInfo from './AvatarAndInfo';
import PopoverEditRole from './PopoverEditRole';

import PopoverEditUser from './PopoverEditUser';

const Row = ({
  item,
  listRoles,
  archiveUserMutation,
  handleUpdateUserRole,
}) => {
  return (
    <>
      <div className="d-sm-table-row d-none tableRow">
        <div className="d-table-cell tableCell py-3 ps-2 roundedLeft">
          <AvatarAndInfo
            itemId={item.id}
            avatarUrl={item.avatarUrl}
            username={item.username}
            phone={item.phone}
          />
        </div>
        <div className="d-table-cell tableCell">
          <div className="colorN4">{item.email}</div>
        </div>
        <div className="d-table-cell tableCell">
          <div className="status-green-dark ">{item.permissionsCount}</div>
        </div>
        <div className="d-table-cell tableCell">
          <PopoverEditRole
            listRoles={listRoles}
            handleUpdateUserRole={(newSetting) =>
              handleUpdateUserRole({
                newSetting,
                itemId: item.id,
                itemRoles: item.roles,
              })
            }
            itemRoles={item?.roles}
          />
        </div>
        <div className="d-table-cell tableCell">{item.lastSignIn}</div>
        <div className="d-table-cell tableCell roundedRight">
          <PopoverEditUser
            itemId={item.id}
            archiveUserMutation={archiveUserMutation}
          />
        </div>
      </div>

      <div className="d-block d-sm-none pb-4 mt-3 w-100 borderBottomCard">
        <div className="d-flex justify-content-between">
          <AvatarAndInfo
            itemId={item.id}
            avatarUrl={item.avatarUrl}
            username={item.username}
            phone={item.phone}
          />
          <PopoverEditUser
            itemId={item.id}
            archiveUserMutation={archiveUserMutation}
          />
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Email</div>
          <div>{item.email}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Role</div>
          <PopoverEditRole
            listRoles={listRoles}
            handleUpdateUserRole={(newSetting) =>
              handleUpdateUserRole({
                newSetting,
                itemId: item.id,
                itemRoles: item.roles,
              })
            }
            itemRoles={item?.roles}
          />
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Permission</div>
          <div className="status-green-dark ">{item.permissionsCount}</div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Last sign in</div>
          <div className="d-table-cell tableCell p-0">{item.lastSignIn}</div>
        </div>
      </div>
    </>
  );
};

export default Row;

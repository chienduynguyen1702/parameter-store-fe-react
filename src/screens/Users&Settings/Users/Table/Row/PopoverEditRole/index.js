import { Popover } from '../../../../../../components';

export default function PopoverEditRole({
  listRoles,
  handleUpdateUserRole,
  itemRoles,
}) {
  return (
    <Popover
      classNameBtn={
        'd-flex flex-wrap flex-sm-nowrap justify-content-end justify-content-sm-start align-items-center gap-1'
      }
      contents={listRoles?.map((role, index) => ({
        component: (
          <span key={index} className="font15">
            {role?.name}
          </span>
        ),
        onClick: () => {
          handleUpdateUserRole(role.name);
        },
        color: {
          bgColor: itemRoles.includes(role?.name) && 'rgb(25,27,28)',
          textColor: itemRoles.includes(role?.name) ? 'white' : 'black',
        },
        icon: true,
      }))}
    >
      {itemRoles.length > 0 ? (
        itemRoles?.map((role, index) => (
          <span className="status-default" key={index}>
            {role}
          </span>
        ))
      ) : (
        <div className="role">Select</div>
      )}
    </Popover>
  );
}

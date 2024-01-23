import CustomerPopover from '../Popover';

export default function PopoverEditSetting({
  name,
  setting,
  listSettings,
  handleUpdate,
}) {
  return (
    <CustomerPopover
      contents={listSettings?.map((settingItem, index) => ({
        component: (
          <span key={index} className="font15">
            {settingItem.name}
          </span>
        ),
        onClick: () => {
          handleUpdate(settingItem.name, name);
        },
        color: settingItem?.name === setting?.name && {
          bgColor: setting?.color,
        },
        icon: true,
      }))}
    >
      <div
        style={{
          backgroundColor: setting?.color || '#666',
          padding: '0 8px',
          borderRadius: '6px',
          color: 'white',
          fontWeight: 600,
        }}
      >
        {setting ? setting?.name : 'Select'}
      </div>
    </CustomerPopover>
  );
}

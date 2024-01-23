import { useMemo } from 'react';

import CustomerPopover from '../Popover';

export default function PopoverEditSetting({
  name,
  platforms,
  listPlatforms,
  handleUpdate,
}) {
  const platformsName = useMemo(() => {
    const platformsExp = [...platforms];
    return platformsExp.map((item) => item?.name);
  }, [platforms]);

  return (
    <CustomerPopover
      contents={listPlatforms?.map((platform, index) => ({
        component: (
          <div key={`row-pc-platform-${index}`}>
            <span className="font15">{platform?.name}</span>
          </div>
        ),
        onClick: () => {
          handleUpdate(platform.name, name);
        },
        color: platformsName?.includes(platform?.name) && {
          bgColor: platforms[platformsName?.indexOf(platform?.name)]?.color,
          textColor: 'white',
        },
        icon: true,
      }))}
    >
      {platforms.length > 0 ? (
        platforms?.map((platform, index) => (
          <div
            key={`row-pc-platform-${index}`}
            className="status d-block text-white mb-1"
            style={{
              backgroundColor: platform.color,
            }}
          >
            {platform?.name}
          </div>
        ))
      ) : (
        <div
          className="status text-white"
          style={{
            backgroundColor: '#666',
          }}
        >
          Select
        </div>
      )}
    </CustomerPopover>
  );
}

// import React from 'react';
// import Skeleton from 'react-loading-skeleton';

// import { ArchivedItem, NoDataArchived, Form } from '../../../../components';

// import useArchivedUsers from '../../../../hooks/Archived/useArchivedUsers';

// export default function ArchivedUsers() {
//   const {
//     archivedUsers,
//     isSuccess,
//     isLoading,
//     search,
//     handleSearch,
//     unarchiveUserMutation,
//   } = useArchivedUsers();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <>
//       <Form
//         value={search}
//         setValue={handleSearch}
//         onSubmit={handleSubmit}
//         className="archiverSearch"
//         placeholder="Search archived users"
//       />
//       <div className="archiverScroll">
//         {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
//         {isSuccess &&
//           (archivedUsers?.length > 0 ? (
//             archivedUsers?.map((item, index) => (
//               <ArchivedItem
//                 key={index}
//                 item={item}
//                 havingImage
//                 handleUnarchive={(id) => unarchiveUserMutation.mutate(id)}
//                 isLoading={unarchiveUserMutation.isLoading}
//                 unArchivePermission={['user-archivist-unarchive']}
//               />
//             ))
//           ) : (
//             <NoDataArchived />
//           ))}
//       </div>
//     </>
//   );
// }

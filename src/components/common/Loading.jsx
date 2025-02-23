
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>
  );
};

export default Loading;


// import React from 'react';
// import { Loader2 } from 'lucide-react';

// const Loading = ({ 
//   message = 'Loading...', 
//   fullScreen = false 
// }) => {
//   const containerClasses = fullScreen 
//     ? 'fixed inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-50' 
//     : 'flex items-center justify-center';

//   return (
//     <div className={containerClasses}>
//       <div className="text-center">
//         <Loader2 
//           className="mx-auto mb-4 animate-spin text-blue-600" 
//           size={48} 
//         />
//         <p className="text-gray-600 dark:text-gray-300">
//           {message}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Loading;
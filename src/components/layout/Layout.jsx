import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;


// import React from 'react';
// import Header from './Header';

// const Layout = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Page Content */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="px-4 py-5 sm:p-6">
//             {children}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 mt-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="text-center text-sm text-gray-500">
//             <p>© {new Date().getFullYear()} Weather Meetup. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;
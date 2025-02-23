
import React from 'react';

const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
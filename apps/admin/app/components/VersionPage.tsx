'use client';

import React from 'react';
import packageJson from '../../package.json';
const buildVersion = `v${packageJson?.version ?? ''}`;

const VersionPage = () => {
  return (
    <div className=" m-auto mt-[45vh] text-center">
      <h1 className="text-md font-secondary">
        {buildVersion}
        {process.env['IS_PRODUCTION'] !== 'true' ? 's' : ''}
      </h1>
    </div>
  );
};

export default VersionPage;
